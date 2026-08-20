import React from 'react';

export const IconWrapper = ({ size = 24, className = '', children, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {children}
  </svg>
);

export const Code = ( p) => (
  <IconWrapper {...p}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></IconWrapper>
);
export const Sparkles = ( p) => (
  <IconWrapper {...p}><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/></IconWrapper>
);
export const GraduationCap = ( p) => (
  <IconWrapper {...p}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></IconWrapper>
);
export const Github = ( p) => (
  <IconWrapper {...p}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></IconWrapper>
);
export const Linkedin = ( p) => (
  <IconWrapper {...p}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></IconWrapper>
);
export const Mail = ( p) => (
  <IconWrapper {...p}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></IconWrapper>
);
export const ExternalLink = ( p) => (
  <IconWrapper {...p}><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></IconWrapper>
);
export const Download = ( p) => (
  <IconWrapper {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></IconWrapper>
);
export const CheckCircle2 = ( p) => (
  <IconWrapper {...p}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></IconWrapper>
);
export const ChevronRight = ( p) => (
  <IconWrapper {...p}><path d="m9 18 6-6-6-6"/></IconWrapper>
);
export const User = ( p) => (
  <IconWrapper {...p}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></IconWrapper>
);
export const Cpu = ( p) => (
  <IconWrapper {...p}><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9"/><path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2"/></IconWrapper>
);
export const ArrowUpRight = ( p) => (
  <IconWrapper {...p}><line x1="7" x2="17" y1="17" y2="7"/><polyline points="7 7 17 7 17 17"/></IconWrapper>
);
export const X = ( p) => (
  <IconWrapper {...p}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></IconWrapper>
);
export const Globe = ( p) => (
  <IconWrapper {...p}><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></IconWrapper>
);
export const Layers = ( p) => (
  <IconWrapper {...p}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polygon points="2 17 12 22 22 17"/><polygon points="2 12 12 17 22 12"/></IconWrapper>
);
export const Check = ( p) => (
  <IconWrapper {...p}><polyline points="20 6 9 17 4 12"/></IconWrapper>
);
export const Copy = ( p) => (
  <IconWrapper {...p}><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></IconWrapper>
);
export const Laptop = ( p) => (
  <IconWrapper {...p}><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H0m20 0a2 2 0 0 1 2 2v1H2v-1a2 2 0 0 1 2-2h16z"/></IconWrapper>
);
export const Rocket = ( p) => (
  <IconWrapper {...p}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.71 1.1-1.38 1.5-2.06l-2.44-2.44c-.68.4-1.35.79-2.06 1.5z"/><path d="M12 15l-3-3 7.5-7.5 3 3z"/><path d="M16 6.5l2.5-2.5"/></IconWrapper>
);
export const Heart = ( p) => (
  <IconWrapper {...p}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></IconWrapper>
);
export const Maximize2 = ( p) => (
  <IconWrapper {...p}><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></IconWrapper>
);
export const Eye = ( p) => (
  <IconWrapper {...p}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></IconWrapper>
);
export const CornerDownLeft = ( p) => (
  <IconWrapper {...p}><polyline points="9 10 4 15 9 20"/><path d="M20 4v7a4 4 0 0 1-4 4H4"/></IconWrapper>
);
