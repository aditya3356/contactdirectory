import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAvObbQ50MF0XGuvUtxom6FI10kaLEyrgg",
    authDomain: "contactdirectory-c2480.firebaseapp.com",
    projectId: "contactdirectory-c2480",
    storageBucket: "contactdirectory-c2480.appspot.com",
    messagingSenderId: "886225646236",
    appId: "1:886225646236:web:2cc48817f588cb972a7359"
};
  
firebase.initializeApp(firebaseConfig);

export default firebase;