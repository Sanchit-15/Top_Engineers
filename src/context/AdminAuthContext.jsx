import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext();

const ADMIN_STORAGE_KEY = 'te_admin_session';

export function AdminAuthProvider({ children }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try {
      return localStorage.getItem(ADMIN_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [adminUser, setAdminUser] = useState(() => {
    try {
      const stored = localStorage.getItem('te_admin_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(ADMIN_STORAGE_KEY, isAdminLoggedIn ? 'true' : 'false');
      if (adminUser) {
        localStorage.setItem('te_admin_user', JSON.stringify(adminUser));
      } else {
        localStorage.removeItem('te_admin_user');
      }
    } catch (e) {
      console.error('Failed to sync admin auth with localStorage:', e);
    }
  }, [isAdminLoggedIn, adminUser]);

  /**
   * Demo Login handler for Phase 3 frontend inspection.
   * Supabase Auth will be wired up in Phase 5.
   */
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !password) {
          reject(new Error('Please enter both email and password.'));
          return;
        }
        if (password.length < 6) {
          reject(new Error('Password must be at least 6 characters.'));
          return;
        }

        const user = {
          email: email.trim(),
          role: 'admin',
          full_name: 'Top Engineers Administrator',
        };

        setIsAdminLoggedIn(true);
        setAdminUser(user);
        resolve(user);
      }, 400);
    });
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
    setAdminUser(null);
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    localStorage.removeItem('te_admin_user');
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAdminLoggedIn,
        adminUser,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
