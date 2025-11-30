from django.urls import path
from . import views

app_name = 'Interface'

urlpatterns = [
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('services/', views.services, name='services'),
    path('contact/', views.contact, name='contact'),
    path('terms/', views.terms, name='terms'),
    path('privacy/', views.privacy, name='privacy'),
    path('cookies/', views.cookies, name='cookies'),
    # API endpoints pour les formulaires
    path('api/submit-contact/', views.submit_contact_form, name='submit_contact'),
    path('api/submit-project/', views.submit_project_form, name='submit_project'),
]
