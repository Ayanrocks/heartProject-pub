import json
import pickle

import numpy as np
import requests
from flask import Flask, request, abort
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)
newmodel = None
Pkl_Filename = "model/Pickle_RL_Model.pkl"
with open(Pkl_Filename, 'rb') as file:
    newmodel = pickle.load(file)


# app.config['CORS_HEADERS'] = 'Content-Type'

def predict(angina, chest_pain, thalassemia_rate, heart_rate, sex, age):
    data = np.array([[age, sex, chest_pain, heart_rate, angina, thalassemia_rate]])
    predicted_result = newmodel.predict(data)
    int_predicted_result = predicted_result.astype(np.int32)
    return int_predicted_result[0]


def send_repot_to_db(angina, chest_pain, thalassemia_rate, heart_rate, sex, age, result,
                     patient_id, cookie):
    data = {'patientId': patient_id, 'angina': angina, 'chestPain': chest_pain,
            'thalassemiaRate': thalassemia_rate,
            'heartRate': heart_rate, 'sex': sex, 'age': age, 'result': result}
    r = requests.post("http://main_api:5000/user/data/report/save", data=data,
                      cookies=cookie)


@app.route('/user/report/predict', methods=['POST'])
def predict_health():
    if (request.method == 'POST'):
        token = request.cookies.get('token')
        r = requests.get("http://main_api:5000/user/loggedIn", cookies={'token': token})
        user_data = r.json()
        if r.status_code == 200 and user_data:
            req_data = request.get_json()
            angina = req_data["angina"]
            chest_pain = req_data['chestPain']
            thalassemia_rate = req_data['thalassemiaRate']
            heart_rate = req_data['heartRate']
            sex = req_data['sex']
            age = req_data['age']
            result = predict(angina, chest_pain, thalassemia_rate, heart_rate, sex, age)
            send_repot_to_db(angina=angina, chest_pain=chest_pain,
                             thalassemia_rate=thalassemia_rate, heart_rate=heart_rate, sex=sex,
                             age=age,
                             result=str(result),
                             patient_id=user_data['id'], cookie={'token': token})
            return str(result)
        else:
            abort(403)
    else:
        abort(400)
