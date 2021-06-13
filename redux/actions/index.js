import { USER_POSTS_STATE_CHANGE, USER_STATE_CHANGE } from "../constants";
import firebase from "firebase";

export function fetchUser() {
  let db = firebase.firestore();
  return (dispatch) => {
    db.collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
        } else {
          console.log("Snapshot does not exist");
        }
      })
      .catch((error) => {
        console.log("Error in action fetchUser ", error);
      });
  };
}

export function fetchUserPosts() {
  let db = firebase.firestore();
  return (dispatch) => {
    db.collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        console.log(posts);
        dispatch({ type: USER_POSTS_STATE_CHANGE, posts });
      });
  };
}
