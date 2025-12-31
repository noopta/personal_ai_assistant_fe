const MEETING_METADATA_DELIMITER = '---MEETING_METADATA---';

export function parseMeetingMetadata(response) {
  if (!response || typeof response !== 'string') {
    return { textContent: response || '', meetingData: null };
  }

  const delimiterIndex = response.indexOf(MEETING_METADATA_DELIMITER);
  
  if (delimiterIndex === -1) {
    return { textContent: response, meetingData: null };
  }

  const textContent = response.substring(0, delimiterIndex).trim();
  const jsonString = response.substring(delimiterIndex + MEETING_METADATA_DELIMITER.length).trim();

  try {
    const meetingData = JSON.parse(jsonString);
    return { textContent, meetingData };
  } catch (error) {
    console.error('Failed to parse meeting metadata JSON:', error);
    return { textContent, meetingData: null };
  }
}

export function formatLocalDateTime(isoString) {
  if (!isoString) return '';
  
  try {
    const date = new Date(isoString);
    return date.toLocaleString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } catch (error) {
    return isoString;
  }
}

export function formatLocalDate(isoString) {
  if (!isoString) return '';
  
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (error) {
    return isoString;
  }
}

export function formatLocalTime(isoString) {
  if (!isoString) return '';
  
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } catch (error) {
    return isoString;
  }
}

export function getMeetingTypeLabel(type) {
  const labels = {
    coffee_chat: 'Coffee Chat',
    sync: 'Sync Meeting',
    interview: 'Interview',
    standup: 'Standup',
    one_on_one: '1:1 Meeting',
    team_meeting: 'Team Meeting',
    event: 'Event',
    workshop: 'Workshop',
    presentation: 'Presentation',
    review: 'Review Meeting'
  };
  
  return labels[type] || type?.replace(/_/g, ' ') || 'Meeting';
}

export function getInitials(name) {
  if (!name) return '?';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export function parseFromString(fromString) {
  if (!fromString) return { name: 'Unknown', email: '' };
  
  const emailMatch = fromString.match(/<(.+)>/);
  if (emailMatch) {
    const email = emailMatch[1];
    const name = fromString.replace(/<.+>/, '').trim() || email.split('@')[0];
    return { name, email };
  }
  
  if (fromString.includes('@')) {
    return { name: fromString.split('@')[0], email: fromString };
  }
  
  return { name: fromString, email: '' };
}
