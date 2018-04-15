import os
env = os.environ['DJANGO_SETTINGS_MODULE']
if env == 'congressionaldata.settings.local':
    from congressionaldata.settings import local as settings
elif env == 'congressionaldata.settings.dev':
    from congressionaldata.settings import dev as settings
elif env == 'congressionaldata.settings.prod':
    from congressionaldata.settings import prod as settings
