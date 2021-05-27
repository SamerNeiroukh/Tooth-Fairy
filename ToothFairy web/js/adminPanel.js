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

$( document ).ready(function() {
  $("#manageSW").hide();
  $("#img_manage").hide();
  $("#manageStories").hide();
  $("#manage_appointments").hide();
  $("welcome").show();
});


// function welcomeAdmin() {
//   $("#manageSW").hide();
//   $("#img_manage").hide();
//   $("#manageStories").hide();
//   $("#manage_appointments").hide();
//   $("welcome").show();
// }

function manageGallery() {
  $("#welcome").hide();
  $("#manageStories").hide();
  $("#manageSW").hide();
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
  $("#img_manage").hide();
  $("#manageStories").hide();
  $("#welcome").hide();
  $("#manageSW").hide();
  $("#manage_appointments").show();

  let str = "<thead class='thead-dark'>" + "<tr><th scope='col'>פרטים נוספים</th><th scope='col'>תאריך התור</th>";
  str+= "<th scope='col'>שם המטופל</th><th scope='col'>מייל העוס/ית</th><th scope='col'>טלפון העוס/ית</th><th scope='col'>שם העוס/ית</th></tr></thead>";


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
