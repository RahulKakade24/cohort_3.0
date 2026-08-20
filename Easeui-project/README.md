EaseUi

EaseUi is a sleek, modern, and developer-friendly UI component library designed for high-performance React applications. It features a custom-built dark/light mode toggle with eye-protection colors, animated interactions via GSAP, and is built with Tailwind CSS.

Features

Dark/Light Mode: Seamless theme switching with persistent user preference stored in localStorage.

Eye-Protection Palette: Carefully crafted dark mode colors to reduce eye strain during long sessions.

GSAP Animations: Fluid entry and hover animations for a premium user experience.

Modular Components: Highly customizable and reusable components built with Radix UI slots and Tailwind CSS.

Getting Started

Prerequisites

Node.js (v18+)

npm or yarn

Installation

Clone the repository:
git clone
cd ease-ui

Install dependencies:
npm install

Run the development server:
npm run dev

Project Structure

src/components/: Reusable UI components.

src/features/: Redux slices (including ThemeSlice).

src/libs/: Utility functions and GSAP animation configurations.

src/index.css: Global styles, including theme definitions and color palettes.

Theme Configuration

The project uses a custom Tailwind CSS configuration and CSS variables for theming. To adjust the dark mode palette, edit the .dark class block in src/index.css.

Documentation

Components: Check the /components route for a full gallery of available UI elements.
