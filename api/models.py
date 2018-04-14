from django.db import models


# the following models were created by running:
# python manage.py inspectdb
# except for comments inline


class CandidateContributions(models.Model):
    transaction_id = models.TextField(primary_key=True)
    transaction_type = models.TextField(blank=True, null=True)
    election_cycle = models.TextField(blank=True, null=True)
    election = models.DateField(blank=True, null=True)
    primary_general_indicator = models.IntegerField(blank=True, null=True)
    transaction_date = models.DateField(blank=True, null=True)
    # note needed to change decimal_places from 65535 to 2 otherwise DRF raised an invalid decimal operation error
    transaction_amount = models.DecimalField(max_digits=65535, decimal_places=2, blank=True, null=True)
    filed_date = models.DateField(blank=True, null=True)
    recipient_committee_name = models.TextField(blank=True, null=True)
    recipient_candidate_name = models.TextField(blank=True, null=True)
    recipient_candidate_party = models.TextField(blank=True, null=True)
    recipient_candidate_ico = models.TextField(blank=True, null=True)
    recipient_candidate_status = models.TextField(blank=True, null=True)
    recipient_candidate_office = models.TextField(blank=True, null=True)
    recipient_candidate_district = models.TextField(blank=True, null=True)
    donor_name = models.TextField(blank=True, null=True)
    donor_city = models.TextField(blank=True, null=True)
    donor_state = models.TextField(blank=True, null=True)
    donor_zip_code = models.TextField(blank=True, null=True)
    donor_employer = models.TextField(blank=True, null=True)
    donor_occupation = models.TextField(blank=True, null=True)
    donor_organization = models.TextField(blank=True, null=True)
    donor_industry = models.TextField(blank=True, null=True)
    donor_entity_type = models.TextField(blank=True, null=True)
    donor_committee_id = models.TextField(blank=True, null=True)
    donor_committee_name = models.TextField(blank=True, null=True)
    donor_committee_type = models.TextField(blank=True, null=True)
    donor_committee_party = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'candidate_contributions'


class StgCandidateContributions(models.Model):
    transaction_type = models.TextField(blank=True, null=True)
    election_cycle = models.TextField(blank=True, null=True)
    election = models.DateField(blank=True, null=True)
    primary_general_indicator = models.IntegerField(blank=True, null=True)
    transaction_id = models.TextField(blank=True, null=True)
    transaction_date = models.DateField(blank=True, null=True)
    # note needed to change decimal_places from 65535 to 2 otherwise DRF raised an invalid decimal operation error
    transaction_amount = models.DecimalField(max_digits=65535, decimal_places=2, blank=True, null=True)
    filed_date = models.DateField(blank=True, null=True)
    recipient_committee_name = models.TextField(blank=True, null=True)
    recipient_candidate_name = models.TextField(blank=True, null=True)
    recipient_candidate_party = models.TextField(blank=True, null=True)
    recipient_candidate_ico = models.TextField(blank=True, null=True)
    recipient_candidate_status = models.TextField(blank=True, null=True)
    recipient_candidate_office = models.TextField(blank=True, null=True)
    recipient_candidate_district = models.TextField(blank=True, null=True)
    donor_name = models.TextField(blank=True, null=True)
    donor_city = models.TextField(blank=True, null=True)
    donor_state = models.TextField(blank=True, null=True)
    donor_zip_code = models.TextField(blank=True, null=True)
    donor_employer = models.TextField(blank=True, null=True)
    donor_occupation = models.TextField(blank=True, null=True)
    donor_organization = models.TextField(blank=True, null=True)
    donor_industry = models.TextField(blank=True, null=True)
    donor_entity_type = models.TextField(blank=True, null=True)
    donor_committee_id = models.TextField(blank=True, null=True)
    donor_committee_name = models.TextField(blank=True, null=True)
    donor_committee_type = models.TextField(blank=True, null=True)
    donor_committee_party = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'stg_candidate_contributions'


class StgCandidateElectionResults(models.Model):
    record_id = models.TextField(primary_key=True)
    single_county_race_id = models.TextField(blank=True, null=True)
    mult_county_race_id = models.TextField(blank=True, null=True)
    mult_county_candidate_id = models.TextField(blank=True, null=True)
    is_multiple_county_race = models.NullBooleanField()
    candidate_last_name = models.TextField(blank=True, null=True)
    candidate_first_name = models.TextField(blank=True, null=True)
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
    # note needed to change decimal_places from 65535 to 5 otherwise DRF raised an invalid decimal operation error
    percent_of_votes_received_by_candidate = models.DecimalField(max_digits=65535,
                                                                 decimal_places=5,
                                                                 blank=True,
                                                                 null=True)
    candidate_election_outcome = models.IntegerField(blank=True, null=True)
    candidate_election_outcome_description = models.TextField(blank=True, null=True)
    mult_county_number_votes_for_candidate = models.IntegerField(blank=True, null=True)
    mult_county_total_votes_for_all_candidates = models.IntegerField(blank=True, null=True)
    mult_county_rank_order_of_candidates = models.IntegerField(blank=True, null=True)
    mult_county_candidate_election_outcome = models.IntegerField(blank=True, null=True)
    mult_county_candidate_election_outcome_description = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'stg_candidate_election_results'
