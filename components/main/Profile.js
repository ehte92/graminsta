import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
} from "react-native";
// import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import Constants from "expo-constants";

import { connect } from "react-redux";

const LeftContent = (props) => <Avatar.Icon {...props} icon="face-profile" />;

function Profile(props) {
  const { currentUser, posts } = props;
  console.log({ currentUser, posts });
  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>{currentUser.name}</Text>
        <Text>{currentUser.email}</Text>
      </View>

      <View style={styles.containerGallery}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={posts}
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
