from django.urls import path
from django.urls.conf import include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r'candidate_contributions', views.CandidateContributionsViewSet, base_name='candidate_contributions')

urlpatterns = [
    path('models/', include(router.urls)),
    path('funding/sources/<str:candidate_name>/<int:count>',
         views.funding_sources, name='funding_sources'),
]
