"""
Development settings for congressionaldata project.

Generated by 'django-admin startproject' using Django 2.0.2.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.0/ref/settings/
"""

from congressionaldata.settings.common import *
import os

ALLOWED_HOSTS = ['https://campaignfinance-development.azurewebsites.net']
CORS_ORIGIN_WHITELIST = ('localhost:8080', '127.0.0.1:8080')

# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

DATABASES = {
    # Slack the #datasci-congressdata group for the appropriate credential
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.environ['DEV_POSTGRES_DATABASE_NAME'],
        'USER': os.environ['DEV_POSTGRES_USER'],
        'PASSWORD': os.environ['DEV_POSTGRES_PASSWORD'],
        'HOST': os.environ['DEV_POSTGRES_HOST'],
        'PORT': os.environ['DEV_POSTGRES_PORT'],
        'OPTIONS': {
            'options': '-c search_path=stg_analytics,trg_analytics',
            'sslmode': 'require',
        }
    }
}
