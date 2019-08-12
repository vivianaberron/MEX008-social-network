// Este es el punto de entrada de tu aplicacion

// import { myFunction } from './lib/index.js';

// myFunction();
import addPost from "./app.js";
var firebaseConfig = {
    apiKey: "AIzaSyAqOeJJsfipJhhu3xonhhh2G4XYmog8lvI",
    authDomain: "superb-ethos-249021.firebaseapp.com",
    databaseURL: "https://superb-ethos-249021.firebaseio.com",
    projectId: "superb-ethos-249021",
    storageBucket: "superb-ethos-249021.appspot.com",
    messagingSenderId: "900630117910",
    appId: "1:900630117910:web:897141f2088152a4"
};
// Initialize functions firebase
firebase.initializeApp(firebaseConfig);
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var db = firebase.firestore();
// UI
ui.start('#firebaseui-auth-container', {
    signInOptions: [
        // List of OAuth providers supported.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    // Other config options...
});
var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
        },
        uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '/#/wall',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        //   firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //   firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
};
//initialize ui config
ui.start('#firebaseui-auth-container', uiConfig);
//Activa modal
document.addEventListener('DOMContentLoaded', () => {
    let elems = document.querySelectorAll('.modal');
    let instances = M.Modal.init(elems);
});

 document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, options);
  });

export const addPostSubmit = (ev) => {
    ev.preventDefault();
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            let textArea = document.getElementById("textarea");
            let inputTrim = textarea.trim();
        if (textArea.value ===''|| textArea.value === inputTrim || textArea.value = ' '){
            alert("Tienes que escribir algo");
        } else {
            firebase.firestore().collection('users').doc(user.uid).get()
         .then(doc => {
             if (user.displayName === null) {
                 addPost(textArea.value, user.uid, doc.data().name);
        
             } else {
                 addPost (textarea.value, user.uid, user.displayName);
             }

         });
        } 

        } else {
            alert("Inicia sesion para publicar");
        }

    });
};






