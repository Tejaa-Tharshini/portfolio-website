import { useState, useEffect, useCallback } from 'react';
import { hashPassword, hashUsername, verifyPassword } from '../utils/crypto';

const AUTH_STORAGE_KEY = 'adminAuth';
const SESSION_KEY = 'adminSession';

// Default credentials - will be hashed on first use
const DEFAULT_USERNAME = 'naina';
const DEFAULT_PASSWORD = 'Podapatti';

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Initialize auth on first load
    useEffect(() => {
        const initAuth = async () => {
            // Check if auth exists in localStorage
            const stored = localStorage.getItem(AUTH_STORAGE_KEY);
            if (!stored) {
                // Initialize with default hashed credentials
                const usernameHash = await hashUsername(DEFAULT_USERNAME);
                const passwordHash = await hashPassword(DEFAULT_PASSWORD);
                const authData = { usernameHash, passwordHash };
                localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
            }

            // Check session
            const session = sessionStorage.getItem(SESSION_KEY);
            if (session === 'authenticated') {
                setIsAuthenticated(true);
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    // Login function
    const login = useCallback(async (username, password) => {
        try {
            const stored = localStorage.getItem(AUTH_STORAGE_KEY);
            if (!stored) return false;

            const { usernameHash, passwordHash } = JSON.parse(stored);

            const usernameValid = await verifyPassword(username.toLowerCase(), usernameHash);
            const passwordValid = await verifyPassword(password, passwordHash);

            if (usernameValid && passwordValid) {
                sessionStorage.setItem(SESSION_KEY, 'authenticated');
                setIsAuthenticated(true);
                return true;
            }
            return false;
        } catch (e) {
            console.error('Login error:', e);
            return false;
        }
    }, []);

    // Logout function
    const logout = useCallback(() => {
        sessionStorage.removeItem(SESSION_KEY);
        setIsAuthenticated(false);
    }, []);

    // Change username
    const changeUsername = useCallback(async (currentPassword, newUsername) => {
        try {
            const stored = localStorage.getItem(AUTH_STORAGE_KEY);
            if (!stored) return false;

            const { passwordHash } = JSON.parse(stored);

            // Verify current password
            const passwordValid = await verifyPassword(currentPassword, passwordHash);
            if (!passwordValid) return false;

            // Update username hash
            const newUsernameHash = await hashUsername(newUsername);
            const authData = { usernameHash: newUsernameHash, passwordHash };
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));

            return true;
        } catch (e) {
            console.error('Change username error:', e);
            return false;
        }
    }, []);

    // Change password
    const changePassword = useCallback(async (currentPassword, newPassword) => {
        try {
            const stored = localStorage.getItem(AUTH_STORAGE_KEY);
            if (!stored) return false;

            const { usernameHash, passwordHash } = JSON.parse(stored);

            // Verify current password
            const passwordValid = await verifyPassword(currentPassword, passwordHash);
            if (!passwordValid) return false;

            // Update password hash
            const newPasswordHash = await hashPassword(newPassword);
            const authData = { usernameHash, passwordHash: newPasswordHash };
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));

            return true;
        } catch (e) {
            console.error('Change password error:', e);
            return false;
        }
    }, []);

    // Reset credentials to default (emergency reset)
    const resetCredentials = useCallback(async () => {
        const usernameHash = await hashUsername(DEFAULT_USERNAME);
        const passwordHash = await hashPassword(DEFAULT_PASSWORD);
        const authData = { usernameHash, passwordHash };
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
        sessionStorage.removeItem(SESSION_KEY);
        setIsAuthenticated(false);
    }, []);

    return {
        isAuthenticated,
        loading,
        login,
        logout,
        changeUsername,
        changePassword,
        resetCredentials
    };
}
