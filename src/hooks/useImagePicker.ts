import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default function useImagePicker() {
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [imgUri, setImgUri] = useState(null);
  const [imgBase64, setImgBase64] = useState("");

  const handlePermission = async () => {
    const response = await requestPermission();
    return response.granted;
  }

  const pickImage = async (aspect: [number, number] = [1, 1]) => {
    if (!status.granted && ! await handlePermission()) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect,
      quality: 0.5,
      base64: true
    })

    if (!result.canceled) {
      console.log(result.assets[0])
      setImgUri(result.assets[0].uri);
      setImgBase64(result.assets[0].base64);
    }
  }

  return { imgUri, imgBase64, pickImage };
}
