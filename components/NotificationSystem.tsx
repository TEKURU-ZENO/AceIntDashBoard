import React, { useState, useEffect, createContext, useContext } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Bell, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  XCircle,
  BellRing,
  Clock,
  User,
  Briefcase,
  BarChart3
} from 'lucide-react';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  category: 'candidate' | 'job' | 'interview' | 'system' | 'ai' | 'general';
  actionUrl?: string;
  actionLabel?: string;
  priority: 'low' | 'medium' | 'high';
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

interface NotificationProviderProps {
  children: React.ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Initialize with some sample notifications
  useEffect(() => {
    const sampleNotifications: Notification[] = [
      {
        id: '1',
        type: 'success',
        title: 'New Candidate Match',
        message: 'AI found 3 high-quality candidates for Frontend Developer position',
        timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
        read: false,
        category: 'ai',
        priority: 'high',
        actionUrl: '/candidates',
        actionLabel: 'View Candidates'
      },
      {
        id: '2',
        type: 'info',
        title: 'Interview Scheduled',
        message: 'Interview with Sarah Chen scheduled for tomorrow at 2:00 PM',
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        read: false,
        category: 'interview',
        priority: 'medium',
        actionUrl: '/analytics',
        actionLabel: 'View Schedule'
      },
      {
        id: '3',
        type: 'warning',
        title: 'Job Posting Expiring',
        message: 'Product Manager position expires in 3 days',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: true,
        category: 'job',
        priority: 'medium',
        actionUrl: '/jobs',
        actionLabel: 'Extend Posting'
      },
      {
        id: '4',
        type: 'success',
        title: 'Weekly Report Ready',
        message: 'Your recruitment analytics report for this week is available',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        read: true,
        category: 'system',
        priority: 'low',
        actionUrl: '/analytics',
        actionLabel: 'View Report'
      }
    ];

    setNotifications(sampleNotifications);
  }, []);

  const addNotification = (notificationData: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notificationData,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Auto-remove non-critical notifications after 5 seconds
    if (notificationData.priority === 'low') {
      setTimeout(() => {
        removeNotification(newNotification.id);
      }, 5000);
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

// Notification Bell Component for Header
export function NotificationBell() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  const getNotificationIcon = (category: string) => {
    switch (category) {
      case 'candidate':
        return <User className="h-4 w-4" />;
      case 'job':
        return <Briefcase className="h-4 w-4" />;
      case 'interview':
        return <Clock className="h-4 w-4" />;
      case 'ai':
        return <BarChart3 className="h-4 w-4" />;
      case 'system':
        return <Info className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-neon-green';
      case 'error':
        return 'text-danger-red';
      case 'warning':
        return 'text-yellow-600';
      case 'info':
      default:
        return 'text-electric-blue';
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2"
        aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
      >
        {unreadCount > 0 ? (
          <BellRing className="h-4 w-4 text-electric-blue" />
        ) : (
          <Bell className="h-4 w-4" />
        )}
        {unreadCount > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-danger-red text-white border-0">
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Notification Panel */}
          <Card className="absolute right-0 top-full mt-2 w-96 max-h-96 overflow-hidden z-50 shadow-lg border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Notifications</CardTitle>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        markAllAsRead();
                        setIsOpen(false);
                      }}
                      className="text-xs"
                    >
                      Mark all read
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="p-1"
                    aria-label="Close notifications"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">
                    <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No notifications yet</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                          !notification.read ? 'bg-electric-blue/5 border-l-4 border-l-electric-blue' : ''
                        }`}
                        onClick={() => {
                          markAsRead(notification.id);
                          if (notification.actionUrl) {
                            setIsOpen(false);
                            // Navigate to action URL
                          }
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`mt-0.5 ${getNotificationColor(notification.type)}`}>
                            {getNotificationIcon(notification.category)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-sm font-medium text-foreground truncate">
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-electric-blue rounded-full flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                {formatTimeAgo(notification.timestamp)}
                              </span>
                              {notification.actionLabel && (
                                <span className="text-xs text-electric-blue font-medium">
                                  {notification.actionLabel} →
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

// Toast Notification Component
export function ToastNotification({ 
  notification, 
  onClose 
}: { 
  notification: Notification; 
  onClose: () => void; 
}) {
  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-neon-green" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-danger-red" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-electric-blue" />;
    }
  };

  const getBorderColor = () => {
    switch (notification.type) {
      case 'success':
        return 'border-l-neon-green';
      case 'error':
        return 'border-l-danger-red';
      case 'warning':
        return 'border-l-yellow-600';
      case 'info':
      default:
        return 'border-l-electric-blue';
    }
  };

  return (
    <Card className={`border-l-4 ${getBorderColor()} shadow-lg`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {getIcon()}
          <div className="flex-1">
            <h4 className="text-sm font-medium text-foreground mb-1">
              {notification.title}
            </h4>
            <p className="text-sm text-muted-foreground">
              {notification.message}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="p-1 h-auto"
            aria-label="Close notification"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
