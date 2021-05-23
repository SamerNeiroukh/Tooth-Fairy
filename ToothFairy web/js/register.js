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
  var x = document.getElementById("user_exsist");
  x.style.display = "none";
});


function reg() {
  let userEmail = document.getElementById("remail").value;
  let secUserEmail = document.getElementById("secremail").value;

  let userPass = document.getElementById("rpass").value;
  let secUserPass = document.getElementById("secrpass").value;

  // case the Email and password is not the same in all the textboxs
  if (userEmail != secUserEmail || userPass != secUserPass) {
    alert("מייל או סיסמה לא נכונים");
    return;
  }

  // case user didnt press the checkbox
  else if (!document.getElementById("rterms").checked) {
    // alert("check box")
    return;
  }

  // case user already exsist
  firebase
    .auth()
    .signInWithEmailAndPassword(userEmail, userPass)
    .then(function (firebaseUser) {
      alert("משתמש כבר קיים");


        var x = document.getElementById("user_exsist");
        x.style.display = "block";
      return;
    });

  // make a new user
  firebase
    .auth()
    .createUserWithEmailAndPassword(userEmail, userPass)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      alert("משתמש נוצר בהצלחה");
      window.location.href = "index.html";
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
}

function log()
{
  window.location.href = "login.html";
}

