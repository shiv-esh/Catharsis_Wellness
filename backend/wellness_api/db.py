from pymongo import MongoClient
from django.conf import settings

def get_db():
    client = MongoClient(settings.MONGO_URI)
    db = client.get_default_database()
    return db
