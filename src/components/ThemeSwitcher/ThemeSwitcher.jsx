import { useState, useEffect } from 'react';
import { FaPalette } from 'react-icons/fa';

const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState('default');

  // Define themes
  const themes = ['default', 'gold', 'pink'];

  // Load saved theme preference on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme');
    if (savedTheme && themes.includes(savedTheme)) {
      setCurrentTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      setCurrentTheme('default');
      applyDefaultTheme();
    }
  }, []);

  // Function to apply the gold theme
  const applyGoldTheme = () => {
    // Remove existing theme styles
    const existingLink = document.getElementById('theme-stylesheet');
    if (existingLink) {
      existingLink.remove();
    }

    // Add gold theme stylesheet
    const link = document.createElement('link');
    link.id = 'theme-stylesheet';
    link.rel = 'stylesheet';
    link.href = '/gold.css';
    link.type = 'text/css';
    document.head.appendChild(link);

    localStorage.setItem('app-theme', 'gold');
  };

  // Function to apply the pink theme
  const applyPinkTheme = () => {
    // Remove existing theme styles
    const existingLink = document.getElementById('theme-stylesheet');
    if (existingLink) {
      existingLink.remove();
    }

    // Add pink theme stylesheet
    const link = document.createElement('link');
    link.id = 'theme-stylesheet';
    link.rel = 'stylesheet';
    link.href = '/pink.css';
    link.type = 'text/css';
    document.head.appendChild(link);

    localStorage.setItem('app-theme', 'pink');
  };

  // Function to apply the default theme
  const applyDefaultTheme = () => {
    // Remove theme styles
    const existingLink = document.getElementById('theme-stylesheet');
    if (existingLink) {
      existingLink.remove();
    }

    localStorage.setItem('app-theme', 'default');
  };

  // Function to apply any theme
  const applyTheme = (theme) => {
    switch (theme) {
      case 'gold':
        applyGoldTheme();
        break;
      case 'pink':
        applyPinkTheme();
        break;
      default:
        applyDefaultTheme();
        break;
    }
  };

  // Cycle through themes
  const toggleTheme = () => {
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    
    setCurrentTheme(nextTheme);
    applyTheme(nextTheme);
  };

  // Get theme display info
  const getThemeInfo = () => {
    switch (currentTheme) {
      case 'gold':
        return { 
          icon: 'text-yellow-500', 
          label: 'Gold',
          title: 'Switch to Pink Theme'
        };
      case 'pink':
        return { 
          icon: 'text-pink-500', 
          label: 'Pink',
          title: 'Switch to Default Theme'
        };
      default:
        return { 
          icon: 'text-emerald-500', 
          label: 'Default',
          title: 'Switch to Gold Theme'
        };
    }
  };

  const themeInfo = getThemeInfo();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 text-text-secondary hover:text-primary-500 transition-colors duration-300 px-3 py-2 rounded-md border border-gray-600 hover:border-primary-500"
      title={themeInfo.title}
    >
      <FaPalette className={themeInfo.icon} />
      <span className="hidden sm:inline text-sm">
        {themeInfo.label}
      </span>
    </button>
  );
};

export default ThemeSwitcher; 