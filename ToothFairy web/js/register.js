var firebaseConfig = {
    apiKey: "AIzaSyD5B3hTjXXygIi62Sb9pyiolRAaR7moR0E",
    authDomain: "tooth-fairy-web.firebaseapp.com",
    databaseURL: "https://tooth-fairy-web-default-rtdb.firebaseio.com",
    projectId: "tooth-fairy-web",
    storageBucket: "tooth-fairy-web.appspot.com",
    messagingSenderId: "473402834454",
    appId: "1:473402834454:web:511aea6ff025a2c5817f37",
    measurementId: "G-3KF2SC8288"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();



  function reg(){
    let userEmail = document.getElementById("remail").value;
    let secuserEmail = document.getElementById("secremail").value;

    let userPass = document.getElementById("rpass").value;
    let secuserPass = document.getElementById("secrpass").value;

    if(userEmail !=secuserEmail && userPass!=secuserPass){
        alert("email or password invalid")
        return
    }

    else{
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPass)
        .then((userCredential) => {
          // Signed in 
          var user = userCredential.user;
          window.location.href = "index.html"
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
        });
    }

  

  
  }





