from django.test import TestCase
from election_data.models import *
# Create your tests here.


class CommitteeModelTest(TestCase):

    def test_committee_model(self):
        committee = Committee()
        committee.name = 'Test Name'
        committee.party = 'Test Party'
        committee.type = 'Test Type'
        committee.save()
        self.assertIsNotNone(committee)
        self.assertIsNotNone(committee.name)
        self.assertIsNotNone(committee.party)
        self.assertIsNotNone(committee.type)
