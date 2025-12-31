import { useState } from 'react';
import styles from './EmailCard.module.css';
import { getInitials, parseFromString, getMeetingTypeLabel, formatLocalTime } from '../utils/meetingParser';

function EmailCard({ email, onCreateEvent }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const fromInfo = parseFromString(email.from);
  const hasMeeting = email.eventRelated && email.detectedMeeting;

  const handleCreateEvent = (e) => {
    e.stopPropagation();
    if (onCreateEvent) {
      onCreateEvent(email);
    }
  };

  return (
    <div className={`${styles.emailCard} ${isExpanded ? styles.expanded : ''} ${hasMeeting ? styles.hasMeeting : ''}`}>
      <div className={styles.emailCardHeader} onClick={() => setIsExpanded(!isExpanded)}>
        <div className={styles.emailCardAvatar}>
          {getInitials(fromInfo.name)}
        </div>
        <div className={styles.emailCardInfo}>
          <div className={styles.emailCardTop}>
            <span className={styles.emailCardFrom}>{fromInfo.name}</span>
            {hasMeeting && (
              <span className={styles.meetingBadge}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Meeting detected
              </span>
            )}
          </div>
          <div className={styles.emailCardSubject}>{email.subject}</div>
        </div>
        <div className={styles.emailCardChevron}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isExpanded ? (
              <polyline points="18 15 12 9 6 15"></polyline>
            ) : (
              <polyline points="6 9 12 15 18 9"></polyline>
            )}
          </svg>
        </div>
      </div>

      {isExpanded && (
        <div className={styles.emailCardBody}>
          <div className={styles.emailFullContent}>
            {email.body?.split('\n').map((line, i) => (
              <p key={i}>{line || <br />}</p>
            ))}
          </div>

          {hasMeeting && (
            <div className={styles.smartAction}>
              <div className={styles.smartActionIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div className={styles.smartActionContent}>
                <div className={styles.smartActionTitle}>
                  {getMeetingTypeLabel(email.detectedMeeting.type)} Request
                  {email.detectedMeeting.confidence && (
                    <span className={styles.confidence}>
                      {Math.round(email.detectedMeeting.confidence * 100)}% confidence
                    </span>
                  )}
                </div>
                <div className={styles.smartActionDetails}>
                  <span>
                    {email.detectedMeeting.duration && `${email.detectedMeeting.duration} minutes`}
                    {email.detectedMeeting.platform && ` via ${email.detectedMeeting.platform}`}
                  </span>
                  {email.detectedMeeting.proposedSlots?.length > 0 && (
                    <span className={styles.slots}>
                      Suggested: {email.detectedMeeting.proposedSlots.slice(0, 2).map(slot => formatLocalTime(slot)).join(', ')}
                    </span>
                  )}
                </div>
              </div>
              <button className={styles.createEventBtn} onClick={handleCreateEvent}>
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
          )}
        </div>
      )}
    </div>
  );
}

export default EmailCard;
