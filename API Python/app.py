# -*- encoding: utf-8 -*-
from flask import Flask
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
db = MongoClient('mongodb://localhost:27017')
mongo = db.inegi
CORS(app)