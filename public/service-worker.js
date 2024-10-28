self.addEventListener('install', (event) => {
    console.log('Service Worker installed');
    self.skipWaiting();
  });
  
  self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'Default Title';
    const options = {
      body: data.body || 'Default Body',
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      data: { url: data.url || '/' }
    };
  
    event.waitUntil(self.registration.showNotification(title, options));
  });
  
  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    const clickAction = event.notification.data.url || '/';
    event.waitUntil(clients.openWindow(clickAction));
  });
  

  