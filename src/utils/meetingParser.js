// No longer using delimiter-based parsing
// Backend now returns { result, relevantEmails } as separate JSON fields

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

export function formatLocalTime(slot) {
  if (!slot) return '';
  
  const dateTimeString = typeof slot === 'string' ? slot : slot.dateTime;
  if (!dateTimeString) return '';
  
  try {
    const date = new Date(dateTimeString);
    return date.toLocaleString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } catch (error) {
    return dateTimeString;
  }
}

export function getMeetingTypeLabel(type) {
  const labels = {
    coffee_chat: 'Coffee Chat',
    sync: 'Sync Meeting',
    interview: 'Interview',
    standup: 'Standup',
    one_on_one: '1:1 Meeting',
    group_meeting: 'Group Meeting',
    team_meeting: 'Team Meeting',
    event: 'Event',
    workshop: 'Workshop',
    presentation: 'Presentation',
    review: 'Review Meeting',
    follow_up: 'Follow-up',
    reschedule: 'Reschedule',
    general_meeting: 'Meeting'
  };
  
  return labels[type] || type?.replace(/_/g, ' ') || 'Meeting';
}

export function getInitials(name) {
  if (!name) return '?';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export function parseFromField(from) {
  if (!from) return { name: 'Unknown', email: '' };
  
  if (typeof from === 'object' && from.name) {
    return { name: from.name, email: from.email || '' };
  }
  
  const fromString = String(from);
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
