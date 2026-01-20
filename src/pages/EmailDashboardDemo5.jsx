import React, { useState, useMemo, useRef, useEffect } from 'react';
import { emailCategories, mockEmails, getEmailsByCategory, getCategoryCounts } from '../data/mockEmailData';
import { useTheme } from '../contexts/ThemeContext';
import styles from './EmailDashboardDemo5.module.css';
import * as emailApi from '../services/emailApi';
import ReactMarkdown from 'react-markdown';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SIDEBAR_CATEGORIES = [
  { id: 'all', label: 'All Mail' },
  { id: 'work', label: 'Work' },
  { id: 'personal', label: 'Personal' },
  { id: 'finance', label: 'Finance' },
  { id: 'urgent', label: 'Urgent' },
  { id: 'social', label: 'Social' },
];

const CATEGORY_MAPPING = {
  all: null,
  work: 'meetings',          // Backend uses single category
  personal: 'personal',
  finance: 'bills',
  urgent: 'urgent',
  social: 'social',
};

const EMAILS_PER_PAGE = 20;

export default function EmailDashboardDemo5() {
  const { theme, isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isEmailDetailClosing, setIsEmailDetailClosing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Backend state
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backendPagination, setBackendPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
    totalCount: 0
  });
  const [backendCategoryCounts, setBackendCategoryCounts] = useState({});
  
  // Pagination state
  const [emailPage, setEmailPage] = useState(1);
  
  // AI Panel states - always use sidebar mode, always open
  const [aiPanelCollapsed, setAiPanelCollapsed] = useState(false);
  
  // Email context (dragged emails)
  const [emailContext, setEmailContext] = useState([]);
  const [draggedEmail, setDraggedEmail] = useState(null);
  const [isDraggingOverChat, setIsDraggingOverChat] = useState(false);
  
  const [aiMessages, setAiMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your AI email assistant. Ask me to find emails, summarize threads, or help you draft responses. Try: \"Show me urgent emails\" or \"Summarize my work emails\""
    }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [starredEmails, setStarredEmails] = useState(new Set());
  const [archivedEmails, setArchivedEmails] = useState(new Set());
  
  // Reply/Forward modals & Calendar panel
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [forwardModalOpen, setForwardModalOpen] = useState(false);
  const [calendarPanelOpen, setCalendarPanelOpen] = useState(false);
  const [integrationsMenuOpen, setIntegrationsMenuOpen] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [forwardTo, setForwardTo] = useState('');
  const [forwardNote, setForwardNote] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDateTime, setEventDateTime] = useState(new Date());
  const [eventNotes, setEventNotes] = useState('');
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(new Date());
  
  // Mock schedule data for demo
  const mockSchedule = [
    { time: '9:00 AM', title: 'Team Standup', color: '#1a73e8' },
    { time: '11:30 AM', title: 'Product Review', color: '#e37400' },
    { time: '2:00 PM', title: 'Client Meeting', color: '#d50000' },
    { time: '4:00 PM', title: 'Design Review', color: '#0b8043' },
  ];
  
  // Custom Filters
  const [customFilters, setCustomFilters] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [newFilterName, setNewFilterName] = useState('');
  const [newFilterCriteria, setNewFilterCriteria] = useState('');
  const chatEndRef = useRef(null);
  const skipNextAutoScrollRef = useRef(false);
  const hasMountedRef = useRef(false);
  const aiPanelRef = useRef(null);
  const aiChatAreaRef = useRef(null);
  const emailListRef = useRef(null);
  const integrationsMenuRef = useRef(null);

  // ===== LOCAL DEVELOPMENT MODE =====
  // Set to true for local testing with mock data, false for production
  const USE_MOCK_DATA = false;

  // Fetch emails (from mock data or backend)
  useEffect(() => {
    if (USE_MOCK_DATA) {
      // LOCAL DEVELOPMENT: Use mock data
      setLoading(true);
      
      // Simulate network delay for realistic testing
      setTimeout(() => {
        let filteredEmails = [...mockEmails];
        
        // Filter by category
        if (selectedCategory !== 'all') {
          filteredEmails = filteredEmails.filter(email => 
            email.category === selectedCategory
          );
        }
        
        // Filter by search query
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filteredEmails = filteredEmails.filter(email =>
            email.subject.toLowerCase().includes(query) ||
            email.snippet.toLowerCase().includes(query) ||
            (email.from?.name?.toLowerCase().includes(query)) ||
            (email.from?.email?.toLowerCase().includes(query))
          );
        }
        
        // Calculate counts
        const counts = getCategoryCounts(mockEmails);
        
        setEmails(filteredEmails);
        setBackendCategoryCounts(counts);
        setBackendPagination({
          currentPage: 1,
          totalPages: 1,
          hasNextPage: false,
          hasPrevPage: false,
          totalCount: filteredEmails.length
        });
        setLoading(false);
      }, 300); // 300ms simulated delay
      
    } else {
      // PRODUCTION: Fetch from backend
      const fetchEmailsFromBackend = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let data;
        
        // Check if selected category is a custom filter (not in predefined categories)
        const predefinedCategories = ['all', 'work', 'personal', 'finance', 'urgent', 'social'];
        const isCustomFilter = !predefinedCategories.includes(selectedCategory);
        
        if (isCustomFilter) {
          // Use custom filter API
          console.log('🎯 Applying custom filter:', selectedCategory);
          data = await emailApi.applyCustomFilter(selectedCategory, emailPage, EMAILS_PER_PAGE);
        } else {
          // Use regular category filter
          const backendCategory = selectedCategory !== 'all' 
            ? CATEGORY_MAPPING[selectedCategory]
            : undefined;

          data = await emailApi.fetchEmails({
            page: emailPage,
            per_page: EMAILS_PER_PAGE,
            category: backendCategory,
            search: searchQuery || undefined,
          });
        }

        console.log('Backend response:', data); // Debug log

        // Handle different response structures
        // Custom filter endpoints return: { results: [], count: N, filter_id: "..." }
        // Regular email endpoints return: { emails: [], pagination: {...}, categoryCounts: {...} }
        const isFilterResponse = isCustomFilter && data?.results;
        
        // Ensure we have arrays and objects, not null/undefined
        const safeEmails = isFilterResponse 
          ? (Array.isArray(data.results) ? data.results : [])
          : (Array.isArray(data?.emails) ? data.emails : []);
          
        const safePagination = isFilterResponse
          ? {
              currentPage: emailPage,
              totalPages: Math.ceil((data.count || 0) / EMAILS_PER_PAGE),
              hasNextPage: (data.count || 0) > (emailPage * EMAILS_PER_PAGE),
              hasPrevPage: emailPage > 1,
              totalCount: data.count || 0
            }
          : (data?.pagination && typeof data.pagination === 'object' ? data.pagination : {
              currentPage: 1,
              totalPages: 1,
              hasNextPage: false,
              hasPrevPage: false,
              totalCount: 0
            });
            
        const safeCategoryCounts = data?.categoryCounts && typeof data.categoryCounts === 'object' ? data.categoryCounts : {};

        setEmails(safeEmails);
        setBackendPagination(safePagination);
        setBackendCategoryCounts(safeCategoryCounts);
      } catch (err) {
        console.error('Failed to fetch emails:', err);
        setError(err.message || 'Failed to load emails');
        setEmails([]);
      } finally {
        setLoading(false);
      }
      };

      fetchEmailsFromBackend();
    }
  }, [selectedCategory, searchQuery, emailPage, USE_MOCK_DATA]);

  // Reset to page 1 when filters change
  useEffect(() => {
    if (emailPage !== 1) {
      setEmailPage(1);
    }
  }, [selectedCategory, searchQuery]);

  // Load custom filters on mount
  useEffect(() => {
    if (USE_MOCK_DATA) {
      // LOCAL DEVELOPMENT: Use empty filters or predefined mock filters
      setCustomFilters([
        // Example: { id: 'filter-1', name: 'Tech Updates', criteria: 'tech, coding, engineering' }
      ]);
    } else {
      // PRODUCTION: Fetch from backend
      const loadCustomFilters = async () => {
        try {
          const filters = await emailApi.fetchCustomFilters();
          setCustomFilters(filters.filters || filters || []);
        } catch (err) {
          console.error('Failed to load custom filters:', err);
        }
      };

      loadCustomFilters();
    }
  }, [USE_MOCK_DATA]);

  // Computed values from backend data
  const filteredEmails = useMemo(() => {
    return emails.filter(e => !archivedEmails.has(e.id));
  }, [emails, archivedEmails]);

  const categoryCounts = useMemo(() => {
    // Use backend counts, but map to frontend categories
    return {
      all: backendCategoryCounts.all || 0,
      work: backendCategoryCounts.meetings || 0,
      personal: backendCategoryCounts.personal || 0,
      finance: backendCategoryCounts.bills || 0,
      urgent: backendCategoryCounts.urgent || 0,
      social: backendCategoryCounts.social || 0,
    };
  }, [backendCategoryCounts]);

  const unreadCount = useMemo(() => {
    return filteredEmails.filter(e => !e.isRead).length;
  }, [filteredEmails]);

  const totalEmailPages = backendPagination.totalPages || 1;
  const paginatedEmails = filteredEmails;

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffMins = Math.floor((now - date) / (1000 * 60));
    if (diffMins < 60) return `${diffMins}m`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d`;
  };

  const getSenderName = (email) => {
    // Backend now returns from as object: { email, name }
    if (typeof email.from === 'object' && email.from !== null) {
      return email.from.name || email.from.email?.split('@')[0] || 'Unknown';
    }
    // Fallback for old string format
    const fromField = email.from || '';
    const name = fromField.split('@')[0].replace(/[._-]/g, ' ');
    return name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const getAvatarColor = (name) => {
    if (!name) return '#6366f1';
    const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ef4444', '#14b8a6'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getPriorityDots = (email) => {
    const dots = [];
    if (email.urgency === 'high') dots.push({ color: '#ef4444' });
    if (!email.isRead) dots.push({ color: '#3b82f6' });
    if (email.hasAttachment) dots.push({ color: '#f59e0b' });
    return dots;
  };

  const toggleStar = async (e, emailId) => {
    e.stopPropagation();
    
    const isCurrentlyStarred = starredEmails.has(emailId);
    const newStarredStatus = !isCurrentlyStarred;
    
    // Optimistic update
    setStarredEmails(prev => {
      const next = new Set(prev);
      if (newStarredStatus) {
        next.add(emailId);
      } else {
        next.delete(emailId);
      }
      return next;
    });
    
    // Update backend (only in production mode)
    if (!USE_MOCK_DATA) {
      try {
        await emailApi.updateEmailStarStatus(emailId, newStarredStatus);
      } catch (err) {
        console.error('Failed to update star status:', err);
        // Revert on error
        setStarredEmails(prev => {
          const next = new Set(prev);
          if (isCurrentlyStarred) {
            next.add(emailId);
          } else {
            next.delete(emailId);
          }
          return next;
        });
      }
    }
    
    // Update the email in local state
    setEmails(prev => prev.map(email => 
      email.id === emailId ? { ...email, isStarred: newStarredStatus } : email
    ));
  };

  // Drag and Drop handlers
  const handleDragStart = (e, email) => {
    setDraggedEmail(email);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', email.id);
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
    setDraggedEmail(null);
    setIsDraggingOverChat(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDraggingOverChat(true);
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDraggingOverChat(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOverChat(false);
    
    if (draggedEmail && !emailContext.find(e => e.id === draggedEmail.id)) {
      skipNextAutoScrollRef.current = true;
      setEmailContext(prev => [...prev, draggedEmail]);
      
      // Debug: Log email being added to context
      console.log('✅ Email added to context:', {
        id: draggedEmail.id,
        subject: draggedEmail.subject,
        from: draggedEmail.from,
        snippet: draggedEmail.snippet?.substring(0, 50) + '...'
      });
      
      // Add a message about the email being added to context
      setAiMessages(prev => [...prev, {
        role: 'assistant',
        variant: 'context',
        content: `Added "${draggedEmail.subject}" to context. You can now ask questions about this email.`
      }]);
    }
    
    setDraggedEmail(null);
  };

  const removeEmailFromContext = (emailId) => {
    const removedEmail = emailContext.find(email => email.id === emailId);
    setEmailContext(prev => prev.filter(e => e.id !== emailId));
    if (removedEmail) {
      skipNextAutoScrollRef.current = true;
      setAiMessages(prev => [...prev, {
        role: 'assistant',
        variant: 'context',
        content: `Removed "${removedEmail.subject}" from context.`
      }]);
    }
  };

  // Close email detail with animation
  const handleCloseEmailDetail = () => {
    setIsEmailDetailClosing(true);
    setTimeout(() => {
      setSelectedEmail(null);
      setIsEmailDetailClosing(false);
    }, 300);
  };

  // Reply/Forward/Calendar handlers
  const handleOpenReply = () => {
    setReplyContent('');
    setReplyModalOpen(true);
  };

  const handleOpenForward = () => {
    setForwardTo('');
    setForwardNote('');
    setForwardModalOpen(true);
  };

  const handleOpenCalendarEvent = () => {
    setEventTitle(selectedEmail?.subject || '');
    setEventDateTime(new Date()); // Set to current date/time
    setEventNotes('');
    setCalendarPanelOpen(true);
  };

  const handleSendReply = () => {
    console.log('Sending reply:', replyContent);
    // TODO: Backend integration
    setReplyModalOpen(false);
    setReplyContent('');
  };

  const handleSendForward = () => {
    console.log('Forwarding to:', forwardTo, 'with note:', forwardNote);
    // TODO: Backend integration
    setForwardModalOpen(false);
    setForwardTo('');
    setForwardNote('');
  };

  const handleCreateCalendarEvent = () => {
    console.log('Creating event:', { 
      eventTitle, 
      eventDateTime: eventDateTime.toISOString(), 
      eventNotes 
    });
    // TODO: Backend integration
    setCalendarPanelOpen(false);
  };

  // Custom Filter handlers
  const handleAddFilter = async () => {
    if (newFilterName.trim() && newFilterCriteria.trim()) {
      if (USE_MOCK_DATA) {
        // LOCAL DEVELOPMENT: Create filter locally
        const newFilter = {
          id: `filter-${Date.now()}`,
          name: newFilterName.trim(),
          criteria: newFilterCriteria.trim()
        };
        
        setCustomFilters(prev => [...prev, newFilter]);
        setNewFilterName('');
        setNewFilterCriteria('');
        setShowFilterModal(false);
      } else {
        // PRODUCTION: Create via backend
        try {
          const result = await emailApi.createCustomFilter(
            newFilterName.trim(),
            newFilterCriteria.trim()
          );
          
          const newFilter = result.filter || {
            id: result.id || `filter-${Date.now()}`,
            name: newFilterName.trim(),
            criteria: newFilterCriteria.trim()
          };
          
          setCustomFilters(prev => [...prev, newFilter]);
          setNewFilterName('');
          setNewFilterCriteria('');
          setShowFilterModal(false);
        } catch (err) {
          console.error('Failed to create filter:', err);
          alert('Failed to create filter: ' + err.message);
        }
      }
    }
  };

  const handleDeleteFilter = async (filterId) => {
    if (USE_MOCK_DATA) {
      // LOCAL DEVELOPMENT: Delete filter locally
      setCustomFilters(prev => prev.filter(f => f.id !== filterId));
      if (selectedCategory === filterId) {
        setSelectedCategory('all');
      }
    } else {
      // PRODUCTION: Delete via backend
      try {
        await emailApi.deleteCustomFilter(filterId);
        setCustomFilters(prev => prev.filter(f => f.id !== filterId));
        if (selectedCategory === filterId) {
          setSelectedCategory('all');
        }
      } catch (err) {
        console.error('Failed to delete filter:', err);
        alert('Failed to delete filter: ' + err.message);
      }
    }
  };

  // Simulate AI response based on context
  const simulateAIResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    
    if (emailContext.length > 0) {
      const contextSubjects = emailContext.map(e => e.subject).join(', ');
      
      if (lowerQuery.includes('summarize') || lowerQuery.includes('summary')) {
        return `Based on the ${emailContext.length} email(s) in context:\n\n${emailContext.map((e, i) => `${i + 1}. "${e.subject}" - ${e.snippet}`).join('\n\n')}`;
      }
      
      if (lowerQuery.includes('urgent') || lowerQuery.includes('important')) {
        const urgent = emailContext.filter(e => e.urgency === 'high');
        return urgent.length > 0 
          ? `Found ${urgent.length} urgent email(s) in context: ${urgent.map(e => e.subject).join(', ')}`
          : `None of the ${emailContext.length} email(s) in context are marked as urgent.`;
      }
      
      if (lowerQuery.includes('from') || lowerQuery.includes('sender')) {
        const senders = [...new Set(emailContext.map(e => getSenderName(e)))];
        return `The emails in context are from: ${senders.join(', ')}`;
      }
      
      return `I can see ${emailContext.length} email(s) in context: ${contextSubjects}. What would you like to know about them?`;
    }
    
    // Default responses without context
    if (lowerQuery.includes('urgent')) {
      const urgent = filteredEmails.filter(e => e.urgency === 'high');
      return `You have ${urgent.length} urgent email(s). ${urgent.slice(0, 3).map(e => e.subject).join(', ')}`;
    }
    
    if (lowerQuery.includes('unread')) {
      return `You have ${unreadCount} unread email(s) in your inbox.`;
    }
    
    if (lowerQuery.includes('work')) {
      const work = filteredEmails.filter(e => ['meetings', 'interviews'].includes(e.category));
      return `You have ${work.length} work-related email(s).`;
    }
    
    return "I'm here to help! Try asking about your emails, or drag emails into this chat to add them to context.";
  };

  const handleAiSubmit = async (e) => {
    e.preventDefault();
    if (!aiInput.trim() || aiLoading) return;

    const userMessage = aiInput.trim();
    setAiMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setAiInput('');
    setAiLoading(true);

    // Debug: Log email context being sent
    if (emailContext.length > 0) {
      console.log('📧 Sending email context to AI:', emailContext.map(e => ({
        id: e.id,
        subject: e.subject,
        from: e.from
      })));
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_AGENT_API_URL || 'https://api.airthreads.ai:5001'}/agent-rag-demo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ query: userMessage, context: emailContext }),
      });

      if (!response.ok) {
        throw new Error('API not available');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let assistantContent = '';
      setAiMessages(prev => [...prev, { role: 'assistant', content: '', isStreaming: true }]);

      let buffer = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('event: metadata') || line.startsWith('event: complete')) {
            continue;
          } else if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));

              if (data.token) {
                assistantContent += data.token;
                setAiMessages(prev => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { 
                    role: 'assistant', 
                    content: assistantContent,
                    isStreaming: true 
                  };
                  return updated;
                });
              } else if (data.status === 'complete') {
                const emails = data.relevant_emails || data.meeting_emails;
                if (emails?.length > 0) {
                  setAiMessages(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { 
                      ...updated[updated.length - 1],
                      relevantEmails: emails
                    };
                    return updated;
                  });
                }
              }
            } catch (parseError) {
              // Skip unparseable lines
            }
          }
        }
      }

      // Handle any remaining buffer content
      if (buffer.trim()) {
        const line = buffer.trim();
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.token) {
              assistantContent += data.token;
            }
          } catch (e) {}
        }
      }

      // Mark streaming as complete
      setAiMessages(prev => {
        const updated = [...prev];
        const lastMsg = updated[updated.length - 1];
        updated[updated.length - 1] = { 
          ...lastMsg,
          content: assistantContent || lastMsg.content,
          isStreaming: false 
        };
        return updated;
      });

    } catch (error) {
      // Fallback to simulation if API fails
      const simulatedResponse = simulateAIResponse(userMessage);
      setAiMessages(prev => {
        // Remove any streaming message that might have been added
        const filtered = prev.filter(m => !m.isStreaming);
        return [...filtered, { 
          role: 'assistant', 
          content: simulatedResponse,
          isStreaming: false
        }];
      });
    } finally {
      setAiLoading(false);
    }
  };



  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    if (skipNextAutoScrollRef.current) {
      skipNextAutoScrollRef.current = false;
      return;
    }
    // Scroll within the chat messages container only (not the whole page)
    if (chatEndRef.current && aiChatAreaRef.current) {
      const messagesContainer = aiChatAreaRef.current.querySelector(`.${styles.aiMessages}`);
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }
  }, [aiMessages]);

  // Close integrations menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (integrationsMenuRef.current && !integrationsMenuRef.current.contains(event.target)) {
        setIntegrationsMenuOpen(false);
      }
    };

    if (integrationsMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [integrationsMenuOpen]);

  return (
    <div className={`${styles.container} ${isDark ? styles.dark : ''}`} data-theme={theme}>
      {/* Left Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoName}>AirMail</span>
            <span className={styles.logoTag}>AI organized</span>
          </div>
        </div>

        <nav className={styles.nav}>
          {SIDEBAR_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`${styles.navItem} ${selectedCategory === cat.id ? styles.active : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span className={styles.navLabel}>{cat.label}</span>
              {categoryCounts[cat.id] > 0 && (
                <span className={styles.navCount}>{categoryCounts[cat.id]}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Custom Filters Section */}
        <div className={styles.customFiltersSection}>
          <div className={styles.customFiltersHeader}>
            <span className={styles.customFiltersTitle}>Custom Filters</span>
            <button 
              className={styles.addFilterBtn} 
              onClick={() => setShowFilterModal(true)}
              title="Add custom filter"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
          </div>
          
          <div className={styles.customFiltersList}>
            {customFilters.length === 0 ? (
              <p className={styles.emptyFiltersText}>No custom filters yet. Click + to create one!</p>
            ) : (
              customFilters.map(filter => (
                <div key={filter.id} className={styles.customFilterItem}>
                  <button
                    className={`${styles.filterBtn} ${selectedCategory === filter.id ? styles.active : ''}`}
                    onClick={() => setSelectedCategory(filter.id)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M12 1v6m0 6v6M6 6l4.25 4.25m5.5 5.5L20 20m-4.25-9.75L20 6M6 20l4.25-4.25"/>
                    </svg>
                    <span>{filter.name}</span>
                  </button>
                  <button
                    className={styles.deleteFilterBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteFilter(filter.id);
                    }}
                    title="Delete filter"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={styles.main}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.unreadBadge}>{unreadCount} unread</span>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.avatar}>A</div>
          </div>
        </header>

        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.toolbarActions}>
            <button className={styles.toolbarBtn} title="Filter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
              </svg>
            </button>
            <button className={styles.toolbarBtn} title="Refresh">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10"/>
                <polyline points="1 20 1 14 7 14"/>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className={styles.content}>
          {/* Email List */}
          <div className={styles.emailList} ref={emailListRef}>
            <div className={styles.emailListContent}>
              {/* Loading State */}
              {loading && (
                <div className={styles.loadingState}>
                  <div className={styles.loadingSpinner}></div>
                  <p>Loading emails...</p>
                </div>
              )}

              {/* Error State */}
              {error && !loading && (
                <div className={styles.errorState}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <p>{error}</p>
                  <button onClick={() => window.location.reload()}>Retry</button>
                </div>
              )}

              {/* Empty State */}
              {!loading && !error && paginatedEmails.length === 0 && (
                <div className={styles.emptyState}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <p>No emails found</p>
                  <span>Try adjusting your filters or search query</span>
                </div>
              )}

              {/* Email List */}
              {!loading && !error && paginatedEmails.filter(email => email && email.id).map(email => {
                const senderName = getSenderName(email);
                return (
                  <button
                    key={email.id}
                    className={`${styles.emailRow} ${selectedEmail?.id === email.id ? styles.selected : ''} ${!email.isRead ? styles.unread : ''}`}
                    onClick={() => setSelectedEmail(email)}
                    draggable
                    onDragStart={(e) => handleDragStart(e, email)}
                    onDragEnd={handleDragEnd}
                  >
                    <div 
                      className={styles.emailAvatar}
                      style={{ background: getAvatarColor(senderName) }}
                    >
                      {getInitials(senderName)}
                    </div>
                    <div className={styles.emailContent}>
                      <div className={styles.emailHeader}>
                        <span className={styles.emailSender}>
                          {senderName}
                          {getPriorityDots(email).map((dot, i) => (
                            <span key={i} className={styles.priorityDot} style={{ background: dot.color }} />
                          ))}
                        </span>
                        <span className={styles.emailTime}>{formatTime(email.receivedAt)}</span>
                      </div>
                      <div className={styles.emailSubject}>
                        {email.subject}
                        {email.replyCount > 0 && (
                          <span className={styles.threadIndicator}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                            </svg>
                            {email.replyCount}
                          </span>
                        )}
                      </div>
                      <div className={styles.emailPreview}>{email.snippet}</div>
                    </div>
                    <div className={styles.emailActions}>
                      <span 
                        className={`${styles.starBtn} ${starredEmails.has(email.id) ? styles.starred : ''}`}
                        onClick={(e) => toggleStar(e, email.id)}
                        role="button"
                        tabIndex={0}
                      >
                        {starredEmails.has(email.id) ? '★' : '☆'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
            
            {/* Email Pagination */}
            {totalEmailPages > 1 && (
              <div className={styles.emailListFooter}>
                <div className={styles.pagination}>
                  <button 
                    className={styles.paginationBtn}
                    onClick={() => {
                      setEmailPage(prev => Math.max(1, prev - 1));
                      emailListRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    disabled={emailPage === 1}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6"/>
                    </svg>
                  </button>
                  <span className={styles.paginationInfo}>
                    Page {emailPage} of {totalEmailPages}
                  </span>
                  <button 
                    className={styles.paginationBtn}
                    onClick={() => {
                      setEmailPage(prev => Math.min(totalEmailPages, prev + 1));
                      emailListRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    disabled={emailPage === totalEmailPages}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Email Detail Panel */}
          {selectedEmail && (
            <div className={`${styles.emailDetail} ${isEmailDetailClosing ? styles.emailDetailClosing : ''}`}>
              <div className={styles.detailHeader}>
                <div className={styles.detailHeaderLeft}>
                  <div 
                    className={styles.detailAvatar}
                    style={{ background: getAvatarColor(getSenderName(selectedEmail)) }}
                  >
                    {getInitials(getSenderName(selectedEmail))}
                  </div>
                  <div className={styles.detailSenderInfo}>
                    <div className={styles.detailSenderRow}>
                      <span className={styles.detailSender}>{getSenderName(selectedEmail)}</span>
                      {selectedEmail.urgency === 'high' && <span className={styles.detailBadgeUrgent}>Urgent</span>}
                    </div>
                    <span className={styles.detailTime}>{formatTime(selectedEmail.receivedAt)} ago</span>
                  </div>
                </div>
                <div className={styles.detailHeaderRight}>
                  <button className={styles.iconBtn} onClick={(e) => toggleStar(e, selectedEmail.id)} title="Star">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={starredEmails.has(selectedEmail.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  </button>
                  <button className={styles.iconBtn} onClick={handleCloseEmailDetail} title="Close">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div className={styles.detailBody}>
                <div className={styles.detailSubjectRow}>
                  <h2 className={styles.detailSubject}>{selectedEmail.subject}</h2>
                  {selectedEmail.replyCount > 0 && (
                    <span className={styles.threadCount}>{selectedEmail.replyCount + 1} messages</span>
                  )}
                </div>

                <div className={styles.aiSummary}>
                  <div className={styles.aiSummaryIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
                    </svg>
                    <span>AI Summary</span>
                  </div>
                  <p className={styles.aiSummaryText}>
                    {selectedEmail.replyCount > 0 
                      ? `Thread with ${selectedEmail.replyCount} ${selectedEmail.replyCount === 1 ? 'reply' : 'replies'}. ${selectedEmail.urgency === 'high' ? 'Requires immediate attention.' : 'Active conversation.'}`
                      : 'This email requires immediate attention. Consider responding soon.'
                    }
                  </p>
                </div>

                {/* Thread View - Original Message */}
                <div className={styles.threadContainer}>
                  <div className={styles.threadMessage}>
                    <div className={styles.threadMessageHeader}>
                      <div 
                        className={styles.threadAvatar}
                        style={{ background: getAvatarColor(getSenderName(selectedEmail)) }}
                      >
                        {getInitials(getSenderName(selectedEmail))}
                      </div>
                      <div className={styles.threadMessageInfo}>
                        <div className={styles.threadSender}>{getSenderName(selectedEmail)}</div>
                        <div className={styles.threadTime}>{new Date(selectedEmail.receivedAt).toLocaleString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          hour: 'numeric', 
                          minute: '2-digit',
                          hour12: true 
                        })}</div>
                      </div>
                    </div>
                    <div className={styles.threadMessageContent}>
                      {(selectedEmail.body || selectedEmail.snippet || 'No content available')
                        .split('\n')
                        .map((line, i) => (
                          <p key={i}>{line || <br />}</p>
                        ))}
                    </div>
                  </div>

                  {/* Thread Replies */}
                  {selectedEmail.replies?.map((reply, idx) => {
                    // Handle reply.from which might be string or object
                    const replyEmail = { from: reply.from };
                    const replySenderName = getSenderName(replyEmail);
                    
                    return (
                    <div key={reply.id} className={styles.threadMessage}>
                      <div className={styles.threadMessageHeader}>
                        <div 
                          className={styles.threadAvatar}
                          style={{ background: getAvatarColor(replySenderName) }}
                        >
                          {getInitials(replySenderName)}
                        </div>
                        <div className={styles.threadMessageInfo}>
                          <div className={styles.threadSender}>{replySenderName}</div>
                          <div className={styles.threadTime}>{new Date(reply.receivedAt).toLocaleString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            hour: 'numeric', 
                            minute: '2-digit',
                            hour12: true 
                          })}</div>
                        </div>
                      </div>
                      <div className={styles.threadMessageContent}>
                        <p>{reply.body || reply.snippet || ''}</p>
                      </div>
                    </div>
                    );
                  })}
                </div>
              </div>

              <div className={styles.detailFooter}>
                <button className={styles.replyBtn} onClick={handleOpenReply}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 17 4 12 9 7"/>
                    <path d="M20 18v-2a4 4 0 0 0-4-4H4"/>
                  </svg>
                  Reply
                </button>
                <button className={styles.forwardBtn} onClick={handleOpenForward}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 17 20 12 15 7"/>
                    <path d="M4 18v-2a4 4 0 0 1 4-4h12"/>
                  </svg>
                  Forward
                </button>
                
                {/* Integrations Dropdown */}
                <div className={styles.integrationsDropdownContainer} ref={integrationsMenuRef}>
                  <button 
                    className={styles.integrationsBtn} 
                    onClick={() => setIntegrationsMenuOpen(!integrationsMenuOpen)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7"/>
                      <rect x="14" y="3" width="7" height="7"/>
                      <rect x="14" y="14" width="7" height="7"/>
                      <rect x="3" y="14" width="7" height="7"/>
                    </svg>
                    Add to...
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.chevronIcon}>
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>
                  
                  {integrationsMenuOpen && (
                    <div className={styles.integrationsMenu}>
                      <button 
                        className={styles.integrationItem}
                        onClick={() => {
                          setIntegrationsMenuOpen(false);
                          handleOpenCalendarEvent();
                        }}
                      >
                        <div className={styles.integrationIcon} style={{ background: 'linear-gradient(135deg, #4285f4, #34a853)' }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                          </svg>
                        </div>
                        <div className={styles.integrationInfo}>
                          <div className={styles.integrationName}>Google Calendar</div>
                          <div className={styles.integrationDesc}>Create calendar event</div>
                        </div>
                      </button>
                      
                      <button 
                        className={`${styles.integrationItem} ${styles.disabled}`}
                        disabled
                      >
                        <div className={styles.integrationIcon} style={{ background: 'linear-gradient(135deg, #000, #2d2d2d)' }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                            <path d="M4 4h16v16H4z"/>
                          </svg>
                        </div>
                        <div className={styles.integrationInfo}>
                          <div className={styles.integrationName}>
                            Notion
                            <span className={styles.comingSoonBadge}>Coming Soon</span>
                          </div>
                          <div className={styles.integrationDesc}>Add to workspace</div>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* AI Panel - Sidebar Mode */}
      <aside 
        className={`${styles.aiPanel} ${styles.aiPanelSidebar} ${aiPanelCollapsed ? styles.collapsed : ''}`}
        ref={aiPanelRef}
      >
          <div className={styles.aiHeader}>
            <div className={styles.aiHeaderLeft}>
              <div className={styles.aiHeaderIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
                </svg>
              </div>
              {!aiPanelCollapsed && (
                <div className={styles.aiHeaderText}>
                  <div className={styles.aiTitle}>AI Assistant</div>
                  <div className={styles.aiSubtitle}>Command your inbox</div>
                </div>
              )}
            </div>
            <div className={styles.aiHeaderActions}>
              <button 
                className={styles.aiCollapseBtn} 
                onClick={() => setAiPanelCollapsed(!aiPanelCollapsed)}
                title={aiPanelCollapsed ? "Expand" : "Collapse"}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  {aiPanelCollapsed ? (
                    <polyline points="9 18 15 12 9 6"/>
                  ) : (
                    <polyline points="15 18 9 12 15 6"/>
                  )}
                </svg>
              </button>
            </div>
          </div>

          {!aiPanelCollapsed && (
            <>
              {/* Email Context Display */}
              {emailContext.length > 0 && (
                <div className={styles.emailContextBar}>
                  <div className={styles.emailContextLabel}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    <span>{emailContext.length} email(s) in context</span>
                  </div>
                  <div className={styles.emailContextItems}>
                    {emailContext.map(email => (
                      <div key={email.id} className={styles.emailContextItem}>
                        <span className={styles.emailContextSubject}>{email.subject}</span>
                        <button 
                          className={styles.emailContextRemove}
                          onClick={() => removeEmailFromContext(email.id)}
                          title="Remove from context"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div 
                className={`${styles.aiContent} ${isDraggingOverChat ? styles.dragOver : ''}`}
                ref={aiChatAreaRef}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className={styles.aiMessages}>
                  {aiMessages.map((msg, i) => (
                    <div key={i}>
                      <div className={`${styles.aiMessage} ${styles[msg.role]} ${msg.variant ? styles[msg.variant] : ''}`}>
                        {msg.role === 'assistant' && msg.variant !== 'context' && (
                          <div className={styles.aiMessageAvatar}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
                            </svg>
                          </div>
                        )}
                        <div className={styles.aiMessageContent}>
                          {msg.variant === 'context' && (
                            <div className={styles.contextHeader}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 3h18v6H3z"></path>
                                <path d="M3 9h18v12H3z"></path>
                              </svg>
                              <span>Context update</span>
                            </div>
                          )}
                          <div className={styles.aiMessageText}>
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                            {msg.isStreaming && <span className={styles.streamingCursor}>|</span>}
                          </div>
                        </div>
                      </div>
                      
                      {/* Render relevant emails if present */}
                      {msg.relevantEmails && msg.relevantEmails.length > 0 && (
                        <div className={styles.relevantEmailsContainer}>
                          <div className={styles.emailsHeader}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                              <polyline points="22,6 12,13 2,6"/>
                            </svg>
                            <span>{msg.relevantEmails.length} email{msg.relevantEmails.length !== 1 ? 's' : ''} found</span>
                            {msg.relevantEmails.filter(e => e.eventRelated).length > 0 && (
                              <span className={styles.meetingBadge}>
                                {msg.relevantEmails.filter(e => e.eventRelated).length} meeting{msg.relevantEmails.filter(e => e.eventRelated).length !== 1 ? 's' : ''}
                              </span>
                            )}
                          </div>
                          <div className={styles.emailCardsGrid}>
                            {msg.relevantEmails.map((email, emailIdx) => {
                              const isMeeting = email.eventRelated === true;
                              return (
                                <div 
                                  key={email.id || emailIdx} 
                                  className={styles.relevantEmailCard}
                                  onClick={() => setSelectedEmail(email)}
                                >
                                  {isMeeting && (
                                    <div className={styles.emailCardHeader}>
                                      <span className={styles.eventBadge}>
                                        {email.eventType?.replace(/_/g, ' ') || 'meeting'}
                                      </span>
                                      <span className={styles.confidenceBadge}>
                                        {Math.round((email.confidence || 0.8) * 100)}%
                                      </span>
                                    </div>
                                  )}
                                  <h4 className={styles.emailCardSubject}>{email.subject}</h4>
                                  <p className={styles.emailCardFrom}>
                                    From: {email.from?.name || email.from?.email || 'Unknown'}
                                  </p>
                                  <p className={styles.emailCardDate}>
                                    {email.date ? new Date(email.date).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric',
                                      hour: 'numeric',
                                      minute: '2-digit'
                                    }) : ''}
                                  </p>
                                  {email.snippet && (
                                    <p className={styles.emailCardSnippet}>{email.snippet}</p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {aiLoading && (
                    <div className={`${styles.aiMessage} ${styles.assistant}`}>
                      <div className={styles.aiMessageAvatar}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <circle cx="12" cy="12" r="10"/>
                        </svg>
                      </div>
                      <div className={styles.aiMessageContent}>
                        <span className={styles.typingIndicator}>
                          <span></span><span></span><span></span>
                        </span>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
              </div>

              <div className={styles.aiFooter}>
                <form className={styles.aiInputForm} onSubmit={handleAiSubmit}>
                  <input
                    type="text"
                    placeholder="Ask AI to help..."
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    className={styles.aiInput}
                  />
                  <button type="submit" className={styles.aiSendBtn} disabled={aiLoading}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </button>
                </form>
                <div className={styles.aiHint}>
                  {emailContext.length > 0 
                    ? `Ask about ${emailContext.length} email(s) in context`
                    : 'Drag emails here to add to context'
                  }
                </div>
              </div>
            </>
          )}
        </aside>

      {/* Reply Modal */}
      {replyModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setReplyModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Reply to: {selectedEmail?.subject}</h3>
              <button className={styles.modalCloseBtn} onClick={() => setReplyModalOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Your Reply:</label>
                <textarea
                  className={styles.textarea}
                  rows={8}
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Type your reply here..."
                />
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.secondaryBtn} onClick={() => setReplyModalOpen(false)}>
                Cancel
              </button>
              <button 
                className={styles.primaryBtn} 
                onClick={handleSendReply}
                disabled={!replyContent.trim()}
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Forward Modal */}
      {forwardModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setForwardModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Forward: {selectedEmail?.subject}</h3>
              <button className={styles.modalCloseBtn} onClick={() => setForwardModalOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Forward to:</label>
                <input
                  type="email"
                  className={styles.input}
                  value={forwardTo}
                  onChange={(e) => setForwardTo(e.target.value)}
                  placeholder="recipient@email.com"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Add a note (optional):</label>
                <textarea
                  className={styles.textarea}
                  rows={5}
                  value={forwardNote}
                  onChange={(e) => setForwardNote(e.target.value)}
                  placeholder="Add a personal note..."
                />
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.secondaryBtn} onClick={() => setForwardModalOpen(false)}>
                Cancel
              </button>
              <button 
                className={styles.primaryBtn} 
                onClick={handleSendForward}
                disabled={!forwardTo.trim()}
              >
                Forward
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gmail-Style Calendar Side Panel */}
      {calendarPanelOpen && (
        <div className={styles.calendarPanel}>
          {/* Header */}
          <div className={styles.calendarPanelHeader}>
            <div className={styles.calendarHeaderLeft}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>Calendar</span>
            </div>
            <button 
              className={styles.calendarPanelCloseBtn} 
              onClick={() => setCalendarPanelOpen(false)}
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          
          <div className={styles.calendarPanelContent}>
            {/* Mini Calendar */}
            <div className={styles.miniCalendarSection}>
              <div className={styles.miniCalendarWrapper}>
                <DatePicker
                  selected={selectedCalendarDate}
                  onChange={(date) => setSelectedCalendarDate(date)}
                  inline
                  calendarClassName={styles.miniCalendar}
                />
              </div>
            </div>

            {/* Today's Schedule */}
            <div className={styles.scheduleSection}>
              <div className={styles.scheduleHeader}>
                <h3>{selectedCalendarDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h3>
              </div>
              <div className={styles.scheduleList}>
                {mockSchedule.map((event, idx) => (
                  <div key={idx} className={styles.scheduleItem}>
                    <div className={styles.scheduleTime}>{event.time}</div>
                    <div className={styles.scheduleEvent}>
                      <div className={styles.scheduleEventBar} style={{ backgroundColor: event.color }} />
                      <div className={styles.scheduleEventTitle}>{event.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className={styles.calendarDivider}>
              <span>Create New Event</span>
            </div>

            {/* Create Event Form */}
            {/* Event Title */}
            <div className={styles.calendarInputWrapper}>
              <input
                type="text"
                className={styles.calendarTitleInput}
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="Add event title"
              />
            </div>

            {/* Date & Time Section */}
            <div className={styles.calendarSection}>
              <div className={styles.calendarSectionIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div className={styles.calendarSectionContent}>
                <div className={styles.calendarDateTimeRow}>
                  <input
                    type="date"
                    className={styles.calendarDateInput}
                    value={eventDateTime.toISOString().split('T')[0]}
                    onChange={(e) => {
                      const newDate = new Date(e.target.value);
                      newDate.setHours(eventDateTime.getHours(), eventDateTime.getMinutes());
                      setEventDateTime(newDate);
                    }}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  <input
                    type="time"
                    className={styles.calendarTimeInput}
                    value={eventDateTime.toTimeString().slice(0, 5)}
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value.split(':');
                      const newDate = new Date(eventDateTime);
                      newDate.setHours(parseInt(hours), parseInt(minutes));
                      setEventDateTime(newDate);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div className={styles.calendarSection}>
              <div className={styles.calendarSectionIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <line x1="10" y1="9" x2="8" y2="9"/>
                </svg>
              </div>
              <div className={styles.calendarSectionContent}>
                <textarea
                  className={styles.calendarNotesTextarea}
                  rows={3}
                  value={eventNotes}
                  onChange={(e) => setEventNotes(e.target.value)}
                  placeholder="Add description or location"
                />
              </div>
            </div>

            {/* Email Context Info */}
            {selectedEmail && (
              <div className={styles.calendarEmailInfo}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>From email: {selectedEmail.subject}</span>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className={styles.calendarPanelFooter}>
            <button 
              className={styles.calendarSaveBtn} 
              onClick={handleCreateCalendarEvent}
              disabled={!eventTitle.trim() || !eventDateTime}
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Custom Filter Modal */}
      {showFilterModal && (
        <div className={styles.modalOverlay} onClick={() => setShowFilterModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Create Custom Filter</h3>
              <button className={styles.modalCloseBtn} onClick={() => setShowFilterModal(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Filter Name:</label>
                <input
                  type="text"
                  className={styles.input}
                  value={newFilterName}
                  onChange={(e) => setNewFilterName(e.target.value)}
                  placeholder="e.g., Tech Updates"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Search Criteria:</label>
                <textarea
                  className={styles.textarea}
                  rows={4}
                  value={newFilterCriteria}
                  onChange={(e) => setNewFilterCriteria(e.target.value)}
                  placeholder="e.g., find me all emails related to tech, interviews, coding, engineering, etc"
                />
                <p className={styles.helperText}>
                  Describe what emails you want to find. Our AI will analyze and filter emails based on your criteria.
                </p>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.secondaryBtn} onClick={() => setShowFilterModal(false)}>
                Cancel
              </button>
              <button 
                className={styles.primaryBtn} 
                onClick={handleAddFilter}
                disabled={!newFilterName.trim() || !newFilterCriteria.trim()}
              >
                Create Filter
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
