"""Election Data Model Admin
"""

from django.contrib import admin
from .models import *


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('date', 'transaction_type', 'transaction_amount', 'election_cycle', 'recipient_candidate', 'donor')


@admin.register(Candidate)
class CandidateAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'party', 'district', 'status')


@admin.register(Donor)
class DonorAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'city', 'state', 'committee')


@admin.register(Committee)
class CommitteeAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'party')


@admin.register(ElectionResult)
class ElectionResultAdmin(admin.ModelAdmin):
    pass
