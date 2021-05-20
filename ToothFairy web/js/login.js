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
    measurementId: "G-GTMX6JLZCJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();



//   firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//     //   alert("user logd in 1")
//       $('.element').attr('href', "/booking.html");
//     } else {
//       alert("user not logd in")
//     }
//   });

function send_mail(){
  window.open('mailto:dvir563@gmail.com?subject=test&body=test');
}

  function login(){
    var userEmail = document.getElementById("lemail").value;
    var userPass = document.getElementById("lpass").value;
  
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
    .then(function(firebaseUser) {
        // alert("user logd in 2")
        window.location.href = "booking.html"

      ffirebase.auth().signup


    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
  
      window.alert("Error : " + errorMessage);
  
      // ...
    });
  
  }

function logout(){
  firebase.auth().signOut();
}
