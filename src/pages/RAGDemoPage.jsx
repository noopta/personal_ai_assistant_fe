import { useState, useRef, useEffect } from 'react';
import styles from './RAGDemoPage.module.css';
import { useTheme } from '../contexts/ThemeContext';
import ReactMarkdown from 'react-markdown';

function RAGDemoPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [metadata, setMetadata] = useState(null);
  const [timing, setTiming] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { isDark } = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isStreaming) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const query = input;
    setInput('');
    setIsStreaming(true);
    setMetadata(null);
    setTiming(null);

    try {
      const response = await fetch('https://api.airthreads.ai:5001/agent-rag-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ query })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let assistantContent = '';
      setMessages(prev => [...prev, { role: 'assistant', content: '', isStreaming: true }]);

      let buffer = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('event: metadata')) {
            continue;
          } else if (line.startsWith('event: complete')) {
            continue;
          } else if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));

              if (data.token) {
                assistantContent += data.token;
                setMessages(prev => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { 
                    role: 'assistant', 
                    content: assistantContent,
                    isStreaming: true 
                  };
                  return updated;
                });
              } else if (data.query || data.intent) {
                setMetadata(data);
              } else if (data.status === 'complete') {
                setTiming(data.timing);
              }
            } catch (e) {
              console.log('Parse error for line:', line);
            }
          }
        }
      }

      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { 
          role: 'assistant', 
          content: assistantContent,
          isStreaming: false 
        };
        return updated;
      });

    } catch (error) {
      console.error('Stream error:', error);
      setMessages(prev => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage?.role === 'assistant' && lastMessage?.isStreaming) {
          return [
            ...prev.slice(0, -1),
            { role: 'assistant', content: `Error: ${error.message}`, isStreaming: false }
          ];
        }
        return [
          ...prev,
          { role: 'assistant', content: `Error: ${error.message}`, isStreaming: false }
        ];
      });
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const exampleQueries = [
    "whats my oldest email",
    "show me recent meetings",
    "coffee chats this week",
    "whats the total count of my emails"
  ];

  return (
    <div className={`${styles.container} ${isDark ? styles.dark : ''}`}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.badge}>Developer Preview</div>
          <h1 className={styles.title}>GraphRAG Demo</h1>
          <p className={styles.subtitle}>Real-time streaming chat with semantic search</p>
        </div>
      </div>

      <div className={styles.chatContainer}>
        <div className={styles.messagesArea}>
          {messages.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3>Start a conversation</h3>
              <p>Try one of these example queries:</p>
              <div className={styles.examples}>
                {exampleQueries.map((query, idx) => (
                  <button 
                    key={idx}
                    className={styles.exampleBtn}
                    onClick={() => setInput(query)}
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`${styles.message} ${styles[msg.role]}`}
            >
              {msg.role === 'assistant' && (
                <div className={styles.avatar}>
                  <svg viewBox="0 0 24 24" className={styles.avatarIcon}>
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19C3 20.1 3.9 21 5 21H11V19H5V3H13V9H21ZM17 12V15H20V17H17V20H15V17H12V15H15V12H17Z" fill="currentColor"/>
                  </svg>
                </div>
              )}
              <div className={styles.messageContent}>
                {msg.role === 'assistant' ? (
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                ) : (
                  msg.content
                )}
                {msg.isStreaming && <span className={styles.cursor}>▋</span>}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {metadata && (
          <div className={styles.metadataBar}>
            <span>Found {metadata.result_count || 0} results</span>
            {metadata.intent?.query_type && (
              <span className={styles.metaTag}>{metadata.intent.query_type}</span>
            )}
            {timing && timing.total < 0.1 && (
              <span className={styles.fastBadge}>⚡ Instant ({(timing.total * 1000).toFixed(0)}ms)</span>
            )}
            {timing && timing.total >= 0.1 && (
              <span className={styles.timingBadge}>{timing.total.toFixed(2)}s</span>
            )}
          </div>
        )}

        <div className={styles.inputArea}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Try: 'whats my oldest email' or 'show me recent meetings'"
            disabled={isStreaming}
            className={styles.input}
          />
          <button 
            onClick={sendMessage} 
            disabled={isStreaming || !input.trim()}
            className={styles.sendBtn}
          >
            {isStreaming ? (
              <span className={styles.streamingDot}></span>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className={styles.footer}>
        <p>Sample data • 1000 emails • Developer testing only</p>
      </div>
    </div>
  );
}

export default RAGDemoPage;
