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
  $("#booking").hide();
  $("#forgotpass").hide();
  $("#logOutButton").hide();
});

function login() {
  var userEmail = document.getElementById("lemail").value;
  var userPass = document.getElementById("lpass").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(userEmail, userPass)

    // success to log in
    .then(function (firebaseUser) {
      $("#booking").show();
      $("#logOutButton").show();
      $("#forgotpass").hide();
      $("#Log").hide();

      firebase.auth().signup;

      if ($("#booking").show() && $("#logOutButton").show()) {
        addAppointment()
        document.getElementById("lemail").value = "";
        document.getElementById("lpass").value = "";
      }

    })

    // not success to log in
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // window.alert("Error : " + errorMessage);

      // check if user exsist.

      // case is not exsist in the system return
      if (
        errorMessage ===
        "There is no user record corresponding to this identifier. The user may have been deleted."
      ) {
        alert("לא קיים משתמש זה במערכת")
        document.getElementById("lemail").value = "";
        document.getElementById("lpass").value = "";
        return;
      }

      // case exsist open a forgat password div
      else {
        document.getElementById("lemail").value = "";
        document.getElementById("lpass").value = "";

        $("#forgotpass").show();
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
      // window.alert("Error : " + errorMessage);
    });
}

// logout user
function logout() {
  // var rootRef = firebase.database().ref();
  var loggedInUser = firebase.auth();
  firebase.auth().signOut();
  alert("החשבון התנתק");
  window.location.href = "index.html";
}

//
function addAppointment() {
  let db = firebase.firestore();
  db.collection(firebase.auth().currentUser.email).add
  db.collection(firebase.auth().currentUser.email)
    .doc()
    .set({
      swname: $("#swname").val(),
      pname: $("#pname").val(),
      swemail: $("#swemail").val(),
      swphone: $("#swphone").val(),
      cmessage: $("#cmessage").val(),
      bookdate: $("#bookdate").val(),
    })
    .then((docRef) => {
      alert(
        "firebase.auth().currentUser: " + firebase.auth().currentUser.email
      );
      document.getElementById("swname").value = "";
      document.getElementById("pname").value = "";
      document.getElementById("swemail").value = "";
      document.getElementById("swphone").value = "";
      document.getElementById("cmessage").value = "";
      document.getElementById("bookdate").value = "";
    })
    .catch((error) => {
      alert("Error adding document: ", error);

      document.getElementById("swname").value = "";
      document.getElementById("pname").value = "";
      document.getElementById("swemail").value = "";
      document.getElementById("swphone").value = "";
      document.getElementById("cmessage").value = "";
      document.getElementById("bookdate").value = "";
    });
}
