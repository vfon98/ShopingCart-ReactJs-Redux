import * as firebase from 'firebase/app';
import 'firebase/messaging';
import 'firebase/auth';
import 'firebase/analytics';
const firebaseConfig = {
  apiKey: 'AIzaSyDHdEhhWGoFJmuNMbNQ4KcjFhz8dp01kEI',
  authDomain: 'seek-product-nextjs.firebaseapp.com',
  databaseURL: 'https://seek-product-nextjs.firebaseio.com',
  projectId: 'seek-product-nextjs',
  storageBucket: 'seek-product-nextjs.appspot.com',
  messagingSenderId: '124533210035',
  appId: '1:124533210035:web:a094f0ba4388fbef1ea9c6',
  measurementId: 'G-NP0LJ444E7'
};

export const initializeFirebase = async () => {
  !firebase.apps.length && firebase.initializeApp(firebaseConfig);
  console.log('FIREBASE initialized');
  try {
    firebase.analytics();
    const messaging = firebase.messaging();
    messaging.onMessage(payload => {
      console.log('MESSAGE RECEIVED:', payload);
    });
    if (localStorage.getItem('notification-token') !== null) return;

    await messaging.requestPermission();
    messaging.usePublicVapidKey(
      'BMk-NokF8Qd5iXnEn2-4VdIVMc_F182oK7rQtxht8_SIebci16UapymUryPebMiTcNGhsazUNk_2cPDRIzINh4k'
    );
    const token = await messaging.getToken();
    console.log(token)
    localStorage.setItem('notification-token', token);
  } catch (err) {
    console.log(err);
  }
};
