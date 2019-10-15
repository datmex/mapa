# -*- encoding: utf-8 -*-
from flask import Flask
from pymongo import MongoClient
from flask_cors import CORS
uri = "mongodb://inegi:rsF7vS5QFZmUCLTHNo7sEYTN3lOxVkHJSH6Vf3xlSGbj8hXzM3hGxZHNxTe9Fny296ya4BgjnSetDZyrj4b8yA==@inegi.documents.azure.com:10255/?ssl=true&replicaSet=globaldb"
app = Flask(__name__)
db = MongoClient(uri)
mongo = db.inegi
CORS(app)