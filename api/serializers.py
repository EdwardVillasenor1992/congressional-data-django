from rest_framework import serializers

from api.models import CandidateContributions


class CandidateContributionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CandidateContributions
        fields = '__all__'
