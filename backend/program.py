from flask import request, jsonify, Flask
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

# Load JSON data
with open("input_data.json") as f:
    idata = json.load(f)

@app.route("/movingavg", methods=["POST"])
def get_user_data():
    avg_days = request.json.get("days")
    avg_inst = request.json.get("inst")

    if not avg_days or not avg_inst:
        return jsonify({"message": "You must include a number of days and which instrument"}), 400

    if avg_inst not in idata:
        return jsonify({"message": "Instrument not found"}), 404

    # Sort data by date
    try:
        idata[avg_inst].sort(key=lambda x: x["date"])
    except KeyError:
        return jsonify({"message": f"Data for {avg_inst} is corrupted or missing"}), 500

    # Filter out entries with missing or invalid prices
    prices = [entry["price"] for entry in idata[avg_inst] if entry["price"] is not None]
    dates = [entry["date"] for entry in idata[avg_inst] if entry["price"] is not None]

    if len(prices) < avg_days:
        return jsonify({"message": "Not enough data points for the given number of days"}), 400

    # Calculate moving averages
    moving_avg = []
    moving_sum = sum(prices[:avg_days])
    moving_avg.append(moving_sum / avg_days)

    for i in range(avg_days, len(prices)):
        moving_sum += prices[i] - prices[i - avg_days]
        moving_avg.append(moving_sum / avg_days)

    # Return both the moving averages and corresponding dates
    return jsonify({
        "instrument": avg_inst,
        "moving_average": moving_avg,
        "dates": dates[avg_days-1:]  # Send dates starting from where the moving average can be calculated
    })

if __name__ == "__main__":
    app.run(debug=True)
