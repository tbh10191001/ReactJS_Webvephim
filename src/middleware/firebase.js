import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyBxS1OiRtqx1xZnwAPT-9-y8V0bpGbA08I',
    authDomain: 'nodejs-filmimg.firebaseapp.com',
    projectId: 'nodejs-filmimg',
    storageBucket: 'nodejs-filmimg.appspot.com',
    messagingSenderId: '49463311695',
    appId: '1:49463311695:web:7be4c124b5b0947396593a',
    measurementId: 'G-Y73Q80YPS2',
};

export const firebase = initializeApp(firebaseConfig);
export const storage = getStorage();
