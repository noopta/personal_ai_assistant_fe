function GoogleCalendarIcon({ size = 24, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <path d="M18.316 5.684H5.684v12.632h12.632V5.684z" fill="#fff"/>
      <path d="M21.474 24H2.526A2.526 2.526 0 0 1 0 21.474V2.526A2.526 2.526 0 0 1 2.526 0h18.948A2.526 2.526 0 0 1 24 2.526v18.948A2.526 2.526 0 0 1 21.474 24z" fill="#4285F4"/>
      <path d="M18.316 24l5.684-5.684h-5.684V24z" fill="#1967D2"/>
      <path d="M24 18.316V21.474A2.526 2.526 0 0 1 21.474 24h-3.158l5.684-5.684z" fill="#EA4335"/>
      <path d="M18.316 5.684v12.632H24V5.684h-5.684z" fill="#FBBC05"/>
      <path d="M5.684 18.316v5.684h12.632v-5.684H5.684z" fill="#34A853"/>
      <path d="M0 18.316v3.158A2.526 2.526 0 0 0 2.526 24h3.158v-5.684H0z" fill="#188038"/>
      <path d="M5.684 5.684H0v12.632h5.684V5.684z" fill="#1967D2"/>
      <path d="M5.684 0H2.526A2.526 2.526 0 0 0 0 2.526v3.158h5.684V0z" fill="#4285F4"/>
      <path d="M18.316 5.684V0H5.684v5.684h12.632z" fill="#4285F4"/>
      <path d="M18.316 0v5.684H24V2.526A2.526 2.526 0 0 0 21.474 0h-3.158z" fill="#1A73E8"/>
      <text x="12" y="15.5" textAnchor="middle" fill="#4285F4" fontSize="7" fontWeight="500" fontFamily="Google Sans, Roboto, Arial, sans-serif">31</text>
    </svg>
  );
}

export default GoogleCalendarIcon;
