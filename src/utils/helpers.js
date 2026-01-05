import { format, isValid, parseISO } from 'date-fns';

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @param {string} formatStr - Format string (default: 'PPP')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, formatStr = 'PPP') => {
    try {
        const dateObj = typeof date === 'string' ? parseISO(date) : date;
        return isValid(dateObj) ? format(dateObj, formatStr) : 'Invalid Date';
    } catch (error) {
        console.error('Date formatting error:', error);
        return 'Invalid Date';
    }
};

/**
 * Format currency with Bangladeshi Taka symbol
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
    if (typeof amount !== 'number' || isNaN(amount)) {
        return '৳0';
    }
    return `৳${amount.toLocaleString()}`;
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
    if (!text || typeof text !== 'string') return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} Is valid URL
 */
export const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

/**
 * Generate random ID
 * @param {number} length - Length of ID
 * @returns {string} Random ID
 */
export const generateId = (length = 8) => {
    return Math.random().toString(36).substring(2, length + 2);
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Get user display name from user object
 * @param {Object} user - User object
 * @returns {string} Display name
 */
export const getUserDisplayName = (user) => {
    if (!user) return 'Guest';
    return user.displayName ||
        user.providerData?.[0]?.displayName ||
        user.name ||
        user.email?.split('@')[0] ||
        'User';
};

/**
 * Get user photo URL from user object
 * @param {Object} user - User object
 * @returns {string} Photo URL or default avatar
 */
export const getUserPhotoUrl = (user) => {
    if (!user) return '/default-avatar.png';
    return user.photoURL ||
        user.providerData?.[0]?.photoURL ||
        user.photo ||
        '/default-avatar.png';
};

/**
 * Handle API errors and return user-friendly message
 * @param {Error} error - Error object
 * @returns {string} User-friendly error message
 */
export const getErrorMessage = (error) => {
    if (error.response?.data?.message) {
        return error.response.data.message;
    }

    if (error.message) {
        return error.message;
    }

    switch (error.response?.status) {
        case 400:
            return 'Bad request. Please check your input.';
        case 401:
            return 'You are not authorized. Please login again.';
        case 403:
            return 'Access denied.';
        case 404:
            return 'Resource not found.';
        case 500:
            return 'Server error. Please try again later.';
        default:
            return 'Something went wrong. Please try again.';
    }
};

/**
 * Scroll to top of page smoothly
 */
export const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

/**
 * Check if user is online
 * @returns {boolean} Is online
 */
export const isOnline = () => {
    return navigator.onLine;
};

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        console.error('Failed to copy text:', error);
        return false;
    }
};