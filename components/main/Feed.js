import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";

export default function Feed() {
  return (
    <View style={styles.container}>
      <Text>Feed</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
