from flask import Flask, request, jsonify
from pymongo import MongoClient
from datetime import datetime
from flask_cors import CORS
app = Flask(__name__)
CORS(app, origins=["http://127.0.0.1:3000"])

# Configuração do MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['chatdb']
collection = db['mensagens']

@app.route('/api/send_message', methods=['POST'])
def send_message():
    data = request.get_json()
    message = data.get('message')
    if message:
        message_doc = {
            'message': message,
            'date': datetime.now()
        }
        result = collection.insert_one(message_doc)
        return jsonify({"message": "Mensagem enviada com sucesso", "message_id": str(result.inserted_id)})

@app.route('/api/get_messages', methods=['GET'])
def get_messages():
    messages = list(collection.find({}, {'_id': 0}))
    return jsonify(messages)

if __name__ == '__main__':
    app.run(debug=True)
