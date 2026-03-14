from django.urls import path
from .views import contact_form_submit, health_check, booking_submit

urlpatterns = [
    path('contact/', contact_form_submit, name='contact_submit'),
    path('booking/', booking_submit, name='booking_submit'),
    path('health/', health_check, name='health_check'),
]
