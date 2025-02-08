import django
from django.conf import settings
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Project.settings")
django.setup()

channel_layer = get_channel_layer()
async_to_sync(channel_layer.group_add)("test", "test")
