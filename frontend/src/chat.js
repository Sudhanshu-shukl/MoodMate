import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './chat.css';

const logoUrl = process.env.PUBLIC_URL + '/moomate logo.png';

const SendIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="currentColor"/>
  </svg>
);

const MODES = [
  { value: 'sarcastic', label: 'Sarcastic' },
  { value: 'brutally_honest', label: 'Brutally Honest' },
  { value: 'supportive', label: 'Supportive' },
  { value: 'neutral', label: 'Neutral' },
];

const Chat = ({ conversationId, onNewConversation, onConversationsChanged }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState(MODES[0].value);
  const [currentConversationId, setCurrentConversationId] = useState(conversationId);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (conversationId) {
      setCurrentConversationId(conversationId);
      fetchConversation(conversationId);
    } else {
      setMessages([]);
      setCurrentConversationId(null);
    }
  }, [conversationId]);

  const fetchConversation = async (cid) => {
    try {
      const res = await axios.get(`http://127.0.0.1:5000/api/conversation/${cid}`);
      // Flatten to user/bot message pairs
      const flat = [];
      res.data.forEach(pair => {
        flat.push({ sender: 'user', text: pair.user_message });
        flat.push({ sender: 'bot', text: pair.bot_response });
      });
      setMessages(flat);
    } catch (e) {
      setMessages([]);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/message', { message: input, mode, conversation_id: currentConversationId });
      const botMessage = { sender: 'bot', text: response.data.response };
      setMessages((prev) => [...prev, botMessage]);
      if (response.data.conversation_id && response.data.conversation_id !== currentConversationId) {
        setCurrentConversationId(response.data.conversation_id);
      }
      if (onConversationsChanged) onConversationsChanged();
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { sender: 'bot', text: 'Server offline' };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 8 }}>
        <img src={logoUrl} alt="MoodMate AI Logo" style={{ width: 40, height: 40, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }} />
        <div className="chat-title">MoodMate AI</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
        <div className="mode-selector">
          {MODES.map(m => (
            <button
              key={m.value}
              className={`mode-btn${mode === m.value ? ' selected' : ''}`}
              onClick={() => setMode(m.value)}
              type="button"
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            <div className="chat-bubble">
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button onClick={sendMessage} aria-label="Send">
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default Chat;
