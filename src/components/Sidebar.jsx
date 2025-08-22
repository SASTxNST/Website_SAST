/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ setActiveSection }) => {
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sidebarRef.current) observer.observe(sidebarRef.current);
    return () => {
      if (sidebarRef.current) observer.unobserve(sidebarRef.current);
    };
  }, []);

  const baseStyle = {
    padding: '0.75rem 1rem',
    borderRadius: '9999px',
    fontWeight: 'bold',
    background: 'rgba(255, 255, 255, 0.03)',
    color: '#cccccc',
    border: '1px solid rgba(255,255,255,0.1)',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    backdropFilter: 'blur(10px)',
    marginBottom: '1rem',
    width: '100%',
    textAlign: 'left'
  };

  const handleHover = (e, hover = true) => {
    if (hover) {
      e.target.style.background = 'rgba(255, 255, 255, 0.07)';
    } else {
      e.target.style.background = 'rgba(255, 255, 255, 0.03)';
    }
  };

  return (
    <div
      ref={sidebarRef}
      style={{
        width: '20rem',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        color: 'var(--color-text)',
        minHeight: '100vh',
        padding: '2rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.8s ease-out'
      }}
    >
      <button
        onClick={() => navigate('/')}
        style={baseStyle}
        onMouseEnter={(e) => handleHover(e, true)}
        onMouseLeave={(e) => handleHover(e, false)}
      >
        🏠 Home
      </button>

      <button
        onClick={() => setActiveSection('ranks')}
        style={baseStyle}
        onMouseEnter={(e) => handleHover(e, true)}
        onMouseLeave={(e) => handleHover(e, false)}
      >
        🏆 Contribution Ranks
      </button>
    </div>
  );
};

export default Sidebar;
