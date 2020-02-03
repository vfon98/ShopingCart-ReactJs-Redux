/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/7.6.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.2/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyDHdEhhWGoFJmuNMbNQ4KcjFhz8dp01kEI',
  authDomain: 'seek-product-nextjs.firebaseapp.com',
  databaseURL: 'https://seek-product-nextjs.firebaseio.com',
  projectId: 'seek-product-nextjs',
  storageBucket: 'seek-product-nextjs.appspot.com',
  messagingSenderId: '124533210035',
  appId: '1:124533210035:web:a094f0ba4388fbef1ea9c6',
  measurementId: 'G-NP0LJ444E7'
});
console.log("I'm in service worker");
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
