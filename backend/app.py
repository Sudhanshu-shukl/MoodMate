from flask import Flask, request, jsonify
from flask_cors import CORS
from model import get_response
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import uuid

app = Flask(__name__)
CORS(app)

# SQLite config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///conversations.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Conversation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    conversation_id = db.Column(db.String(36), nullable=False, index=True)
    user_message = db.Column(db.Text, nullable=False)
    bot_response = db.Column(db.Text, nullable=False)
    mode = db.Column(db.String(32), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

chat_history = {}

@app.route("/api/conversation", methods=["POST"])
def start_conversation():
    # Returns a new conversation_id
    return jsonify({"conversation_id": str(uuid.uuid4())})

@app.route("/api/conversations", methods=["GET"])
def list_conversations():
    # Return a list of conversation_id and first user message (as title) and timestamp
    convos = db.session.query(Conversation.conversation_id, db.func.min(Conversation.timestamp).label('timestamp')).group_by(Conversation.conversation_id).all()
    result = []
    for convo_id, timestamp in convos:
        first_msg = Conversation.query.filter_by(conversation_id=convo_id).order_by(Conversation.id.asc()).first()
        result.append({
            "conversation_id": convo_id,
            "title": first_msg.user_message[:40] if first_msg else "(no message)",
            "timestamp": timestamp.isoformat() if timestamp else None
        })
    # Sort by most recent
    result.sort(key=lambda x: x["timestamp"], reverse=True)
    return jsonify(result)

@app.route("/api/conversation/<conversation_id>", methods=["GET"])
def get_conversation(conversation_id):
    messages = Conversation.query.filter_by(conversation_id=conversation_id).order_by(Conversation.id.asc()).all()
    return jsonify([
        {
            "user_message": m.user_message,
            "bot_response": m.bot_response,
            "mode": m.mode,
            "timestamp": m.timestamp.isoformat()
        } for m in messages
    ])

@app.route("/api/message", methods=["POST"])
def chat():
    global chat_history

    data = request.json
    user_id = "default_user"
    user_message = data.get("message", "")
    mode = data.get("mode", "neutral")
    conversation_id = data.get("conversation_id")
    if not conversation_id:
        conversation_id = str(uuid.uuid4())

    if not user_message:
        return jsonify({"error": "No input provided"}), 400

    if user_id not in chat_history:
        chat_history[user_id] = []

    chat_history[user_id].append({"role": "user", "message": user_message})

    bot_response = get_response(user_message, mode=mode)
    bot_response = bot_response.strip().split("\n")[0][:250]

    chat_history[user_id].append({"role": "bot", "message": bot_response})

    # Store in database
    convo = Conversation(
        conversation_id=conversation_id,
        user_message=user_message,
        bot_response=bot_response,
        mode=mode
    )
    db.session.add(convo)
    db.session.commit()

    return jsonify({"response": bot_response, "conversation_id": conversation_id})

@app.before_first_request
def create_tables():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
