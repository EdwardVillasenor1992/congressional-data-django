"""Election Data Models
"""

from django.db import models


class Transaction(models.Model):
    """Transaction Data Model
    """
    transaction_type = models.TextField(blank=True, null=True)
    election_cycle = models.TextField(blank=True, null=True)
    election = models.DateField(blank=True, null=True)
    primary_general_indicator = models.IntegerField(blank=True, null=True)
    date = models.DateField(blank=True, null=True)
    transaction_amount = models.DecimalField(max_digits=15, decimal_places=6)
    filed_date = models.DateField(blank=True, null=True)
    recipient_committee_name = models.TextField(blank=True, null=True)
    recipient_candidate = models.ForeignKey('Candidate', on_delete=models.PROTECT)
    donor = models.ForeignKey('Donor', on_delete=models.PROTECT)


class Candidate(models.Model):
    """Candidate Data Model
    """
    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    party = models.TextField(blank=True, null=True)
    ico = models.TextField(blank=True, null=True)
    status = models.TextField(blank=True, null=True)
    office = models.TextField(blank=True, null=True)
    district = models.TextField(blank=True, null=True)


class Donor(models.Model):
    """Donor Data Model
    """
    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    city = models.TextField(blank=True, null=True)
    state = models.TextField(blank=True, null=True)
    zip_code = models.CharField(max_length=9, blank=True, null=True)
    employer = models.TextField(blank=True, null=True)
    occupation = models.TextField(blank=True, null=True)
    organization = models.TextField(blank=True, null=True)
    industry = models.TextField(blank=True, null=True)
    entity_type = models.TextField(blank=True, null=True)
    committee = models.ForeignKey('Committee', on_delete=models.PROTECT)


class Committee(models.Model):
    """Committee Data Model
    """
    name = models.TextField(blank=True, null=True)
    type = models.TextField(blank=True, null=True)
    party = models.TextField(blank=True, null=True)


class ElectionResult(models.Model):
    single_county_race_id = models.TextField(blank=True, null=True)
    mult_county_race_id = models.TextField(blank=True, null=True)
    mult_county_candidate_id = models.TextField(blank=True, null=True)
    is_multiple_county_race = models.NullBooleanField()
    candidate_last_name = models.ForeignKey('Candidate', on_delete=models.PROTECT)
    county_name = models.TextField(blank=True, null=True)
    jurisdiction_code = models.TextField(blank=True, null=True)
    jurisdiction_code_description = models.TextField(blank=True, null=True)
    election_year = models.IntegerField(blank=True, null=True)
    election_date = models.DateField(blank=True, null=True)
    political_jurisdiction = models.TextField(blank=True, null=True)
    is_csd = models.NullBooleanField()
    office = models.TextField(blank=True, null=True)
    office_code = models.TextField(blank=True, null=True)
    office_code_description = models.TextField(blank=True, null=True)
    area_within_office = models.TextField(blank=True, null=True)
    term_of_office = models.TextField(blank=True, null=True)
    number_seats_to_be_filled = models.IntegerField(blank=True, null=True)
    candidate_ballot_designation = models.TextField(blank=True, null=True)
    is_incumbent = models.NullBooleanField()
    number_candidates_running = models.IntegerField(blank=True, null=True)
    number_votes_for_candidate = models.IntegerField(blank=True, null=True)
    total_votes_for_all_candidates = models.IntegerField(blank=True, null=True)
    rank_order_of_candidates = models.IntegerField(blank=True, null=True)
    percent_votes_received_by_candidate = models.DecimalField(max_digits=15, decimal_places=6)
    candidate_election_outcome = models.IntegerField(blank=True, null=True)
    candidate_election_outcome_description = models.TextField(blank=True, null=True)
    mult_county_number_votes_for_candidate = models.IntegerField(blank=True, null=True)
    mult_county_total_votes_for_all_candidates = models.IntegerField(blank=True, null=True)
    mult_county_rank_order_of_candidates = models.IntegerField(blank=True, null=True)
    mult_county_candidate_election_outcome = models.IntegerField(blank=True, null=True)
    mult_county_candidate_election_outcome_description = models.TextField(blank=True, null=True)
