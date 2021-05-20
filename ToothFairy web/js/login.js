// const { default: firebase } = require("./firebase");

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
  var x = document.getElementById("forgotpass");
  x.style.display = "none";
});

//   firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//     //   alert("user logd in 1")
//       $('.element').attr('href', "/booking.html");
//     } else {
//       alert("user not logd in")
//     }
//   });

function send_mail() {
  window.open("mailto:dvir563@gmail.com?subject=test&body=test");
}

function login() {
  var userEmail = document.getElementById("lemail").value;
  var userPass = document.getElementById("lpass").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(userEmail, userPass)
    .then(function (firebaseUser) {
      // alert("user logd in 2")
      window.location.href = "booking.html";

      ffirebase.auth().signup;
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

// logout user
function logout() {
  firebase.auth().signOut();
}

// sent email to change password
function forgotpass() {
  let email = $("#reset_email").val();
  let auth = firebase.auth();
  

  auth
    .sendPasswordResetEmail(email)
    .then(function () {
      alert("Email as been sent");
      window.location.href = "index.html";
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error : " + errorMessage);
    });
}


// make a contact
function csubmitForm() {
  // initiate variables with form content
  var name = $("#cname").val();
  var emailUser = $("#cemail").val();
  var message = $("#cmessage").val();
  var terms = $("#cterms").val();
  var toothEmail = "my.tooth.fairy0@gmail.com";
  //var ander = "מ%0D" + emailUser + message

  // *********** //
  window.open(
    "mailto:my.tooth.fairy0@gmail.com?subject=יצירת קשר  - " +
      name +
      "&body=מייל לחזרה: " +
      emailUser +
      "%0d" +
      "%0d" +
      message +
      "%0d"
  );

  // *********** //
}
