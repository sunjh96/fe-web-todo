import firebase from 'firebase/compat/app';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD0ytLm5iwrNq4sKJpaW87Gvk_1ebBaGTU',
  authDomain: 'todo-4684b.firebaseapp.com',
  projectId: 'todo-4684b',
  storageBucket: 'todo-4684b.appspot.com',
  messagingSenderId: '436164476586',
  appId: '1:436164476586:web:de0ecaadd3fc93eaaf5ad3',
};

firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
