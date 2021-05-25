import { USER_STATE_CHANGE } from "../constants";
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
