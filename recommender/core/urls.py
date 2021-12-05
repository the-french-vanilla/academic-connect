from django.urls import path

from core import views

from . import views

urlpatterns = [
    path('trendingnews/', views.TrendingNews.as_view(), name='trendingnews'),
]