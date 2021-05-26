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
  if(!$('#namebox').val())
  {
    alert("נא לבחור שם לתמונה")
    return
  }

  // get the image from the text box
  ImgName = document.getElementById("namebox").value;
  let uploadTask = firebase
    .storage()
    .ref("Images/" + ImgName + ".png")
    .put(files[0]);

  // upload the image to the firebase storege 
  uploadTask.on(
    'state_changed',
    function (snapshot) {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      document.getElementById('UpProgress').innerHTML =
        'Upload ' + progress + '%';
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
          .ref('Pictures/' + ImgName)
          .set({
            Name: ImgName,
            Link: ImgUrl,
          });
          alert("תמונה עלתה בהצלחה");
        }
      );
    });
}


// get img from database by name
// document.getElementById('retrieve').onclick = function(){
//   ImgName = document.getElementById('namebox').value;
//   firebase.database().ref('Pictures/' + ImgName).on('value', function(snapshot){
//     document.getElementById('myimg').src = snapshot.val().Link;
//   });
// }


// firebase.database().ref('Pictures/' + ImgUrl).on('value', function(snapshot){
//   document.getElementById('myimg').src = snapshot.val().Link;
// });


// logout admin
function logout() {
  // var rootRef = firebase.database().ref();
  var loggedInUser = firebase.auth();
  firebase.auth().signOut();
  alert("החשבון התנתק");
  window.location.href = "index.html";
}