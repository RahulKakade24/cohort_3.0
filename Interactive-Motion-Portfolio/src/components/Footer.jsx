import React from 'react';

export default function Footer() {
  return (
    <footer className="py-8 border-t border-slate-200 text-center text-xs text-slate-500 relative z-10">
      <p>&copy; {new Date().getFullYear()} Rahul Kakade. Built with React, Tailwind CSS & GSAP.</p>
    </footer>
  );
}
