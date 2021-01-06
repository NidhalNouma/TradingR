import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyDsrjq5NGE2hZwv_E5W3pULG6-oE_vCj3U",
  authDomain: "tradingrev-7560f.firebaseapp.com",
  projectId: "tradingrev-7560f",
  storageBucket: "tradingrev-7560f.appspot.com",
  messagingSenderId: "216786821272",
  appId: "1:216786821272:web:112ebc09d402466d50b0ed",
  measurementId: "G-QP1L3Q16SS",
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const uploadFile = (e, setImg) => {
  const file = e.target.files[0];
  const fileName = "product/" + file.name;
  const storageRef = app.storage().ref();
  //   var metadata = {
  //     contentType: "image/*",
  //   };
  const uploadTask = storageRef.child(fileName).put(file);

  uploadTask.on(
    "state_changed",
    function (snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
        default:
          console.log("default");
      }
    },
    function (error) {
      console.log(error);
    },
    function () {
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log("File available at", downloadURL);
        setImg(downloadURL);
      });
    }
  );
};
