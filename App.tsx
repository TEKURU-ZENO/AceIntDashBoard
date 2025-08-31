import React, { useState } from 'react';
import { AuthProvider } from './components/AuthContext';
import { NotificationProvider } from './components/NotificationSystem';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import Candidates from './pages/Candidates';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

// Simple hash-based router for compatibility
function useHashRouter() {
  const [currentPath, setCurrentPath] = useState(() => {
    const hash = window.location.hash.slice(1);
    return hash || '/';
  });

  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setCurrentPath(hash || '/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
  };

  return { currentPath, navigate };
}

// Create a simple router context
export const RouterContext = React.createContext<{
  currentPath: string;
  navigate: (path: string) => void;
}>({
  currentPath: '/',
  navigate: () => {}
});

export default function App() {
  const { currentPath, navigate } = useHashRouter();

  const renderPage = () => {
    switch (currentPath) {
      case '/':
      case '/home':
        return <Home />;
      case '/login':
        return <Login />;
      case '/dashboard':
        return <Dashboard />;
      case '/jobs':
        return <Jobs />;
      case '/candidates':
        return <Candidates />;
      case '/analytics':
        return <Analytics />;
      case '/settings':
        return <Settings />;
      default:
        return <Home />;
    }
  };

  return (
    <AuthProvider>
      <NotificationProvider>
        <RouterContext.Provider value={{ currentPath, navigate }}>
          {renderPage()}
        </RouterContext.Provider>
      </NotificationProvider>
    </AuthProvider>
  );
}