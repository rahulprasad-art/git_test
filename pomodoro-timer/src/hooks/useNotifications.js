import { useState, useEffect } from 'react';

export function useNotifications() {
  const [permission, setPermission] = useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'denied'
  );

  useEffect(() => {
    // Request notification permission if not yet determined
    if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
      Notification.requestPermission().then(setPermission);
    }
  }, []);

  const showNotification = (title, options = {}) => {
    if (permission === 'granted' && typeof Notification !== 'undefined') {
      const notification = new Notification(title, {
        icon: '/vite.svg',
        badge: '/vite.svg',
        ...options,
      });

      // Auto-close notification after 5 seconds
      setTimeout(() => notification.close(), 5000);

      return notification;
    }
  };

  const requestPermission = async () => {
    if (typeof Notification !== 'undefined') {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    }
    return 'denied';
  };

  return {
    permission,
    showNotification,
    requestPermission,
    isSupported: typeof Notification !== 'undefined',
  };
}
