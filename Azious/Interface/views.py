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