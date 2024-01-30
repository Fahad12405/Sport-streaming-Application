import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBr_fke20elsOa_fxaLAmsvx6ZhNFURT2M",
  authDomain: "clone-a335a.firebaseapp.com",
  projectId: "clone-a335a",
  storageBucket: "clone-a335a.appspot.com",
  messagingSenderId: "435000774063",
  appId: "1:435000774063:web:943247a707415fc140f35a",
  measurementId: "G-267KSSWZDJ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

try {
  // const firebaseApp = firebase.initializeApp(firebaseConfig);
  console.log("Firebase initialized successfully");
  // Rest of the initialization code
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

export { auth, provider, storage };
export default db;
