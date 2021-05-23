
var firebaseConfig = {
  apiKey: "AIzaSyC9_qCGYu6YdTVNCxGHnV8T0SETnGyo8Qs",
  authDomain: "toothfairyweb-6be63.firebaseapp.com",
  projectId: "toothfairyweb-6be63",
  storageBucket: "toothfairyweb-6be63.appspot.com",
  messagingSenderId: "854109357498",
  appId: "1:854109357498:web:e25bc99d544db5b31bc983",
  measurementId: "G-GTMX6JLZCJ",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


// logout user
function logout() {
  var rootRef = firebase.database().ref();
  var loggedInUser = firebase.auth();
  firebase.auth().signOut();
  alert("החשבון התנתק");
  window.location.href = "index.html";
}

function addAppointment() {
  var db = firebase.firestore();
  alert("firebase.auth().currentUser: " + firebase.auth().currentUser)
  db.collection("Patients")
    .add({
      swname: $("#swname").val(),
      pname: $("#pname").val(),
      swemail: $("#swemail").val(),
      swphone: $("#swphone").val(),
      cmessage: $("#cmessage").val(),
      bookdate: $("#bookdate").val(),

    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}
