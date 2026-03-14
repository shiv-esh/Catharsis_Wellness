from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
from .db import get_db

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
        from django.conf import settings
        
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
        recipients = ['shiveshmall12499@gmail.com','manasijyoti@gmail.com','manu19972512@gmail.com']
        
        send_mail(
            subject,
            body,
            settings.EMAIL_HOST_USER or 'noreply@catharsiswellness.com',
            recipients,
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
def health_check(request):
    return Response({"status": "Backend is running smoothly"})
