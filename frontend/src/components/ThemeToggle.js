import React from 'react';
import './ThemeToggle.css';

const ThemeToggle = ({ isLiquidGlass, toggleTheme }) => {
    return (
        <button
            className={`theme-toggle-btn ${isLiquidGlass ? 'liquid-active' : ''}`}
            onClick={toggleTheme}
            title={isLiquidGlass ? "Switch to Default Theme" : "Switch to Liquid Glass Theme"}
        >
            <div className="toggle-icon">
                {isLiquidGlass ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 17v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 7h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </div>
            <span className="toggle-label">
                {isLiquidGlass ? 'Liquid Glass' : 'Default'}
            </span>
        </button>
    );
};

export default ThemeToggle;
