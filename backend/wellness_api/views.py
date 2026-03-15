from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
from .db import get_db
from django.conf import settings

@api_view(['POST'])
def contact_form_submit(request):
    data = request.data
    
    # Simple validation
    required_fields = ['name', 'email', 'message']
    if not all(field in data for field in required_fields):
        return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Prepare data for Mongo
    message_doc = {
        "name": data.get('name'),
        "email": data.get('email'),
        "service": data.get('service', 'General'),
        "message": data.get('message'),
        "created_at": datetime.utcnow()
    }
    
    try:
        db = get_db()
        db.contact_messages.insert_one(message_doc)
        return Response({"message": "Successfully submitted. We will get back to you soon!"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def booking_submit(request):
    data = request.data
    
    # Required fields validation
    required_fields = ['full_name', 'email', 'phone', 'therapy_type', 'date', 'time', 'mode']
    if not all(field in data for field in required_fields):
        return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Prepare data for Mongo
    booking_doc = {
        "full_name": data.get('full_name'),
        "email": data.get('email'),
        "phone": data.get('phone'),
        "therapy_type": data.get('therapy_type'),
        "date": data.get('date'),
        "time": data.get('time'),
        "message": data.get('message', ''),
        "mode": data.get('mode'),
        "created_at": datetime.utcnow()
    }
    
    try:
        # 1. Save booking data to MongoDB
        db = get_db()
        db.bookings.insert_one(booking_doc)
        
        # 2. Send email alert to therapist and admin
        from django.core.mail import send_mail
        
        
        subject = 'New Session Booking – Catharsis Wellness'
        body = f"""
New Session Booking Details:

Full Name: {booking_doc['full_name']}
Email: {booking_doc['email']}
Phone Number: {booking_doc['phone']}
Therapy Type: {booking_doc['therapy_type']}
Date: {booking_doc['date']}
Time: {booking_doc['time']}
Mode: {booking_doc['mode']}
Message: {booking_doc['message']}

---
This is an automated alert.
"""
        recipients = settings.THERAPIST_EMAILS
        
        send_mail(
            subject,
            body,
            settings.EMAIL_HOST_USER or 'noreply@catharsiswellness.com',
            recipients,
            fail_silently=True,
        )
        
        # 3. Send confirmation email to the client
        client_subject = 'Booking Request Received – Catharsis Wellness'
        client_body = f"""
Dear {booking_doc['full_name']},

Thank you for requesting a session with us. We have received your booking details and our therapist will contact you soon.

Here is a summary of your session request:
Therapy Type: {booking_doc['therapy_type']}
Date: {booking_doc['date']}
Time: {booking_doc['time']}
Mode: {booking_doc['mode']}

Warm regards,
Catharsis Wellness
"""
        send_mail(
            client_subject,
            client_body,
            settings.EMAIL_HOST_USER or 'noreply@catharsiswellness.com',
            [booking_doc['email']],
            fail_silently=True,
        )
        
        return Response({
            "message": "Your session request has been sent. Therapist will contact you soon."
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        error_msg = str(e)
        print(f"Error in booking_submit: {error_msg}")
        return Response({
            "error": "An error occurred while processing your booking.",
            "details": error_msg
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_booking_history(request):
    identifier = request.query_params.get('identifier')
    if not identifier:
        return Response({"error": "Email or Phone Number is required"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        db = get_db()
        # Search by email or phone
        query = {
            "$or": [
                {"email": identifier},
                {"phone": identifier}
            ]
        }
        bookings = list(db.bookings.find(query).sort("created_at", -1))
        
        # Format for JSON response
        for b in bookings:
            b['_id'] = str(b['_id'])
            if 'created_at' in b:
                b['created_at'] = b['created_at'].isoformat()
            # Ensure remarks are included for the client
            b['remarks'] = b.get('remarks', '')
                
        return Response(bookings, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# --- Therapist Dashboard & Security ---
import functools
from bson.objectid import ObjectId

def therapist_required(view_func):
    @functools.wraps(view_func)
    def wrapper(request, *args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return Response({"error": "Unauthorized. Please login."}, status=status.HTTP_401_UNAUTHORIZED)
        
        token = auth_header.split(' ')[1]
        # In a real app, use a proper JWT/Token system.
        # For now, we'll check if the token (which is the therapist email for simplicity) is in our allowed list.
        allowed_emails = settings.THERAPIST_EMAILS
        if token not in allowed_emails:
            return Response({"error": "Invalid session."}, status=status.HTTP_401_UNAUTHORIZED)
            
        return view_func(request, *args, **kwargs)
    return wrapper

@api_view(['POST'])
def therapist_login(request):
    email = request.data.get('email')
    password = request.data.get('password') # In a real app, hash this!
    
    if not email or not password:
        return Response({"error": "Email and password required"}, status=status.HTTP_400_BAD_REQUEST)

    # Simplified logic: If password is 'catharsis123' and email is in THERAPIST_EMAILS, allow login.
    # We can also store therapist users in Mongo later.
    if email in settings.THERAPIST_EMAILS and password == 'catharsis123':
        return Response({
            "message": "Login successful",
            "token": email, # Using email as dummy token for now
            "user": {"email": email}
        })
    else:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@therapist_required
def get_all_bookings(request):
    try:
        db = get_db()
        bookings = list(db.bookings.find().sort("created_at", -1))
        for b in bookings:
            b['_id'] = str(b['_id'])
            if 'created_at' in b:
                b['created_at'] = b['created_at'].isoformat()
        return Response(bookings)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@therapist_required
def update_booking_remarks(request, booking_id):
    remarks = request.data.get('remarks')
    if remarks is None:
        return Response({"error": "Remarks field is required"}, status=status.HTTP_400_BAD_REQUEST)
        
    try:
        db = get_db()
        result = db.bookings.update_one(
            {"_id": ObjectId(booking_id)},
            {"$set": {"remarks": remarks}}
        )
        if result.matched_count == 0:
            return Response({"error": "Booking not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response({"message": "Remarks updated successfully"})
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def health_check(request):
    return Response({"status": "Backend is running smoothly"})
