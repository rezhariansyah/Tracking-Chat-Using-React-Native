import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyDe_ZSWi5RB6XhvB3bNrn73iAi_x0sQVPM',
  authDomain: 'tracking-chat-6cead.firebaseapp.com',
  databaseURL: 'https://tracking-chat-6cead.firebaseio.com',
  projectId: 'tracking-chat-6cead',
  storageBucket: '',
  messagingSenderId: '100297090534',
  appId: '1:100297090534:web:4ebf5b2da2204fe1',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
