/**
 * Accessibility Utilities and Hooks
 * Provides utilities for improved keyboard navigation, focus management, and screen reader support
 */

import { useEffect, useRef } from 'react';

/**
 * Hook to trap focus within a modal or dialog
 * @param {boolean} isActive - Whether focus trap is active
 */
export const useFocusTrap = (isActive) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    // Focus first element when trap activates
    firstElement?.focus();

    container.addEventListener('keydown', handleTabKey);
    return () => container.removeEventListener('keydown', handleTabKey);
  }, [isActive]);

  return containerRef;
};

/**
 * Hook to handle ESC key for closing modals/menus
 * @param {Function} onEscape - Callback when ESC is pressed
 * @param {boolean} isActive - Whether the listener is active
 */
export const useEscapeKey = (onEscape, isActive = true) => {
  useEffect(() => {
    if (!isActive) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onEscape();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onEscape, isActive]);
};

/**
 * Hook to announce messages to screen readers
 * @returns {Function} announce - Function to announce a message
 */
export const useScreenReaderAnnounce = () => {
  const announcer = useRef(null);

  useEffect(() => {
    // Create ARIA live region if it doesn't exist
    if (!announcer.current) {
      const element = document.createElement('div');
      element.setAttribute('role', 'status');
      element.setAttribute('aria-live', 'polite');
      element.setAttribute('aria-atomic', 'true');
      element.className = 'sr-only';
      document.body.appendChild(element);
      announcer.current = element;
    }

    return () => {
      if (announcer.current) {
        document.body.removeChild(announcer.current);
      }
    };
  }, []);

  const announce = (message, priority = 'polite') => {
    if (announcer.current) {
      announcer.current.setAttribute('aria-live', priority);
      announcer.current.textContent = message;
      
      // Clear after announcement
      setTimeout(() => {
        if (announcer.current) {
          announcer.current.textContent = '';
        }
      }, 1000);
    }
  };

  return announce;
};

/**
 * Hook to manage focus on component mount
 * @param {boolean} shouldFocus - Whether to focus on mount
 */
export const useAutoFocus = (shouldFocus = true) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (shouldFocus && elementRef.current) {
      elementRef.current.focus();
    }
  }, [shouldFocus]);

  return elementRef;
};

/**
 * Component: VisuallyHidden
 * Hides content visually but keeps it accessible to screen readers
 */
export const VisuallyHidden = ({ children, as: Component = 'span', ...props }) => {
  return (
    <Component
      className="sr-only"
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * Component: SkipLink
 * Allows keyboard users to skip navigation and go directly to main content
 */
export const SkipLink = ({ targetId = 'main-content', children = 'Skip to main content' }) => {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded-lg focus:shadow-lg"
    >
      {children}
    </a>
  );
};

/**
 * Utility: Generate unique ID for ARIA relationships
 */
let idCounter = 0;
export const useId = (prefix = 'id') => {
  const idRef = useRef(null);
  
  if (idRef.current === null) {
    idRef.current = `${prefix}-${++idCounter}`;
  }
  
  return idRef.current;
};

/**
 * Utility: Check if reduced motion is preferred
 */
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

/**
 * Higher-Order Component: Add keyboard navigation to clickable divs
 */
export const makeKeyboardAccessible = (Component) => {
  return ({ onClick, ...props }) => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick?.(e);
      }
    };

    return (
      <Component
        onClick={onClick}
        onKeyPress={handleKeyPress}
        role="button"
        tabIndex={0}
        {...props}
      />
    );
  };
};

export default {
  useFocusTrap,
  useEscapeKey,
  useScreenReaderAnnounce,
  useAutoFocus,
  useId,
  useReducedMotion,
  VisuallyHidden,
  SkipLink,
  makeKeyboardAccessible,
};
