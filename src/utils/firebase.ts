// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: 'react-chasethepig.firebaseapp.com',
  projectId: 'react-chasethepig',
  storageBucket: 'react-chasethepig.appspot.com',
  messagingSenderId: '100368249641',
  appId: '1:100368249641:web:318613d0e337ad412bbd38',
  measurementId: 'G-R9VSGKWKPE',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
