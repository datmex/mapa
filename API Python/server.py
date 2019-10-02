from app import app
import methods
from flask import jsonify, request

### ---  metodos utilizados

@app.route('/clasi',methods=["POST"])
def code(): 
	resp = methods.code(request.data)
	return resp

@app.route('/findloc',methods=["POST"])
def radio(): 
	resp = methods.findloc(request.data)
	return resp

@app.route('/producto',methods=["POST"])
def get_prod():
	resp = methods.get_prod(request.data)
	return resp
	
### --- no utilizados

@app.route('/clasifica')
def clasifica():
	resp = methods.clasi()
	return resp

@app.route('/acti')
def actividades():
	resp = methods.acti()
	return resp

@app.errorhandler(404)
def not_found(error=None):
    message = {
        'status': 404,
        'message': 'Not Found: ' + request.url,
    }
    resp = jsonify(message)
    resp.status_code = 404
    return resp

if __name__ == "__main__":
	app.run(host=methods.host(),debug=False,port=5000)

####   CODIGO QUE PUEDE SER DE UTILIDAD 

"""	
@app.route('/adduser', methods=['POST'])
def add_user():
	_json = request.json
	username = _json['username']
	password = _json['password']
	nombres = _json['nombres']
	apepat = _json['apepat']		
	apemat = _json['apemat']		
	email = _json['email']		
	cardNumber = _json['cardNumber']		
	exp = _json['exp']		
	cvv = _json['cvv']			
	# validate the received values
	if username and password:
		#do not save password as a plain text
		#_hashed_password = generate_password_hash(_password)
		# save edits
		mongo.db.usuario.insert_one({'username':username, 
                                'password':password, 
                                'nombres':nombres, 
                                'apepat':apepat, 
                                'apemat':apemat, 
                                'email':email,
                                'cardNumber':cardNumber,
                                'exp':exp,
                                'cvv':cvv })
		resp = jsonify('User updated successfully!')
		resp.status_code = 200
		print ("entra a la api de python")
		return resp
	else:
		resp.status_code = 400
		return resp
		
@app.route('/localidad/<localidad>')
def find_loc(localidad):
	loc = mongo.db.actividades.find({'localidad': localidad})
	resp = dumps(loc)
	return resp
		
@app.route('/user/<id>')
def user(id):
	user = mongo.db.actividades.find_one({'_id': ObjectId(id)})
	resp = dumps(user)
	return resp

@app.route('/update', methods=['PUT'])
def update_user():
	_json = request.json
	_id = _json['_id']
	_name = _json['name']
	_email = _json['email']
	_password = _json['pwd']		
	# validate the received values
	if _name and _email and _password and _id and request.method == 'PUT':
		#do not save password as a plain text
		#_hashed_password = generate_password_hash(_password)
		# save edits
		mongo.db.actividades.update_one({'_id': ObjectId(_id['$oid']) if '$oid' in _id else ObjectId(_id)}, {'$set': {'name': _name, 'email': _email }})
		resp = jsonify('User updated successfully!')
		resp.status_code = 200
		return resp
	else:
		return not_found()
		
@app.route('/delete/<id>', methods=['DELETE'])
def delete_user(id):
	mongo.db.actividades.delete_one({'_id': ObjectId(id)})
	resp = jsonify('User deleted successfully!')
	resp.status_code = 200
	return resp
		
"""