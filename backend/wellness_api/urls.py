from django.urls import path
from .views import contact_form_submit, health_check, booking_submit, get_booking_history, therapist_login, get_all_bookings, update_booking_remarks

urlpatterns = [
    path('contact/', contact_form_submit, name='contact_submit'),
    path('booking/', booking_submit, name='booking_submit'),
    path('booking-history/', get_booking_history, name='booking_history'),
    
    # Therapist Dashboard routes
    path('therapist/login/', therapist_login, name='therapist_login'),
    path('therapist/bookings/', get_all_bookings, name='therapist_bookings'),
    path('therapist/bookings/<str:booking_id>/remarks/', update_booking_remarks, name='update_remarks'),
    
    path('health/', health_check, name='health_check'),
]
