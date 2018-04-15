from django.urls import path
from health import views


urlpatterns = [
    path('', views.system_health),
    path('database', views.database)
]
