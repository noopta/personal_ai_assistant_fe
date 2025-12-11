function GoogleCalendarIcon({ size = 24, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <path d="M18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4Z" fill="#4285F4"/>
      <path d="M20 18V6L18 4H6L4 6V18L6 20H18L20 18Z" fill="#4285F4"/>
      <path d="M18 20L20 18H18V20Z" fill="#1A73E8"/>
      <path d="M20 6V18H18V20L20 18V6Z" fill="#FBBC05"/>
      <path d="M4 18V6H6V4L4 6V18Z" fill="#1967D2"/>
      <path d="M6 20H18V18H6L4 18L6 20Z" fill="#34A853"/>
      <path d="M4 18L6 20V18H4Z" fill="#188038"/>
      <path d="M6 4H18L20 6H4L6 4Z" fill="#4285F4"/>
      <rect x="6" y="6" width="12" height="12" fill="white"/>
      <text x="12" y="15" textAnchor="middle" fill="#4285F4" fontSize="8" fontWeight="500" fontFamily="Google Sans, Roboto, Arial, sans-serif">31</text>
    </svg>
  );
}

export default GoogleCalendarIcon;
