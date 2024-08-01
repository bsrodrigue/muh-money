import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { FlatList, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../types";
import { Text } from "../../components";
import { useImagePicker } from "../../hooks";
import { useEffect } from "react";
import { useUserStore } from "../../stores";
import { useAsyncStorage } from "../../lib/storage";

type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export default function SettingsScreen({ navigation }: SettingsScreenProps) {
  const { theme: { colors: { error } } } = useTheme();
  const { pickImage, imgUri } = useImagePicker();
  const { update } = useUserStore();
  const { storeData } = useAsyncStorage();

  useEffect(() => {
    if (imgUri) {
      update({ avatar: imgUri });
      storeData('avatar', imgUri);
    }

  }, [imgUri]);

  const settings = [
    {
      title: "Account Settings",
      children:
        [
          {
            title: "Change your avatar",
            onPress: async () => {
              await pickImage();
            }
          },
          {
            title: "Change your username",
            onPress: () => { }
          },
          {
            title: "Export data",
            onPress: () => { }
          },
          {
            title: "Import data",
            onPress: () => { }
          },
          {
            title: "Clear data",
            danger: true,
            onPress: () => {
            }
          },
        ]
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingVertical: 10 }}>
      <FlatList data={settings}
        renderItem={({ index, item: { title, children } }) => (
          <View key={index} style={{ paddingHorizontal: 40, marginVertical: 5 }}>
            <Text weight="700" style={{ opacity: 0.5 }}>{title}</Text>
            <View style={{ marginVertical: 10 }}>
              <FlatList
                data={children} renderItem={({ index, item }) => (
                  <TouchableOpacity
                    onPress={item.onPress}
                    style={{ marginVertical: 10 }} key={index}>
                    <Text weight="600" style={{ color: item?.danger ? error : "black" }}>{item.title}</Text>
                  </TouchableOpacity>
                )} />
            </View>
          </View>
        )} />
    </View>
  )
}
