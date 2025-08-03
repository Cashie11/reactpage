/**
 * Header Component
 * 
 * A reusable header component that displays:
 * - Application title
 * - Subtitle text
 * 
 * This component demonstrates:
 * - Basic React functional component structure
 * - CSS Modules for scoped styling
 * - Props-based content rendering
 * - Semantic HTML5 elements
 */
import React from 'react';
import './Header.css';

/**
 * Header Component
 * Renders the application header with title and subtitle
 * 
 * @returns {JSX.Element} The rendered header component
 */
const Header = () => {
  return (
    <header 
      className="header" 
      role="banner" // ARIA role for better accessibility
      data-testid="app-header" // Test ID for easier testing
    >
      <h1>Software Testing Demo</h1>
      <p className="subtitle">A playground for testing practice</p>
    </header>
  );
};

export default Header;
