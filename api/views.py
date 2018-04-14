import json
from rest_framework import viewsets
from django.http import HttpResponse

from api.models import CandidateContributions
from api.serializers import CandidateContributionSerializer


class CandidateContributionsViewSet(viewsets.ReadOnlyModelViewSet):

    serializer_class = CandidateContributionSerializer

    # override the default query set to limit to 100 objects, just for this sample app
    queryset = CandidateContributions.objects.all()[0:100]

def funding_sources(request, candidate_name, count):
    """Return the top thirty funding sources for a candidate.

    Keyword arguments:
    request -- HTTP request object
    candidate_name -- The candidate last name
    count -- The number of contributors to fetch
    """
    funding_source_query = CandidateContributions.objects.raw(
        """
        SELECT 1 transaction_id,
               donor_name,
               sum(transaction_amount) AS sum
        FROM trg_analytics.candidate_contributions
        WHERE recipient_candidate_name LIKE %s
        GROUP BY donor_name
        ORDER BY sum DESC LIMIT %s
        """, params = (["%%%s%%" % candidate_name.upper(), str(count)]))
    sources = []
    for source in funding_source_query:
        sources.append({
            'donor': source.donor_name,
            'sum': float(source.sum)
        })
    return HttpResponse(json.dumps(sources))
