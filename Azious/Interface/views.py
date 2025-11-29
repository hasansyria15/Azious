from django.shortcuts import render

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