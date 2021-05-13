
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




firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login(){
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
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
