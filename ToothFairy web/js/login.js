
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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




$(document).ready(function () {
  let x = document.getElementById("forgotpass");
  let y = document.getElementById("booking");
  let h = document.getElementById("logOutButton");
  h.style.display = "none";
  x.style.display = "none";
  y.style.display = "none";
});


function login() {
  var userEmail = document.getElementById("lemail").value;
  var userPass = document.getElementById("lpass").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(userEmail, userPass)
    .then(function (firebaseUser) {
      // alert("user logd in 2")
      // window.location.href = "booking.html";
      let y = document.getElementById("booking");
      let x = document.getElementById("forgotpass");
      let z = document.getElementById("Log");
      let h = document.getElementById("logOutButton");

      y.style.display = "block";
      h.style.display = "block";
      x.style.display = "none";
      z.style.display = "none";

      firebase.auth().signup;
      
      addAppointment()

    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error : " + errorMessage);

      // check if user exsist. 

      // case is not exsist in the system return
      if( errorMessage === "There is no user record corresponding to this identifier. The user may have been deleted.")
      {
        document.getElementById("lemail").value = ""
        document.getElementById("lpass").value = ""
        return;
      }

      // case exsist open a forgat password div
      else{
        document.getElementById("lemail").value = ""
        document.getElementById("lpass").value = ""

        var x = document.getElementById("forgotpass");
        x.style.display = "block";
      }

      // ...
    });
}

// sent email to change password
function forgotpass() {
  let email = $("#reset_email").val();
  let auth = firebase.auth();
  

  auth
    .sendPasswordResetEmail(email)
    .then(function () {
      alert("מייל לשינוי סיסמה נשלח");
      window.location.href = "index.html";
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error : " + errorMessage);
    });
}


// logout user
function logout() {
  var rootRef = firebase.database().ref();
  var loggedInUser = firebase.auth();
  firebase.auth().signOut();
  alert("החשבון התנתק");
  // window.location.href = "index.html";
  let y = document.getElementById("booking");
  let x = document.getElementById("forgotpass");
  let z = document.getElementById("Log");
  let h = document.getElementById("logOutButton");

  y.style.display = "none";
  h.style.display = "none";
  x.style.display = "none";
  z.style.display = "block";
}

// 
function addAppointment() {
  let db = firebase.firestore();
  db.collection("Patients").doc(firebase.auth().currentUser.email)
    .set({
      swname: $("#swname").val(),
      pname: $("#pname").val(),
      swemail: $("#swemail").val(),
      swphone: $("#swphone").val(),
      cmessage: $("#cmessage").val(),
      bookdate: $("#bookdate").val(),

    })
    .then((docRef) => {
      alert("firebase.auth().currentUser: " + firebase.auth().currentUser.email)
      // alert("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      alert("Error adding document: ", error);
    });
}



