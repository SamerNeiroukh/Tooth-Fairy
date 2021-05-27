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

// onload = function init() {
//   $("#manage_appointments").show();

// }

// *****************************

// יש כבר הכנה לכל הפונקציות שצריכות להיות, לכתוב רק בתוך הדיבים והפונקציות שכבר הכנו !

// ******************************
function welcomeAdmin() {
  $("#manageSW").hide();
  $("#img_manage").hide();
  $("#manageStories").hide();
  $("#manage_appointments").hide();
  $("welcome").show();
}

function manageGallery() {
  $("#manageStories").hide();
  $("#manageSW").hide();
  $("#manage_appointments").hide();
  $("welcome").hide();
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

    // get the image from the text box
    ImgName = document.getElementById("namebox").value;
    let uploadTask = firebase
      .storage()
      .ref("Images/" + ImgName + ".png")
      .put(files[0]);

    // upload the image to the firebase storege
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

  // get all images from the firebase
  function getImagesToDelete() {
    let rootref = firebase.database().ref().child("Pictures");

    rootref.on("child_added", (snap) => {
      let image = snap.child("Link").val();
      let imageName = snap.child("Name").val();

      let str = 
        `<a> בבקשה לחץ בבקשה על התמונה שברצונך למחוק</a> <div> <button id="${imageName}"` +
        "onclick=deleteImg('" +
        imageName +
        "')" +
        `> <img src= ${image} style="width:100px" style="height:100px"></img> </button></div>`;

      $("#delete_imgs").append(str);
    });
  }

  // delete images from firebase storage and data of image from firebase realtime database
  function deleteImg(imageName) {
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
  }


// manage appointments
function manageAppo() {
  //ניהול תורים
  $("#img_manage").hide();
  $("#manageStories").hide();
  $("#welcome").hide();
  $("#manageSW").hide();
  $("#manage_appointments").show();
}

// manage new social workers
function manageSocialWorkers() {
  $("#img_manage").hide();
  $("#manageStories").hide();
  $("#welcome").hide();
  $("#manage_appointments").hide();
  $("#manageSW").show();
}

// manage personal stories
function managePersonalStories() {
  $("#img_manage").hide();
  $("#manageSW").hide();
  $("#welcome").hide();
  $("#manage_appointments").hide();
  $("#manageStories").show();
}
// logout admin
function logout() {
  // var rootRef = firebase.database().ref();
  var loggedInUser = firebase.auth();
  firebase.auth().signOut();
  alert("החשבון התנתק");
  window.location.href = "index.html";
}
