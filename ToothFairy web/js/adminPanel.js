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

// import * as admin from 'firebase-admin';
// const serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://toothfairyweb-6be63-default-rtdb.firebaseio.com"
// });

$(document).ready(function () {
  $("#manageAcounts").hide();
  $("#img_manage").hide();
  $("#manageStories").hide();
  $("#manage_appointments").hide();
  $("#hide_div").show();
  $("#welcome").show();
});

function manageGallery() {
  $("#welcome").hide();
  $("#manageStories").hide();
  $("#manageAcounts").hide();
  $("#manage_appointments").hide();
  $("#hide_div").show();
  $("#img_manage").show();
}

let ImgName, ImgUrl;
let files = [];
let reader;

// select image from pc
document.getElementById("select").onclick = function (e) {
  let input = document.createElement("input");
  input.type = "file";

  input.onchange = (e) => {
    files = e.target.files;
    reader = new FileReader();
    reader.onload = function () {
      document.getElementById("myimg").src = reader.result;
    };
    reader.readAsDataURL(files[0]);
  };
  input.click();
};

// upload image to the firebase storege
document.getElementById("upload").onclick = function () {
  // case not selected name for the image return
  if (!$("#namebox").val()) {
    alert("נא לבחור שם לתמונה");
    return;
  }

  // upload the image to the firebase storege
  ImgName = document.getElementById("namebox").value;
  let uploadTask = firebase
    .storage()
    .ref("Images/" + ImgName + ".png")
    .put(files[0]);

  // show % of upload
  uploadTask.on(
    "state_changed",
    function (snapshot) {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      document.getElementById("UpProgress").innerHTML =
        "Upload " + progress + "%";
    },

    function (error) {
      alert("error to upload img");
    },

    // upload the image ditails to firebase database of the image
    function () {
      uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
        ImgUrl = url;

        firebase
          .database()
          .ref("Pictures/" + ImgName)
          .set({
            Name: ImgName,
            Link: ImgUrl,
          });
        alert("תמונה עלתה בהצלחה");
      });
    }
  );
};

// get all images from the firebase and show the admin the images to delete
function getImagesToDelete() {
  // reset div
  let div = document.getElementById("delete_imgs");
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
  // run on all the data in the realtime database in filde Pictures
  let rootref = firebase.database().ref().child("Pictures");
  rootref.on("child_added", (snap) => {
    let image = snap.child("Link").val();
    let imageName = snap.child("Name").val();

    let str = `<div> <button id="${imageName}" onclick="deleteImg('${imageName}')"> <img src= ${image} style="width:100px" style="height:100px"></img> </button></div>`;

    $("#delete_imgs").append(str);
  });
}

// delete images from firebase storage and data of image from firebase realtime database
function deleteImg(imageName) {
  if (confirm("האם אתה בטוח שברצונך למחוק תמונה זו?")) {
    // delete image from firebase storage
    firebase
      .storage()
      .ref("Images/" + imageName + ".png")
      .delete();

    // delete data of image from firebase realtime database
    firebase.database().ref("Pictures").child(imageName).remove();

    // reset div
    let div = document.getElementById("delete_imgs");
    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }
    // call back to all images
    getImagesToDelete();
  } else {
    return;
  }
}

// manage appointments
function manageAppo() {
  $("#img_manage").hide();
  $("#manageStories").hide();
  $("#welcome").hide();
  $("#manageAcounts").hide();
  $("#hide_div").hide();
  $("#manage_appointments").show();

  rest_apointmant_div()
  get_all_apointamnts()
}

// manage new social workers
function manageAccounts() {
  $("#img_manage").hide();
  $("#manageStories").hide();
  $("#welcome").hide();
  $("#manage_appointments").hide();
  $("#hide_div").show();
  $("#manageAcounts").show();

  rest_users_div();
  get_all_users();
}

// manage personal stories
function managePersonalStories() {
  $("#img_manage").hide();
  $("#manageAcounts").hide();
  $("#welcome").hide();
  $("#manage_appointments").hide();
  $("#manageStories").show();
}

// add story to realtime database firebase
function up_story() {
  if (!$("#headline").val()) {
    alert("נא לבחור כותרת");
    return;
  } else if (!$("#story_msg").val()) {
    alert("נא להוסיף מלל");
    return;
  }

  let title = $("#headline").val();
  let story = $("#story_msg").val();

  // add story to realtime database firebase
  firebase
    .database()
    .ref("Stories/" + title)
    .set({
      story_title: title,
      story_content: story,
    });

  // test()
  alert("סיפור אישי עלה בהצלחה");

  // reset values of the textbox
  $("#headline").val("");
  $("#story_msg").val("");
}

