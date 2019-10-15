from app import mongo
import json
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask import request
import socket
import requests
import re

# --- metodos utilizados

def dump(query):
	json = dumps(query,indent=1, ensure_ascii=False).encode('utf8')
	return json
    
def host():
    host = socket.gethostbyname(socket.gethostname()) #socket.getfqdn() ip del host
    return host

def findloc(data):
    res = json.loads(data)
    lat = float(res['lat'])
    longitud = float(res['long'])
    rad = int(res['rad'])
    print("Radio ",rad)
	#  longitud, latitud  formato mongo
    res = mongo.denue.find( { 'location': { '$near': { '$geometry': {'type':"Point", 'coordinates': [longitud,lat] }, '$minDistance': 0, '$maxDistance': rad}} },
    {"_id":1,"nom_estab":1,"codigo_act":1,"nom_vial":1,"tipo_vial":1,"nomb_asent":1,"cod_postal":1,"location":1,"numero_ext":1,
        "municipio":1,"entidad":1,"telefono":1})
    result = dump(res)
    return result

def get_prod(data):
    res = json.loads(data)
    string = str(res['prod'])
    pat = re.compile(r'{}'.format(string), re.I)
    res = mongo.scian.find({'productos': {'$regex': pat}})
    resp = dump(res)
    return resp

# --- metodos no utilizados

def clasi():
    res = mongo.scian.find({}).limit(1)
    resp = dump(res)
    return resp

def acti():
    res = mongo.denue.find().limit(1)
    resp = dump(res)
    return resp

def code(data):
    res = json.loads(data)
    pipeline = [
	    {'$match':{'_id':ObjectId(res['id'])}},
        {
        '$lookup': {
            'from': 'clasifica',
            'localField': 'codigo_act',
            'foreignField': 'codigo',
            'as': 'clasifica'}
        },
        {
        '$unwind': '$clasifica'
        },
        {
        '$project': {
            'productos':'$clasifica.productos',
            "_id":1,"nom_estab":1,"codigo_act":1,"nom_vial":1,"tipo_vial":1,"nomb_asent":1,"cod_postal":1,"location":1,"numero_ext":1,
            "municipio":1,"entidad":1,"telefono":1}
        },{'$limit':1}
    ]
    result = mongo.actividades.aggregate(pipeline)
    resp = dump(result)
    #print(resp)
    return resp