// src/services/auth.js
// Authentication service for managing user sessions and tokens

/**
 * Get the authentication token from localStorage
 */
export function getToken() {
    return localStorage.getItem('authToken');
}

/**
 * Store the authentication token in localStorage
 */
export function setToken(token) {
    localStorage.setItem('authToken', token);
}

/**
 * Remove the authentication token from localStorage
 */
export function removeToken() {
    localStorage.removeItem('authToken');
}

/**
 * Get the current user data from localStorage
 */
export function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

/**
 * Store the current user data in localStorage
 */
export function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

/**
 * Remove the current user data from localStorage
 */
export function removeCurrentUser() {
    localStorage.removeItem('currentUser');
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated() {
    return !!getToken();
}

/**
 * Clear all authentication data
 */
export function clearAuth() {
    removeToken();
    removeCurrentUser();
}