// get all Stories from the firebase and show the admin the Stories to delete
function getStoriesToDelete() {
  // reset div
  let div = document.getElementById("delete_stories");
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }

  // run on all the data in the realtime database in filde Pictures
  let rootref = firebase.database().ref().child("Stories");
  rootref.on("child_added", (snap) => {
    let title = snap.child("story_title").val();
    let story = snap.child("story_content").val();

    let str = `<div> <button class = "story_buttons" id="${title}"
      onclick="delete_story('${title}')"> <p dir="rtl"><h6 dir="rtl">כותרת הסיפור: ${title} </br></h6></p> <p dir="rtl"><b dir="rtl">תוכן הסיפור: </b><br> ${story} </p> </button></div>`;

    $("#delete_stories").append(str);
  });
}

// delete story from realtime database firebase
function delete_story(storyName) {
  if (confirm("האם אתה בטוח שברצונך למחוק סיפור זה?")) {
    firebase.database().ref("Stories").child(storyName).remove();

    // reset div
    let div = document.getElementById("delete_stories");
    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }
    getStoriesToDelete();
  } else {
    return;
  }
}

function rest_users_div() {
  // reset div
  let div = document.getElementById("get_all_users");
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
}
// get all users from the firebase
function get_all_users() {
  let str;

  // run on all the data in the realtime database in filde Pictures
  let rootref = firebase.database().ref().child("Users");
  
  let table = `<table dir="rtl">
  <tr>
  <th align="center"><h6> מייל המשתמש </h6></th>
  <th> <h6> חשבון מואשר\ לא מואשר </h6> </th>
  <th> <h6> אשר חשבון </h6> </th>
  </tr>`;
  $("#get_all_users").append(table);


  rootref.on("child_added", (snap) => {
    let verification = snap.child("User_permission").val();
    let UserEmail = snap.child("User_email").val();
    let userUid = snap.child("user_uid").val();

    if (verification == false) {
      verification = "חשבון לא מאושר";



      let str = ` <table dir="rtl"> <tr>
      <th align="center">${UserEmail}</th>
      <th>${verification}</th>
      <th><button class = ""
        onclick="verification_user('${userUid}')"
        > לחץ כאן כדי לאשר חשבון
      </th>
      </tr>`;

      $("#get_all_users").append(str);
    }
  });
}

// update User permission to be true
function verification_user(user_uid) {
  let updates = {};
  updates["Users/" + user_uid + "/User_permission"] = true;
  firebase.database().ref().update(updates);


  alert("חשבון אושר");

  // reset div
  let div = document.getElementById("get_all_users");
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
  get_all_users()
  return;
}



function rest_users_div() {
  // reset div
  let div = document.getElementById("get_all_users");
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
}

// get all Stories from the firebase and show the admin the Stories to delete
function get_all_apointamnts() {
  let str;
  
  let table = `<table dir="rtl">
  <tr>
  <th> <h6> שם העו"ס </h6></th>
  <th> <h6> שם המטופל </h6> </th>
  <th> <h6> דואר אלקטרוני עו"ס </h6> </th>
  <th> <h6> טלפון העו"ס </h6> </th>
  <th> <h6> תאריך </h6> </th>
  <th> <h6> הודעה </h6> </th>
  <th> <h6> מחיקת פגישה </h6> </th>
  <th> <h6> אישור פגישה </h6> </th>


  </tr>`;

  $("#apointmants_table").append(table);

  // run on all the data in the realtime database in filde Pictures
  let rootref = firebase.database().ref().child("Apointamnts");

  rootref.on("child_added", (snap) => {
    let worker_name = snap.child("swname").val();
    let patient_name = snap.child("pname").val();
    let worker_email = snap.child("swemail").val();
    let worker_phone = snap.child("swphone").val();
    let date = snap.child("bookdate").val();
    let msg = snap.child("cmessage").val();
    let apointmant_uid = snap.child("apointmant_id").val();

      let str = ` <table dir="rtl"> <tr>
      <th align="center">${worker_name}</th>
      <th>${patient_name}</th>
      <th>${worker_email}</th>
      <th>${worker_phone}</th>
      <th>${date}</th>
      <th>${msg}</th>
      

      <th><button class = ""
        onclick="delete_apointmant('${apointmant_uid}')"
        > לחץ כאן כדי למחוק תור
      </th>
      </tr>
      <th><button class = ""
      onclick="approve_apointmant('${apointmant_uid}')"
      > לחץ כאן כדי לאשר תור
    </th>
    </tr>`;

      $("#apointmants_table").append(str);
  });
}

function rest_apointmant_div() {
  // reset div
  let div = document.getElementById("apointmants_table");
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
}

function delete_apointmant(apointmant_uid)
{
  if (confirm("האם אתה בטוח שברצונך למחוק תור זה?")) {
    firebase.database().ref("Apointamnts").child(apointmant_uid).remove();

    // reset div
    let div = document.getElementById("apointmants_table");
    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }

    get_all_apointamnts();
  } else {
    return;
  }
}


// logout admin
function logout() {
  // var rootRef = firebase.database().ref();
  var loggedInUser = firebase.auth();
  firebase.auth().signOut();
  alert("החשבון התנתק");
  window.location.href = "index.html";
}
