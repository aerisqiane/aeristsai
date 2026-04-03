importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyB6jtcngjBizhyF8Y-8G2i9LFB7GziBliA",
  authDomain: "aeristsai-bf1a3.firebaseapp.com",
  projectId: "aeristsai-bf1a3",
  storageBucket: "aeristsai-bf1a3.firebasestorage.app",
  messagingSenderId: "837670017413",
  appId: "1:837670017413:web:2e46a0a2dd2d7f4cb9ccec"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body, icon } = payload.notification;
  self.registration.showNotification(title, {
    body: body || '蔡芷妍有新歌了！',
    icon: icon || 'https://pub-f37ac82030a342619327ce748b8d3f37.r2.dev/favicon.png',
    badge: 'https://pub-f37ac82030a342619327ce748b8d3f37.r2.dev/favicon.png',
    data: payload.data
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://aeristsai.vercel.app')
  );
});
