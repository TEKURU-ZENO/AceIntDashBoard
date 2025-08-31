import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  company: string;
  role: string;
  avatar?: string;
  preferences?: {
    theme: 'light' | 'dark';
    notifications: boolean;
    emailUpdates: boolean;
    reducedMotion: boolean;
    compactView: boolean; 
    soundEnabled: boolean;
    autoSave: boolean; 
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  updatePreferences: (preferences: Partial<User['preferences']>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedAuth = localStorage.getItem('aceint_auth');
        if (storedAuth) {
          const authData = JSON.parse(storedAuth);
          if (authData.isAuthenticated && authData.user) {
            setUser(authData.user);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        localStorage.removeItem('aceint_auth');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string, remember = false) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock user data - in real app, this would come from API
      const userData: User = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        email: email,
        name: email === 'demo@aceint.com' ? 'Demo User' : 'John Doe',
        company: 'AceInt Corp',
        role: 'HR Manager',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        preferences: {
          theme: 'light',
          notifications: true,
          emailUpdates: true,
          reducedMotion: false
        }
      };

      setUser(userData);

      // Store auth state
      const authData = {
        isAuthenticated: true,
        user: userData
      };
      
      localStorage.setItem('aceint_auth', JSON.stringify(authData));
      
      if (remember) {
        localStorage.setItem('aceint_remember', 'true');
      }

    } catch (error) {
      throw new Error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: any) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newUser: User = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        email: userData.email,
        name: `${userData.firstName} ${userData.lastName}`,
        company: userData.company,
        role: userData.role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`,
        preferences: {
          theme: 'light',
          notifications: true,
          emailUpdates: true,
          reducedMotion: false
        }
      };

      setUser(newUser);

      // Store auth state
      const authData = {
        isAuthenticated: true,
        user: newUser
      };
      
      localStorage.setItem('aceint_auth', JSON.stringify(authData));

    } catch (error) {
      throw new Error('Account creation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aceint_auth');
    localStorage.removeItem('aceint_remember');
    localStorage.removeItem('aceint_preferences');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);

    // Update stored auth data
    const authData = {
      isAuthenticated: true,
      user: updatedUser
    };
    localStorage.setItem('aceint_auth', JSON.stringify(authData));
  };

  const updatePreferences = (preferences: Partial<User['preferences']>) => {
    if (!user) return;

    // Fix: Handle case where user.preferences might be undefined
    const currentPreferences = user.preferences || {
      theme: 'light' as const,
      notifications: true,
      emailUpdates: true,
      reducedMotion: false
    };

    const updatedPreferences = { ...currentPreferences, ...preferences };
    const updatedUser = { ...user, preferences: updatedPreferences };
    
    setUser(updatedUser);

    // Update stored auth data
    const authData = {
      isAuthenticated: true,
      user: updatedUser
    };
    localStorage.setItem('aceint_auth', JSON.stringify(authData));

    // Store preferences separately for quick access
    localStorage.setItem('aceint_preferences', JSON.stringify(updatedPreferences));

    // Apply theme changes immediately
    if (preferences.theme) {
      document.documentElement.classList.toggle('dark', preferences.theme === 'dark');
    }

    // Apply reduced motion preference
    if (preferences.reducedMotion !== undefined) {
      if (preferences.reducedMotion) {
        document.documentElement.style.setProperty('--animation-duration', '0s');
      } else {
        document.documentElement.style.removeProperty('--animation-duration');
      }
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    updateProfile,
    updatePreferences
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
