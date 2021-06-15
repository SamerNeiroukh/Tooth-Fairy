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
    let imageName = snap.child("Name").val();
    let str;
    //   alert("image: " + image)
    // str = `<div class="mySlides"> <img src= ${image} style="width:40%" style="height:40%"></img></div>`;


    str = `  <div class="box">
    <img src=${image} style="width:100%" style="height:100%">
    <span>${imageName}</span>
    </div>`

    $("#pictures").append(str);
  });
}

// get all Stories from the firebase and show the admin the Stories to delete
function getStories() {
  // run on all the data in the realtime database in filde Pictures
  let rootref = firebase.database().ref().child("Stories");
  rootref.on("child_added", (snap) => {
    let title = snap.child("story_title").val();
    let story = snap.child("story_content").val();

    let str = `                                                    
    <div class="swiper-slide">
        <div class="card">
            <img class="card-image" src="images/testimonial-1.svg"
                alt="alternative">
            <div class="card-body">
                <p class="testimonial-author" dir="rtl">${title}</p>
                <p class="testimonial-text" dir="rtl">${story}</p>
            </div>
        </div>
    </div>
    `;
    $(".swiper-wrapper").append(str);

    /* Slider - Swiper */
    var imageSlider = new Swiper(".image-slider", {
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      loop: true,
      spaceBetween: 30,
      slidesPerView: 5,
      breakpoints: {
        // when window is <= 580px
        580: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        // when window is <= 768px
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        // when window is <= 992px
        992: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        // when window is <= 1200px
        1200: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
    });

    /* Card Slider - Swiper */
    var cardSlider = new Swiper(".card-slider", {
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  });
}

function getImagesAndStories() {
  getStories();
  getImages();
}

// get Privacy Policy
var modal = document.getElementById('PrivacyPolicy');
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

