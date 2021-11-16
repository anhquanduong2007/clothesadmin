import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCWE91WuSCtZpDVq4EChRcx1dh1jaiZ_5s",
  authDomain: "clothesshop-62278.firebaseapp.com",
  projectId: "clothesshop-62278",
  storageBucket: "clothesshop-62278.appspot.com",
  messagingSenderId: "294465165472",
  databaseURL: 'gs://clothesshop-62278.appspot.com',
  appId: "1:294465165472:web:d43e999afa5c446ab991c5",
  measurementId: "G-BHY6RHCYD8"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export {app,storage};