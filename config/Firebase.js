import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAbP0WOEBMopkXRPMWH460n8q8giTp83GI",
  authDomain: "auth-praktikum-71a83.firebaseapp.com",
  projectId: "auth-praktikum-71a83",
  storageBucket: "auth-praktikum-71a83.firebasestorage.app",
  messagingSenderId: "748224838188",
  appId: "1:748224838188:web:c4fc2a285aa72228646f89",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} catch (e) {
  auth = getAuth(app);
}

export const db = getFirestore(app);
export { auth };