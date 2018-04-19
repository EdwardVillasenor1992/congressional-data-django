# Congressional Data Django [![Build Status](https://travis-ci.org/sfbrigade/congressional-data-django.svg?branch=master)](https://travis-ci.org/sfbrigade/congressional-data-django) [![Coverage Status](https://coveralls.io/repos/github/sfbrigade/congressional-data-django/badge.svg?branch=master)](https://coveralls.io/github/sfbrigade/congressional-data-django?branch=master)

Welcome to the Congressional Data Django README file. This is a living breathing document so don't be shy and feel free to contribute documentation!

- [Production Environment](https://campaignfinance.azurewebsites.net)
- [Development Environment](https://campaignfinance-development.azurewebsites.net/)

**Who are you?**

- [Developer](#getting-started)
- [DevOps](#devops)

## Getting Started
This guide will walk you through getting your local environment stood up.

### Setup Local Postgres Instance

#### Install Required Dependencies
In order to stand up a local postgres instance first you have to install several dependencies.

##### Ubuntu Users

First log in as the super user so you don't have to sudo everything
```bash
sudo su
```

Next install the following packages
```bash
apt-get update
apt-get install python-pip python-dev libpq-dev postgresql postgresql-contrib
```

**Optional:** configure a start-up on boot
```bash
update-rc.d postgresql enable
```

##### Mac Users

```bash
brew update
brew install python postgresql
```

##### Windows Users

coming soon...

if you are using Ubuntu on Windows, please see Ubuntu Users

#### Start Up Local Postgres

##### Ubuntu Users

Start up the service!
```bash
service postgresql start
```

Switch from super user to the postgres user
```bash
su - postgres
```

Last, make sure your pg_hba.conf is set up correctly
```bash
cat /etc/postgresql/<postgres version>/main/pg_hba.conf
```

Make sure that the following line appears

```bash
# TYPE DATABASE USER ADDRESS METHOD
local  all      all          md5
```

The default values may be the postgres user for the database and user as well as "peer" for the method. Make sure that the database is set to all, the users are set to all, and the method is set to md5 and not peer.

Restart to apply configuration changes
```bash
service postgresql restart
```

##### Mac Users

```bash
pg_ctl -D /usr/local/var/postgres start && brew services start postgresql
```

Then check the running version.
```bash
postgres -V
```

##### Everyone!

```bash
psql postgres # You may need to run this with sudo
```

This should start the postgres cli tool. (You can tell if your console prepend says, "postgres=". Let's first use it to check out our users.

```bash
\du
```
You should see a Superuser role created automatically. Let's create a service account user as well as change the settings to what Django expects. **Remember:** end every sql statement with a semicolon in the CLI tool.
```sql
CREATE USER <username> WITH LOGIN PASSWORD '<password>';
ALTER ROLE <username> SET client_encoding TO 'utf8';
ALTER ROLE <username> SET default_transaction_isolation TO 'read committed';
ALTER ROLE <username> SET timezone TO 'UTC';
```

Replace the angle brackets with your desired username/password combination, eg foo/bar. This is the account you will use for your _local_ Django settings.

Optionally, at this point you can give your service account user permissions to create databases.
```sql
ALTER ROLE <username> CREATEDB;
```

Lets create a database! If you want to create it with your service account user then exit the CLI tool (type \q) and re-enter using
```bash
psql postgres -U <username>
```

Now that we are logged in, lets create our local database and grant all privileges to our service account user.
```sql
CREATE DATABASE congressionaldata;
GRANT ALL PRIVILEGES ON DATABASE congressionaldata TO <username>;
```

At this point you should have your local postgres set up.

#### Configure Django

**congresionaldata/settings/local.py**

This file contains the settings specific to your local environment. Notice the DATABASES settings are extracting data from a local settings file (which should not exist if you have just cloned the repo).
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.environ['LOCAL_POSTGRES_DATABASE_NAME'],
        'USER': os.environ['LOCAL_POSTGRES_USER'],
        'PASSWORD': os.environ['LOCAL_POSTGRES_PASSWORD'],
        'HOST': 'localhost',
        'PORT': '',
    }
}
```
Make sure to create the directory and file described below.

**secrets/local_settings.py**

This file is ignored by git and contains the actual credentials which will be used to authenticate your local postgres.
```python
import os
os.environ['LOCAL_POSTGRES_DATABASE_NAME'] = 'congressionaldata'
os.environ['LOCAL_POSTGRES_USER'] = '<username>'
os.environ['LOCAL_POSTGRES_PASSWORD'] = '<password>'
print('Local Secrets Loaded!')
```
It is recommended to contain the print statement at the bottom of your local secrets file for debugging purposes.

#### Choosing an Environment

If you are using Djanga manage to run your local server you can use the settings flag to choose which environment to run.
```bash
./manage.py runserver --settings=congressionaldata.settings.local
```

If you are using your IDE to run the server then make sure you have the following environment variable set in your run configuration.

```properties
DJANGO_SETTINGS_MODULE=congressionaldata.settings.local
```

#### Making Migrations

If this is the first time you have ran the Django application against your local database you are going to have to perform a Django migration.

First run the makemigrations command to generate the necessary migration files.
```bash
./manage.py makemigrations
```

Next run the migrate command (and make sure the settings is pointed at your local environment) to sync the existing Django model with your database tables.
```bash
./manage.py migrate --settings=congressionaldata.settings.local
```

#### Create your Superuser

Once the migration has been completed you will have to create a super user to authenticate in the Django admin page.

```bash
./manage.py createsuperuser --settings=congressionaldata.settings.local
```
Follow the steps output by this command.


### Troubleshooting

#### Mac Users

1. Reread the docs! You may have missed something.
2. Run brew doctor and follow all the cleanup steps
3. Check our IDE configuration


## DevOps

### Azure Administration

[Azure Portal](https://portal.azure.com/)

### CI with Travis

### Secret Injection with Travis

Production secrets such as special keys, tokens, and credentials cannot be stored in the project repository. Travis allows us to encrypt all of our secrets using public key unique to each secret. That secret will only be able to be decrypted using the private key stored on travis.

#### Setup

Before you install the travis cli tool, first make sure that you have updated your Ruby and Gem versions. There are some known issues with the travis cli tool with ruby versions < 2.5

Once you have a recent version of Ruby and Gem, install travis

```bash
gem install travis -v 1.8.8 --no-rdoc --no-ri
```

#### Storing Secrets

First thing you need to do is authenticate the travis cli tool so you can have access to your travis account.

```
travis login
```

Now that you have installed travis, and authenticated, you can begin storing secrets.

Suppose you want to store the key value pair SOMEVAR="secretvalue"

Travis will generate an RSA keypair exposing the public key at https://api.travis-ci.org/repos/somevar/key. The private key will remain secret known only to travis. The cli tool will use this new public key to encrypt the key value pair. The --add flag will immediately add this encrypted keyvalue pair to the travis.yml file.


```bash
travis encrypt SOMEVAR="secretvalue" --add -r <organization>/<repository>
```

This will store the encrypted secret on travis
```bash
export SOMEVAR="secretvalue"
```
