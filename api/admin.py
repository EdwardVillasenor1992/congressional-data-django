"""Congressional Data Admin
"""

from django.contrib import admin
from .models import *

@admin.register(CandidateContributions)
class CandidateContributionsAdmin(admin.ModelAdmin):
    pass


@admin.register(StgCandidateContributions)
class StgCandidateContributionsAdmin(admin.ModelAdmin):
    pass


@admin.register(StgCandidateElectionResults)
class StgCandidateElectionResultsAdmin(admin.ModelAdmin):
    pass
