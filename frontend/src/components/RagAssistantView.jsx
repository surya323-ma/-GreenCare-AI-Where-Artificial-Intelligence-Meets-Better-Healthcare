import React, { useState, useEffect } from 'react';
import { Bot, Search, Send, BookOpen, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { ApiService } from '../services/api';

export default function RagAssistantView() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello! I am your GreenCare Botanical AI Assistant. Ask me anything about plant stress diagnosis, soil moisture retention, CAM metabolism, or SDG 6 water conservation strategies.'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [ragChunks, setRagChunks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchChunks('');
  }, []);

  const fetchChunks = async (q) => {
    const res = await ApiService.getRagChunks(q);
    setRagChunks(res.data);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: inputText };
    setMessages((prev) => [...prev, userMsg]);
    const query = inputText;
    setInputText('');
    setLoading(true);

    const res = await ApiService.askBotanicalAi(query);
    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: res.data.response,
        docRef: res.data.docRef,
        sdg: res.data.sdgAlignment,
        confidence: res.data.similarityScore
      };
      setMessages((prev) => [...prev, botMsg]);
      setLoading(false);
    }, 800);
  };

  const handleSearchChunks = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    fetchChunks(val);
  };

  return (
    <div className="view-container">
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '1.5rem' }}>
        {/* Chat Assistant */}
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--bg-card-border)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Bot color="var(--primary-emerald)" size={22} />
            <h2 style={{ fontSize: '1.15rem' }}>Botanical RAG Chatbot</h2>
          </div>

          <div className="chat-container">
            <div className="chat-messages">
              {messages.map((m) => (
                <div key={m.id} className={`message-bubble ${m.sender}`}>
                  <div>{m.text}</div>
                  {m.docRef && (
                    <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', fontSize: '0.75rem', display: 'flex', gap: '0.75rem', color: 'var(--text-dim)' }}>
                      <span>Ref: {m.docRef}</span>
                      <span>{m.sdg}</span>
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="message-bubble bot" style={{ fontStyle: 'italic', color: 'var(--text-dim)' }}>
                  Searching vector database & synthesizing answer...
                </div>
              )}
            </div>

            <form onSubmit={handleSendMessage} className="chat-input-row">
              <input 
                type="text" 
                className="chat-input" 
                placeholder="Ask e.g. Why are my leaves turning yellow?"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button type="submit" className="primary-btn" style={{ padding: '0.75rem 1.25rem' }}>
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Vector RAG Chunks Database Viewer */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookOpen color="var(--primary-emerald)" size={20} />
              <h2 style={{ fontSize: '1.15rem' }}>RAG Knowledge Chunks</h2>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <Search size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '12px' }} />
            <input 
              type="text" 
              className="form-input" 
              style={{ width: '100%', paddingLeft: '36px' }}
              placeholder="Filter knowledge chunks by topic or SDG..."
              value={searchQuery}
              onChange={handleSearchChunks}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '420px', overflowY: 'auto' }}>
            {ragChunks.map((chunk) => (
              <div key={chunk.id} style={{ background: 'rgba(10, 19, 21, 0.8)', border: '1px solid var(--bg-card-border)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--primary-emerald)', fontWeight: 700 }}>
                    {chunk.docRef} • {chunk.category}
                  </span>
                  <span style={{ fontSize: '0.72rem', background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)', padding: '2px 8px', borderRadius: '999px' }}>
                    Score: {(chunk.similarityScore * 100).toFixed(0)}%
                  </span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.45', marginBottom: '0.5rem' }}>
                  "{chunk.chunkText}"
                </p>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Sparkles size={12} color="var(--primary-emerald)" /> {chunk.sdgAlignment}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
