function GmailIcon({ size = 24, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <path d="M1.5 5.25V18.75C1.5 19.5784 2.17157 20.25 3 20.25H6V11.25L12 15.75L18 11.25V20.25H21C21.8284 20.25 22.5 19.5784 22.5 18.75V5.25L12 12.75L1.5 5.25Z" fill="#EA4335"/>
      <path d="M1.5 5.25L12 12.75L22.5 5.25V5.25C22.5 4.42157 21.8284 3.75 21 3.75H3C2.17157 3.75 1.5 4.42157 1.5 5.25V5.25Z" fill="#EA4335"/>
      <path d="M1.5 5.25V18.75C1.5 19.5784 2.17157 20.25 3 20.25H6V11.25L1.5 5.25Z" fill="#4285F4"/>
      <path d="M18 20.25H21C21.8284 20.25 22.5 19.5784 22.5 18.75V5.25L18 11.25V20.25Z" fill="#34A853"/>
      <path d="M18 11.25L22.5 5.25C22.5 4.42157 21.8284 3.75 21 3.75H18V11.25Z" fill="#FBBC05"/>
      <path d="M1.5 5.25C1.5 4.42157 2.17157 3.75 3 3.75H6V11.25L1.5 5.25Z" fill="#C5221F"/>
    </svg>
  );
}

export default GmailIcon;
