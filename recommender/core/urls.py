from django.urls import path

from core import views

from . import views

urlpatterns = [
    path('recommendations/', views.Recommendations.as_view(), name='recommendations'),
]