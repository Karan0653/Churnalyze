from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)

# Load the saved model and scaler
model = joblib.load('churn_prediction_model.pkl')
scaler = joblib.load('scaler.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from request
        data = request.json
        input_data = np.array(data["features"]).reshape(1, -1)  # Ensure it's 2D

        # Standardize numerical features (first 3 columns are numerical)
        input_data[:, :3] = scaler.transform(input_data[:, :3])

        # Make prediction
        prediction = model.predict(input_data)
        probability = model.predict_proba(input_data)[:, 1]  # Probability of churn

        # Convert prediction to human-readable format
        result = {
            "churn_prediction": int(prediction[0]),
            "churn_probability": float(probability[0])
        }

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
