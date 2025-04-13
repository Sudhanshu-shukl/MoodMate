from flask import Flask, request, jsonify
from flask_cors import CORS
from model import get_response

app = Flask(__name__)
CORS(app)

chat_history = {}

@app.route("/api/message", methods=["POST"])
def chat():
    global chat_history

    data = request.json
    user_id = "default_user"
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"error": "No input provided"}), 400

    if user_id not in chat_history:
        chat_history[user_id] = []

    chat_history[user_id].append({"role": "user", "message": user_message})

    bot_response = get_response(user_message, mode="empathetic")
    bot_response = bot_response.strip().split("\n")[0][:250]

    chat_history[user_id].append({"role": "bot", "message": bot_response})

    return jsonify({"response": bot_response})

if __name__ == "__main__":
    app.run(debug=True)
