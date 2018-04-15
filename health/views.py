# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db import connections
from django.db.utils import OperationalError
from congressionaldata.utilities.settings_util import settings


@api_view(['GET'])
def system_health(request):
    print('The Health Index Endpoint has been Requested')
    data = {
        'health_endpoints': ['/health/', '/health/database'],
        'health_checks': {
            'system': {'status': 'up'},
            'database_health': database_health_dictionary(),
        }}
    return Response(data=data, status=status.HTTP_200_OK, content_type='application/json')


@api_view(['GET'])
def database(request):
    print('Database Health Endpoint has been Requested')
    data = {'database_health': database_health_dictionary()}
    return Response(data=data, status=status.HTTP_200_OK, content_type='application/json')


def database_health_dictionary():
    db_conn = connections['default']
    database_status = 'up'
    try:
        db_conn.cursor()
    except OperationalError:
        database_status = 'down'
    return {'engine': settings.DATABASES['default']['ENGINE'], 'status': database_status}
