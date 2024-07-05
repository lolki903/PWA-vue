import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBGGyzdgKS_eGTKwCxKbavoZzC0sMwcL0Q",
  authDomain: "intrepid-abacus-366512.firebaseapp.com",
  projectId: "intrepid-abacus-366512",
  storageBucket: "intrepid-abacus-366512.appspot.com",
  messagingSenderId: "461005697758",
  appId: "1:461005697758:web:f85067a87fea8dd849084f",
  measurementId: "G-Q4MNGV634N"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };