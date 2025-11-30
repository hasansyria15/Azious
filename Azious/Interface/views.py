from django.shortcuts import render
from django.http import JsonResponse
from django.core.mail import send_mail
from django.conf import settings
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.
def index(request):
    return render(request, 'Interface/index.html')

# page about
def about(request):
    return render(request, 'Interface/about.html')

# page services
def services(request):
    return render(request, 'Interface/services.html')

# page contact
def contact(request):
    return render(request, 'Interface/contact.html')

# page conditions d'utilisation
def terms(request):
    return render(request, 'Interface/terms.html')

# page politique de confidentialité
def privacy(request):
    return render(request, 'Interface/privacy.html')

# page cookies
def cookies(request):
    return render(request, 'Interface/cookies.html')


# Fonction pour gérer le formulaire de contact
@require_POST
@csrf_exempt
def submit_contact_form(request):
    try:
        data = json.loads(request.body)
        prenom = data.get('prenom')
        nom = data.get('nom')
        email = data.get('email')
        sujet = data.get('sujet')
        message = data.get('message')

        # Email pour Business@azious.com
        business_subject = f'Nouveau message de contact - {sujet}'
        business_message = f"""
Nouveau message reçu via le formulaire de contact :

Nom complet : {prenom} {nom}
Email : {email}
Sujet : {sujet}

Message :
{message}

---
Ce message a été envoyé depuis le formulaire de contact du site Azious.
        """

        send_mail(
            business_subject,
            business_message,
            settings.DEFAULT_FROM_EMAIL,
            [settings.BUSINESS_EMAIL],
            fail_silently=False,
        )

        # Email de remerciement au client
        client_subject = 'Merci pour votre message - Azious'
        client_message = f"""
Bonjour {prenom},

Nous avons bien reçu votre message concernant : {sujet}

Notre équipe examinera votre demande et vous contactera dans les plus brefs délais, généralement sous 24 heures.

Merci de votre confiance en Azious !

Cordialement,
L'équipe Azious

---
Ceci est un message automatique, merci de ne pas y répondre.
        """

        send_mail(
            client_subject,
            client_message,
            settings.DEFAULT_FROM_EMAIL,
            [email],
            fail_silently=False,
        )

        return JsonResponse({'success': True, 'message': 'Votre message a été envoyé avec succès!'})

    except Exception as e:
        import traceback
        print(f"Erreur contact form: {str(e)}")
        print(traceback.format_exc())
        return JsonResponse({'success': False, 'message': f'Erreur lors de l\'envoi : {str(e)}'})


# Fonction pour gérer le formulaire de projet
@require_POST
@csrf_exempt
def submit_project_form(request):
    try:
        data = json.loads(request.body)
        nom = data.get('nom')
        prenom = data.get('prenom')
        company_name = data.get('company_name', 'Non spécifié')
        company_type = data.get('company_type')
        service = data.get('service')
        other_service = data.get('other_service', '')
        budget = data.get('budget')
        description = data.get('description')
        deadline = data.get('deadline')
        email = data.get('email')

        # Déterminer le service complet
        service_text = f"{service} - {other_service}" if service == 'autre' and other_service else service

        # Email pour Business@azious.com
        business_subject = f'Nouvelle demande de projet - {service_text}'
        business_message = f"""
Nouvelle demande de projet reçue :

INFORMATIONS CLIENT :
- Nom : {prenom} {nom}
- Email : {email}
- Entreprise : {company_name}
- Type d'entreprise : {company_type}

DÉTAILS DU PROJET :
- Service demandé : {service_text}
- Budget : {budget}
- Délai : {deadline}

Description du projet :
{description}

---
Ce message a été envoyé depuis le formulaire "Démarrer un projet" du site Azious.
        """

        send_mail(
            business_subject,
            business_message,
            settings.DEFAULT_FROM_EMAIL,
            [settings.BUSINESS_EMAIL],
            fail_silently=False,
        )

        # Email de remerciement au client
        client_subject = 'Merci pour votre demande de projet - Azious'
        client_message = f"""
Bonjour {prenom},

Nous vous remercions pour l'intérêt que vous portez à nos services !

Nous avons bien reçu votre demande de projet concernant : {service_text}

Notre équipe d'experts va étudier votre projet en détail et vous contactera très prochainement pour discuter de vos besoins et vous proposer une solution adaptée.

Nous nous engageons à vous répondre sous 24 heures.

À très bientôt !

Cordialement,
L'équipe Azious

---
Ceci est un message automatique, merci de ne pas y répondre.
        """

        send_mail(
            client_subject,
            client_message,
            settings.DEFAULT_FROM_EMAIL,
            [email],
            fail_silently=False,
        )

        return JsonResponse({'success': True, 'message': 'Votre demande de projet a été envoyée avec succès!'})

    except Exception as e:
        return JsonResponse({'success': False, 'message': f'Erreur lors de l\'envoi : {str(e)}'}, status=500)