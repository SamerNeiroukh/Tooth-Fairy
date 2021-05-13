const { default: firebase } = require("./firebase");

var firebaseConfig = {
    apiKey: "AIzaSyD5B3hTjXXygIi62Sb9pyiolRAaR7moR0E",
    authDomain: "tooth-fairy-web.firebaseapp.com",
    databaseURL: "https://tooth-fairy-web-default-rtdb.firebaseio.com",
    projectId: "tooth-fairy-web",
    storageBucket: "tooth-fairy-web.appspot.com",
    messagingSenderId: "473402834454",
    appId: "1:473402834454:web:511aea6ff025a2c5817f37",
    measurementId: "G-3KF2SC8288"
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

  function login(){
    var userEmail = document.getElementById("lemail").value;
    var userPass = document.getElementById("lpass").value;
  
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
    .then(function(firebaseUser) {
        // alert("user logd in 2")
        // window.location.href = "booking.html"

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
