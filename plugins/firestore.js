import firebase from "firebase/app";
import "firebase/firestore";

if (!firebase.apps.length) {
  var config = {
		apiKey: "AIzaSyAwvami0C3twhqrhaBQP0D9PhR85Xf5FTA",
		authDomain: "nuxtnews-eb7c5.firebaseapp.com",
		databaseURL: "https://nuxtnews-eb7c5.firebaseio.com",
		projectId: "nuxtnews-eb7c5",
		storageBucket: "nuxtnews-eb7c5.appspot.com",
		messagingSenderId: "232685664575",
		appId: "1:232685664575:web:0dd32b8f4425b693533b8a",
		measurementId: "G-QP100ZHS47"
  };
  firebase.initializeApp(config);
  firebase.firestore().settings({
    timestampsInSnapshots: true
  });
}

const db = firebase.firestore();

export default db;
