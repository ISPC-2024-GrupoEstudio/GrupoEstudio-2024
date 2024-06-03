"""
URL configuration for PetBoutique project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView, ProcessPaymentView
# inclusión API registro
from PetBoutiqueApp.api import UserAPI

# Incorporo API autenticación
from rest_framework import routers

# API router
router = routers.DefaultRouter()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('PetBoutiqueApp.urls')),
    
    path('', TemplateView.as_view(template_name='index.html'), name='index'), # sirve el index de Angular

    #Add Django site authentication urls (for login, logout, password management)
    path('accounts/', include('django.contrib.auth.urls')),

    # API registro usuarios
    path('api/1.0/create_user/', UserAPI.as_view(),name= "api_create_user"),

    # API autenticación routes
    path('api/', include('PetBoutiqueApp.urls')),
    path('api/', include(router.urls)),
]


