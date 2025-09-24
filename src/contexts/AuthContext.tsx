import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { authenticateUser, getAuthSession, setAuthSession, clearAuthSession, AuthUser } from '@/lib/auth';

export interface User extends AuthUser {}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAdmin: boolean;
  isTechnician: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app load
    const checkSession = () => {
      try {
        const sessionUser = getAuthSession();
        if (sessionUser) {
          setUser(sessionUser);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      const authenticatedUser = await authenticateUser(email, password);
      
      if (authenticatedUser) {
        setUser(authenticatedUser);
        setAuthSession(authenticatedUser);
        toast.success(`Welcome back, ${authenticatedUser.fullName || email}!`);
        return true;
      } else {
        toast.error('Invalid email or password');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      clearAuthSession();
      setUser(null);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    isAdmin: user?.role === 'admin',
    isTechnician: user?.role === 'technician',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
