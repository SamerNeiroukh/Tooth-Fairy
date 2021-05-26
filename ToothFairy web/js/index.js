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


  // get all images from the firebase
  function getImages() {
    let rootref = firebase.database().ref().child("Pictures");

    rootref.on("child_added", (snap) => {
      let image = snap.child("Link").val();
      let str
    //   alert("image: " + image)
      str = `<div class="mySlides"> <img src= ${image} style="width:40%" style="height:40%"></img></div>`

      $("#pictures").append(str);
      plusSlides(1)
    });
  }

//------ make the gallary  ---------//
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

// slide images
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}
//------ end make the gallary  ---------//
