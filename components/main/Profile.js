import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, FlatList } from "react-native";
// import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import Constants from "expo-constants";

import { connect } from "react-redux";
import firebase from "firebase";
require("firebase/firestore");

const LeftContent = (props) => <Avatar.Icon {...props} icon="face-profile" />;

function Profile(props) {
  const [userPost, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { currentUser, posts } = props;
    console.log({ currentUser, posts });
    if (props.route.params.uid == firebase.auth().currentUser.uid) {
      setUser(currentUser);
      setUserPosts(posts);
    } else {
      let db = firebase.firestore();
      db.collection("users")
        .doc(props.route.params.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setUser(snapshot.data());
          } else {
            console.log("Snapshot does not exist");
          }
        })
        .catch((error) => {
          console.log("Error in action fetchUser ", error);
        });
      db.collection("posts")
        .doc(props.route.params.uid)
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
          setUserPosts(posts);
        });
    }
  }, [props.route.params.uid]);
  if (user === null) {
    return <View></View>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
      </View>

      <View style={styles.containerGallery}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={userPost}
          renderItem={({ item }) => {
            return (
              <View style={styles.containerImage}>
                <Image
                  style={styles.image}
                  source={{ uri: item.downloadURL }}
                />
              </View>
            );
          }}
        />
      </View>

      {/* <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
        {posts &&
          posts.map((post) => (
            <Card style={{ padding: 10 }} key={post.id}>
              <Card.Title title={currentUser.name} left={LeftContent} />
              <Card.Content>
                <Title>{post.caption}</Title>
              </Card.Content>
              <Card.Cover source={{ uri: post.downloadURL }} />
            </Card>
          ))}
      </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  containerInfo: {
    margin: 20,
  },
  containerGallery: {
    flex: 1,
  },
  containerImage: {
    flex: 1 / 3,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
    height: 100,
    width: 100,
    margin: 10,
  },
});
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
});
export default connect(mapStateToProps, null)(Profile);
