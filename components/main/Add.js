import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Add({navigation}) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      let photo = await camera.takePictureAsync();
      setImage(photo.uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera and gallery</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => {
            setCamera(ref);
          }}
          style={styles.fixedRatio}
          type={type}
          ratio={"1:1"}
        ></Camera>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 20,
        }}
      >
        <TouchableOpacity
          style={{
            alignSelf: "flex-end",
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          <Icon.Button
            name="atom-variant"
            backgroundColor="transparent"
            size={40}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignSelf: "flex-end",
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          <Icon.Button
            name="circle-outline"
            backgroundColor="transparent"
            size={64}
            onPress={() => takePicture()}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignSelf: "flex-end",
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          <Icon.Button
            name="image"
            backgroundColor="transparent"
            size={40}
            onPress={() => pickImage()}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignSelf: "flex-end",
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          <Icon.Button
            name="forward"
            backgroundColor="transparent"
            size={20}
            onPress={() => navigation.navigate("Save", { image })}
          />
        </TouchableOpacity>
      </View>
      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
});
