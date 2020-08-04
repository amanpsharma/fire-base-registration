import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyC8MuLj-kEhPQuipTg8ylpyjpwR7l1SRmM",
  authDomain: "react-crud-279712.firebaseapp.com",
  databaseURL: "https://react-crud-279712.firebaseio.com",
  projectId: "react-crud-279712",
  storageBucket: "react-crud-279712.appspot.com",
  messagingSenderId: "370281143900",
  appId: "1:370281143900:web:7219c958b6d8a35a9bd099",
};
// Initialize Firebase
var fireDB = firebase.initializeApp(firebaseConfig);
export default fireDB.database().ref();
