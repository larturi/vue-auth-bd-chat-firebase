

import { firebase } from '@firebase/app';

require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");


const config = {
    apiKey: "AIzaSyCzr0xaQdgIIamOashWw7RjjFwHov8NRT0",
    authDomain: "vue-facebook-y.firebaseapp.com",
    databaseURL: "https://vue-facebook-y.firebaseio.com",
    projectId: "vue-facebook-y",
    storageBucket: "vue-facebook-y.appspot.com",
    messagingSenderId: "441139376023",
    appId: "1:441139376023:web:4e03d1deea2fd472c15ed2"
};
firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {firebase, db, auth, storage};