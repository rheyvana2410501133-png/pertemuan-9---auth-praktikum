import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAbP0WOEBMopkXRPMWH460n8q8giTp83GI",
  authDomain: "auth-praktikum-71a83.firebaseapp.com",
  projectId: "auth-praktikum-71a83",
  storageBucket: "auth-praktikum-71a83.firebasestorage.app",
  messagingSenderId: "748224838188",
  appId: "1:748224838188:web:c4fc2a285aa72228646f89",
  measurementId: "G-905KGWWQBG"
};

const app = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

export const auth = getAuth(app);