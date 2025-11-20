import React from 'react';

export function Avatar({ children, className = '', style = {} }) {
  return (
    <div 
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        overflow: 'hidden',
        ...style
      }}
    >
      {children}
    </div>
  );
}

export function AvatarImage({ src, alt }) {
  return (
    <img 
      src={src} 
      alt={alt}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }}
    />
  );
}

export function AvatarFallback({ children, className = '' }) {
  return (
    <div 
      className={className}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        fontWeight: '500'
      }}
    >
      {children}
    </div>
  );
}
