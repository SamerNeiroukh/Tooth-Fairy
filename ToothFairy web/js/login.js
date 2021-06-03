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

// hide the divs of make an apointmant, forgot password and logout
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
    .then(async function (firebaseUser) {
      // alert (await check_User_permission(firebaseUser.user.uid))

      // check if user have permission to login
      if ((await check_User_permission(firebaseUser.user.uid)) == false) {
        document.getElementById("lemail").value = "";
        document.getElementById("lpass").value = "";
        alert("מנהל עדיין לא אישר משתמש זה ");
        return;
      } else {
        firebase.auth().signup;

        if (userEmail == "my.tooth.fairy0@gmail.com") {
          window.location.href = "adminPanel.html";
        }

        // delete the filds of login in the html
        else if ($("#booking").show() && $("#logOutButton").show()) {
          $("#booking").show();
          $("#logOutButton").show();
          $("#forgotpass").hide();
          $("#Log").hide();
          document.getElementById("lemail").value = "";
          document.getElementById("lpass").value = "";
        }
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
        alert("לא קיים משתמש זה במערכת");
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

// return user permission by uid
function check_User_permission(uid) {
  var starCountRef = firebase
    .database()
    .ref("Users/" + uid + "/User_permission");
  return new Promise((rsolve, reject) => {
    starCountRef.on("value", (snapshot) => {
      // alert(snapshot.val())
      rsolve(snapshot.val());
    });
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

// add appointamt to fire store of social workers
function addAppointment() {
  // create apointmant in firebase realtime database
  let storageRef = firebase
    .database()
    .ref("Apointamnts/")
    .push({
      swname: $("#swname").val(),
      pname: $("#pname").val(),
      swemail: $("#swemail").val(),
      swphone: $("#swphone").val(),
      cmessage: $("#cmessage").val(),
      bookdate: $("#bookdate").val(),
      bookHour: $("#book_hour").val(),
      apintmant_aprov: false,
      apointmant_id: "temp",
    })
    .then((data) => {
      // add the apointmant id
      let updates = {};
      updates["Apointamnts/" + data.key + "/apointmant_id"] = data.key;
      firebase.database().ref().update(updates);

      $("#swname").val("");
      $("#pname").val("");
      $("#swemail").val("");
      $("#swphone").val("");
      $("#cmessage").val("");
      $("#bookdate").val("");
      $("#book_hour").val(""),

      alert("בקשתך נקלטה במערכת - אנא חכה לאישור או ביטול התור במייל")
    })
    .catch((error) => {
      // delete all the filds in the form in the html
      $("#swname").val("");
      $("#pname").val("");
      $("#swemail").val("");
      $("#swphone").val("");
      $("#cmessage").val("");
      $("#bookdate").val("");
    });
}
