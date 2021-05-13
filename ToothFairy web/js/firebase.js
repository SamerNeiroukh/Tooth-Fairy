


  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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



  
  export const auth = firebase.auth();

  export default firebase;