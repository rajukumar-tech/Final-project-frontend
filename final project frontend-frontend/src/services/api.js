// src/services/api.js
// Centralized API service for all backend communication

import { getToken, clearAuth } from './auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

/**
 * Generic API request handler with automatic token injection and error handling
 */
async function apiRequest(endpoint, options = {}) {
    const token = getToken();

    const config = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    };

    // Add authorization header if token exists
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Add credentials to allow cookies
    config.credentials = 'include';

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

        // Handle 401 Unauthorized - token expired or invalid
        if (response.status === 401) {
            clearAuth();
            window.location.href = '/'; // Redirect to login
            throw new Error('Session expired. Please login again.');
        }

        // Parse response
        const data = await response.json();

        // Handle error responses
        if (!response.ok) {
            throw new Error(data.error || data.message || 'Request failed');
        }

        return data;
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
}

// ============================================================================
// Authentication API
// ============================================================================

export const authAPI = {
    /**
     * Login user
     * @param {string} email 
     * @param {string} password 
     * @param {string} role 
     */
    async login(email, password, role) {
        return apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password, role }),
        });
    },

    /**
     * Register new user
     * @param {object} userData - { email, password, name, role }
     */
    async register(userData) {
        return apiRequest('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    },

    /**
     * Logout user
     */
    async logout() {
        return apiRequest('/auth/logout', {
            method: 'POST',
        });
    },
};

// ============================================================================
// Users API
// ============================================================================

export const usersAPI = {
    /**
     * Get all users (admin only)
     */
    async getAll(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return apiRequest(`/users${queryString ? '?' + queryString : ''}`);
    },

    /**
     * Get user by ID
     */
    async getById(userId) {
        return apiRequest(`/users/${userId}`);
    },

    /**
     * Create new user (admin only)
     */
    async create(userData) {
        return apiRequest('/users', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    },

    /**
     * Update user
     */
    async update(userId, userData) {
        return apiRequest(`/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(userData),
        });
    },

    /**
     * Delete user (admin only)
     */
    async delete(userId) {
        return apiRequest(`/users/${userId}`, {
            method: 'DELETE',
        });
    },
};

// ============================================================================
// Courses API
// ============================================================================

export const coursesAPI = {
    /**
     * Get all courses
     */
    async getAll() {
        return apiRequest('/courses');
    },

    /**
     * Get course by ID
     */
    async getById(courseId) {
        return apiRequest(`/courses/${courseId}`);
    },

    /**
     * Create new course (admin only)
     */
    async create(courseData) {
        return apiRequest('/courses', {
            method: 'POST',
            body: JSON.stringify(courseData),
        });
    },

    /**
     * Update course (admin only)
     */
    async update(courseId, courseData) {
        return apiRequest(`/courses/${courseId}`, {
            method: 'PUT',
            body: JSON.stringify(courseData),
        });
    },

    /**
     * Delete course (admin only)
     */
    async delete(courseId) {
        return apiRequest(`/courses/${courseId}`, {
            method: 'DELETE',
        });
    },
};

// ============================================================================
// Batches API
// ============================================================================

export const batchesAPI = {
    /**
     * Get all batches
     */
    async getAll() {
        return apiRequest('/batches');
    },

    /**
     * Get batch by ID
     */
    async getById(batchId) {
        return apiRequest(`/batches/${batchId}`);
    },

    /**
     * Create new batch (admin only)
     */
    async create(batchData) {
        return apiRequest('/batches', {
            method: 'POST',
            body: JSON.stringify(batchData),
        });
    },

    /**
     * Update batch (admin only)
     */
    async update(batchId, batchData) {
        return apiRequest(`/batches/${batchId}`, {
            method: 'PUT',
            body: JSON.stringify(batchData),
        });
    },

    /**
     * Delete batch (admin only)
     */
    async delete(batchId) {
        return apiRequest(`/batches/${batchId}`, {
            method: 'DELETE',
        });
    },

    /**
     * Get students in a batch
     */
    async getStudents(batchId) {
        return apiRequest(`/batches/${batchId}/students`);
    },

    /**
     * Assign instructor to batch (admin only)
     */
    async assignInstructor(batchId, instructorId) {
        return apiRequest(`/batches/${batchId}/assign-instructor`, {
            method: 'POST',
            body: JSON.stringify({ instructorId }),
        });
    },

    /**
     * Remove instructor from batch (admin only)
     */
    async removeInstructor(batchId, instructorId) {
        return apiRequest(`/batches/${batchId}/assign-instructor/${instructorId}`, {
            method: 'DELETE',
        });
    },
};

// ============================================================================
// Attendance Sessions API
// ============================================================================

export const attendanceAPI = {
    /**
     * Create attendance session
     */
    async createSession(sessionData) {
        return apiRequest('/attendance/sessions', {
            method: 'POST',
            body: JSON.stringify(sessionData),
        });
    },

    /**
     * Get attendance sessions with optional filters
     */
    async getSessions(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return apiRequest(`/attendance/sessions${queryString ? '?' + queryString : ''}`);
    },

    /**
     * Get attendance records for a session
     */
    async getSessionRecords(sessionId, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return apiRequest(`/attendance/sessions/${sessionId}/records${queryString ? '?' + queryString : ''}`);
    },

    /**
     * Create/update attendance records for a session (bulk)
     */
    async saveRecords(sessionId, records) {
        return apiRequest(`/attendance/sessions/${sessionId}/records`, {
            method: 'POST',
            body: JSON.stringify({ records }),
        });
    },
};

// ============================================================================
// Reports API
// ============================================================================

export const reportsAPI = {
    /**
     * Get batch attendance history
     */
    async getBatchHistory(batchId) {
        return apiRequest(`/reports/batch/${batchId}/history`);
    },

    /**
     * Get student attendance summary
     */
    async getStudentSummary(studentId) {
        return apiRequest(`/reports/student/${studentId}/summary`);
    },
};

// ============================================================================
// Admin API
// ============================================================================

export const adminAPI = {
    /**
     * Get instructor sessions (admin only)
     */
    async getInstructorSessions(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return apiRequest(`/admin/instructor-sessions${queryString ? '?' + queryString : ''}`);
    },
};

// Export default object with all APIs
export default {
    auth: authAPI,
    users: usersAPI,
    courses: coursesAPI,
    batches: batchesAPI,
    attendance: attendanceAPI,
    reports: reportsAPI,
    admin: adminAPI,
};
