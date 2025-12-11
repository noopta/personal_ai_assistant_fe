function GmailIcon({ size = 24, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335"/>
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" fill="url(#gmail-gradient)"/>
      <defs>
        <linearGradient id="gmail-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4285F4"/>
          <stop offset="25%" stopColor="#EA4335"/>
          <stop offset="50%" stopColor="#FBBC05"/>
          <stop offset="100%" stopColor="#34A853"/>
        </linearGradient>
      </defs>
      <path d="M0 5.457V19.366c0 .904.732 1.636 1.636 1.636h3.819V11.73l6.545 4.91V9.548L5.455 4.64 3.927 3.493C2.309 2.28 0 3.434 0 5.457z" fill="#4285F4"/>
      <path d="M5.455 21.002h13.09V11.73L12 16.64l-6.545-4.91z" fill="#34A853"/>
      <path d="M24 5.457c0-2.023-2.31-3.178-3.927-1.964L18.545 4.64v6.09l5.455-4.09v-.183z" fill="#FBBC05"/>
      <path d="M24 5.457v.927l-5.455 4.09v.256l5.455-4.09v-.183z" fill="#EA4335"/>
      <path d="M0 5.457v.927l5.455 4.09v.256L0 6.64v-.183z" fill="#C5221F"/>
    </svg>
  );
}

export default GmailIcon;
