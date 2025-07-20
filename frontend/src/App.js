import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Chat from './chat';
import Navbar from './Navbar';
import About from './About';
import './App.css';
import axios from 'axios';
import FloatingDotsBackground from './FloatingDotsBackground';

function FadeTransition({ children }) {
  return (
    <div className="fade-transition">
      {children}
    </div>
  );
}

function MainApp() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/api/conversations');
      setConversations(res.data);
    } catch (e) {
      setConversations([]);
    }
  };

  const handleSelectConversation = (id) => {
    setSelectedConversationId(id);
  };

  const handleNewConversation = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/conversation');
      setSelectedConversationId(res.data.conversation_id);
      fetchConversations();
    } catch (e) {}
  };

  return (
    <div className="app-bg-wrapper">
      <FloatingDotsBackground />
      <Navbar />
      <div className="app-content">
        <FadeTransition key={location.pathname}>
          <Routes location={location}>
            <Route
              path="/"
              element={
                <div className="app-container" style={{ display: 'flex', height: '100vh', width: '100vw' }}>
                  <div className="sidebar">
                    <div className="sidebar-header">
                      <span>MoodMate</span>
                    </div>
                    <button className="new-convo-btn sidebar-btn" onClick={handleNewConversation}>+ New Chat</button>
                    <div className="sidebar-list">
                      {conversations.map((c) => (
                        <div
                          key={c.conversation_id}
                          className={`sidebar-item${selectedConversationId === c.conversation_id ? ' selected' : ''}`}
                          onClick={() => handleSelectConversation(c.conversation_id)}
                        >
                          <div className="sidebar-title">{c.title}</div>
                          <div className="sidebar-date">{c.timestamp ? new Date(c.timestamp).toLocaleString() : ''}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Chat
                      key={selectedConversationId || 'new'}
                      conversationId={selectedConversationId}
                      onNewConversation={handleNewConversation}
                      onConversationsChanged={fetchConversations}
                    />
                  </div>
                </div>
              }
            />
            <Route
              path="/about"
              element={<About />}
            />
          </Routes>
        </FadeTransition>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

export default App;
