import React from 'react';

interface SocialIconProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ href, className = "", children, ariaLabel }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 hover:scale-110 ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
};

export const XIcon: React.FC<{ href?: string; className?: string }> = ({ 
  href = "https://x.com", 
  className = "" 
}) => {
  return (
    <SocialIcon 
      href={href} 
      className={`bg-black hover:bg-gray-800 text-white ${className}`}
      ariaLabel="Follow us on X (formerly Twitter)"
    >
      <svg 
        className="w-4 h-4" 
        fill="currentColor" 
        viewBox="0 0 24 24" 
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    </SocialIcon>
  );
};

export const LinkedInIcon: React.FC<{ href?: string; className?: string }> = ({ 
  href = "https://linkedin.com", 
  className = "" 
}) => {
  return (
    <SocialIcon 
      href={href} 
      className={`bg-[#0077B5] hover:bg-[#005885] text-white ${className}`}
      ariaLabel="Connect with us on LinkedIn"
    >
      <svg 
        className="w-4 h-4" 
        fill="currentColor" 
        viewBox="0 0 24 24" 
        aria-hidden="true"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    </SocialIcon>
  );
};

// Combined component for easy use
export const SocialMediaIcons: React.FC<{ 
  xHref?: string; 
  linkedInHref?: string; 
  className?: string;
  iconClassName?: string;
}> = ({ 
  xHref, 
  linkedInHref, 
  className = "flex items-center space-x-3",
  iconClassName = ""
}) => {
  return (
    <div className={className}>
      <XIcon href={xHref} className={iconClassName} />
      <LinkedInIcon href={linkedInHref} className={iconClassName} />
    </div>
  );
};