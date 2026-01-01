import { useState, useEffect } from 'react';
import styles from './CreateEventModal.module.css';
import { getMeetingTypeLabel, formatLocalTime } from '../utils/meetingParser';

function CreateEventModal({ email, isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('30');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (email && isOpen) {
      const meeting = email.detectedMeeting || {};
      
      // Set title from suggested title or generate from meeting type
      setTitle(meeting.suggestedTitle || 
        `${getMeetingTypeLabel(meeting.type || 'meeting')} with ${email.from?.name || 'Contact'}`);
      
      // Set duration
      setDuration(String(meeting.duration || 30));
      
      // Set location/platform
      setLocation(meeting.location || meeting.platform || '');
      
      // Set date and time from first proposed slot
      if (meeting.proposedSlots?.length > 0) {
        const slot = meeting.proposedSlots[0];
        const slotDate = slot.dateTime ? new Date(slot.dateTime) : new Date();
        setDate(slotDate.toISOString().split('T')[0]);
        setTime(slotDate.toTimeString().slice(0, 5));
      } else {
        // Default to tomorrow at 10am
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setDate(tomorrow.toISOString().split('T')[0]);
        setTime('10:00');
      }
      
      // Add reasoning as notes if available
      setNotes(meeting.reasoning || '');
    }
  }, [email, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const eventData = {
      title,
      date,
      time,
      duration: parseInt(duration),
      location,
      notes,
      sourceEmail: {
        id: email.id,
        threadId: email.threadId,
        from: email.from,
        subject: email.subject
      }
    };
    
    onSubmit(eventData);
  };

  if (!isOpen) return null;

  const meeting = email?.detectedMeeting || {};
  const proposedSlots = meeting.proposedSlots || [];

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Create Calendar Event</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalBody}>
          {/* Meeting Type Badge */}
          {meeting.type && (
            <div className={styles.meetingTypeBadge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              {getMeetingTypeLabel(meeting.type)}
              {meeting.confidence && (
                <span className={styles.confidence}>
                  {Math.round(meeting.confidence * 100)}% confidence
                </span>
              )}
            </div>
          )}

          {/* Title Field */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Event Title</label>
            <input
              type="text"
              className={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
              required
            />
          </div>

          {/* Proposed Slots */}
          {proposedSlots.length > 0 && (
            <div className={styles.formGroup}>
              <label className={styles.label}>Suggested Times</label>
              <div className={styles.slotsList}>
                {proposedSlots.map((slot, idx) => (
                  <button
                    type="button"
                    key={idx}
                    className={`${styles.slotBtn} ${
                      date === new Date(slot.dateTime).toISOString().split('T')[0] &&
                      time === new Date(slot.dateTime).toTimeString().slice(0, 5)
                        ? styles.slotBtnActive
                        : ''
                    }`}
                    onClick={() => {
                      const slotDate = new Date(slot.dateTime);
                      setDate(slotDate.toISOString().split('T')[0]);
                      setTime(slotDate.toTimeString().slice(0, 5));
                    }}
                  >
                    {formatLocalTime(slot)}
                    {slot.confidence && (
                      <span className={styles.slotConfidence}>
                        {Math.round(slot.confidence * 100)}%
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Date and Time */}
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Date</label>
              <input
                type="date"
                className={styles.input}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Time</label>
              <input
                type="time"
                className={styles.input}
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Duration */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Duration</label>
            <select
              className={styles.input}
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
              <option value="120">2 hours</option>
            </select>
          </div>

          {/* Location */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Location / Platform</label>
            <input
              type="text"
              className={styles.input}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Zoom, Google Meet, Coffee Shop"
            />
          </div>

          {/* Notes */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Notes</label>
            <textarea
              className={styles.textarea}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes..."
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className={styles.modalActions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
                <line x1="12" y1="14" x2="12" y2="18"></line>
                <line x1="10" y1="16" x2="14" y2="16"></line>
              </svg>
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEventModal;
