import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";

import firebase from "firebase";

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
    };
    this.onSignUp = this.onSignUp.bind(this);
  }
  onSignUp() {
    const { name, email, password } = this.state;
    let db = firebase.firestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        db.collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email,
          })
          .then(() => {
            console.log("Document Added!");
          })
          .catch((error) => {
            console.log("Error: ", error);
          });
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <View>
        <TextInput
          placeholder="Name"
          onChangeText={(name) => this.setState({ name })}
        />
        <TextInput
          placeholder="Email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />
        <Button title="Register" onPress={() => this.onSignUp()} />
      </View>
    );
  }
}

export default Register;
