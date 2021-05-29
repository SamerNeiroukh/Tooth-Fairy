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


// var admin = require('firebase-admin');
// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://toothfairyweb-6be63-default-rtdb.firebaseio.com"
// });



$(document).ready(function () {
  $("#manageAcounts").hide();
  $("#img_manage").hide();
  $("#manageStories").hide();
  $("#manage_appointments").hide();
  $("#welcome").show();
});

function manageGallery() {
  $("#welcome").hide();
  $("#manageStories").hide();
  $("#manageAcounts").hide();
  $("#manage_appointments").hide();
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

    let str =
      `<div> <button id="${imageName}" onclick="deleteImg('${imageName}')"> <img src= ${image} style="width:100px" style="height:100px"></img> </button></div>`;

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
  $("#manage_appointments").show();

  let str =
    "<thead class='thead-dark'>" +
    "<tr><th scope='col'>פרטים נוספים</th><th scope='col'>תאריך התור</th>";
  str +=
    "<th scope='col'>שם המטופל</th><th scope='col'>מייל העוס/ית</th><th scope='col'>טלפון העוס/ית</th><th scope='col'>שם העוס/ית</th></tr></thead>";

  //   var database = firebase.database().ref().child('toothfairyweb-6be63');
  //   database.once('value', function(snapshot){
  //       if(snapshot.exists()){
  //           var content = '';

  //           snapshot.forEach(function(data){
  //               var Email = data[snapshot].swname.val();
  //               // var Name = data.val().Name;
  //               // var Phone = data.val().Phone;
  //               alert(Email);
  //               // content += '<tr>';
  //               // content += '<td>' + Email + '</td>'; //column1
  //               // content += '<td>' + Name + '</td>';//column2
  //               // content += '<td>' + Phone + '</td>';//column2
  //               // content += '</tr>';
  //   });

  //   str+=content;
  //     // $('#ex-table').append(content);
  // }
  // });

  //   // let db = firebase.firestore();
  //   // const admin =  require(firebase-admin);
  //   // const db = admin.firestore();

  //   // db.listCollections()
  //   // .then(snapshot=>{
  //   //     snapshot.forEach(snaps=>{
  //   //         console.log("may");  // GET LIST OF ALL COLLECTIONS
  //   //     })
  //   // })
  //   // .catch(error=>console.log(error));
  //   //snaps["_queryOptions"].collectionId
  //   // var docRef = db.collection().doc("SF");

  //   // docRef.get().then((doc) => {
  //   //     if (doc.exists) {
  //   //         console.log("Document data:", doc.data());
  //   //     } else {
  //   //         // doc.data() will be undefined in this case
  //   //         console.log("No such document!");
  //   //     }
  //   // }).catch((error) => {
  //   //     console.log("Error getting document:", error);
  //   // });

  //   {/* <tbody>
  //   <tr>
  //     <th scope="row">1</th>
  //     <td>Mark</td>
  //     <td>Otto</td>
  //     <td>@mdo</td>
  //   </tr>
  //   <tr>
  //     <th scope="row">2</th>
  //     <td>Jacob</td>
  //     <td>Thornton</td>
  //     <td>@fat</td>
  //   </tr>
  //   <tr>
  //     <th scope="row">3</th>
  //     <td>Larry</td>
  //     <td>the Bird</td>
  //     <td>@twitter</td>
  //   </tr>
  // </tbody>
  // </table>

  // <table class="table">
  // <thead class="thead-light">
  //   <tr>
  //     <th scope="col">#</th>
  //     <th scope="col">First</th>
  //     <th scope="col">Last</th>
  //     <th scope="col">Handle</th>
  //   </tr>
  // </thead>
  // <tbody>
  //   <tr>
  //     <th scope="row">1</th>
  //     <td>Mark</td>
  //     <td>Otto</td>
  //     <td>@mdo</td>
  //   </tr>
  //   <tr>
  //     <th scope="row">2</th>
  //     <td>Jacob</td>
  //     <td>Thornton</td>
  //     <td>@fat</td>
  //   </tr>
  //   <tr>
  //     <th scope="row">3</th>
  //     <td>Larry</td>
  //     <td>the Bird</td>
  //     <td>@twitter</td>
  //   </tr>
  // </tbody>"; */}

  $(".table").append(str);
}

// manage new social workers
function manageSocialWorkers() {
  $("#img_manage").hide();
  $("#manageStories").hide();
  $("#welcome").hide();
  $("#manage_appointments").hide();
  $("#manageAcounts").show();
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

    let str =
      `<div> <button class = "story_buttons" id="${title}"
      onclick="delete_story('${title}')"> <p dir="rtl"><h6 dir="rtl">כותרת הסיפור: ${title} </br></h6></p> <p dir="rtl"><b dir="rtl">תוכן הסיפור: </b><br> ${story} </p> </button></div>`;

    $("#delete_stories").append(str);
  });
}

// delete story from realtime database firebase
function delete_story(storyName) {
  alert(storyName);
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

// get all Stories from the firebase and show the admin the Stories to delete
function get_all_users() {
  // reset div
  let div = document.getElementById("get_all_users");
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }

  let str;

  // run on all the data in the realtime database in filde Pictures
  let rootref = firebase.database().ref().child("Users");

  rootref.on("child_added", (snap) => {
    let verification = snap.child("Email_verification").val();
    let UserEmail = snap.child("User_email").val();
    let userUid = snap.child("user_uid").val();

    if (verification == true) {
      verification = "חשבון מאושר";
    } else if (verification == false) {
      verification = "חשבון לא מאושר";
    }

    let table = `<table dir="rtl">
    <tr>
    <th align="center">מייל המשתמש</th>
    <th>חשבון מואשר\ לא מואשר</th>
    <th>אשר חשבון</th>
    <th>מחק חשבון</th>
    </tr>`;

    let str =
      `<tr>
    <th align="center">${UserEmail}</th>
    <th>${verification}</th>
    <th><button class = "" ` +
      "onclick=verification_user('" +
      UserEmail +
      "')" +
      `> לחץ כאן כדי לשלוח מייל לאישור
    </th>
    <th> <button class = "" ` +
      "onclick=delete_user('" +
      userUid +
      "')" +
      `> לחץ כאן למחיקת חשבון</th>
    </tr>`;

    $("#get_all_users").append(table + str);
  });
}

function delete_user(userUid) {
    alert("userUid: " + userUid);
    admin
    .auth()
    .deleteUser(uid)
    .then(() => {
      console.log('Successfully deleted user');
    })
    .catch((error) => {
      console.log('Error deleting user:', error);
    });
  }
  
  function verification_user(UserEmail) {
    alert("verification_user");
  
    // send Email Verification
    var user = firebase.auth().currentUser;
  
    UserEmail.sendEmailVerification()
      .then(function () {
        // Email sent.
      })
      .catch(function (error) {
        // An error happened.
      });
  }


// logout admin
function logout() {
  // var rootRef = firebase.database().ref();
  var loggedInUser = firebase.auth();
  firebase.auth().signOut();
  alert("החשבון התנתק");
  window.location.href = "index.html";
}
