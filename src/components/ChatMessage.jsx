import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './ChatMessage.module.css';
import { useTheme } from '../contexts/ThemeContext';
import Typewriter from './Typewriter';

function ChatMessage({ type, content }) {
  const { theme, isDark } = useTheme();

  // Custom components for ReactMarkdown with better styling
  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={isDark ? vscDarkPlus : vs}
          language={match[1]}
          PreTag="div"
          customStyle={{
            margin: '1rem 0',
            borderRadius: '8px',
            fontSize: '0.9rem'
          }}
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={styles.inlineCode} {...props}>
          {children}
        </code>
      );
    },
    p({ children }) {
      return <p className={styles.paragraph}>{children}</p>;
    },
    ul({ children }) {
      return <ul className={styles.unorderedList}>{children}</ul>;
    },
    ol({ children }) {
      return <ol className={styles.orderedList}>{children}</ol>;
    },
    li({ children }) {
      return <li className={styles.listItem}>{children}</li>;
    },
    h1({ children }) {
      return <h1 className={styles.heading1}>{children}</h1>;
    },
    h2({ children }) {
      return <h2 className={styles.heading2}>{children}</h2>;
    },
    h3({ children }) {
      return <h3 className={styles.heading3}>{children}</h3>;
    },
    blockquote({ children }) {
      return <blockquote className={styles.blockquote}>{children}</blockquote>;
    },
    a({ href, children }) {
      return (
        <a 
          href={href} 
          className={styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    },
    strong({ children }) {
      return <strong className={styles.strong}>{children}</strong>;
    },
    em({ children }) {
      return <em className={styles.emphasis}>{children}</em>;
    }
  };

  if (type === 'assistant') {
    return (
      <div className={`${styles.message} ${styles[type]}`}>
        <div className={styles.avatar}>
          <svg viewBox="0 0 24 24" className={styles.avatarIcon}>
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19C3 20.1 3.9 21 5 21H11V19H5V3H13V9H21ZM17 12V15H20V17H17V20H15V17H12V15H15V12H17Z"/>
          </svg>
        </div>
        <div className={styles.content}>
          <Typewriter 
            markdownText={content}
            components={components}
            speed={15}
          />
        </div>
      </div>
    );
  }

  // For user messages
  return (
    <div className={`${styles.message} ${styles[type]}`}>
      <div className={styles.avatar}>
        <svg viewBox="0 0 24 24" className={styles.avatarIcon}>
          <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"/>
        </svg>
      </div>
      <div className={styles.content}>
        <div className={styles.userText}>
          {content}
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;