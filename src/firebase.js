
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyB0hyupm_y6_WYYGm1prq1sLBbq89phX5s',
    authDomain: 'react-messenger-62ce7.firebaseapp.com',
    databaseURL: 'http://react-messenger-62ce7.firebaseio.com',
    projectId: 'react-messenger-62ce7',
    storageBucket: 'react-messenger-62ce7.appspot.com',
    messagingSenderId: '416061635243',
    appId: '1:416061635243:web:815ded1e1edb83bc6c95ee',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };