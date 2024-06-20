import { Icon, Image } from "@rneui/themed";
import { TouchableOpacity, View } from "react-native";
import { pmubLogo } from "../../assets";

type HeaderProps = {
  searchMode?: boolean;
  onSearchPress?: () => void;
  onPressSettings?: () => void;
  onPressNotifications?: () => void;
  onChange?: (value: string) => void;
  onPressLogout?: () => void;
  loading?: boolean;
};

export default function Header({ onPressLogout }: HeaderProps) {
  const logoSize = 50;

  return (
    <View style={{ backgroundColor: "white", alignItems: "center", flexDirection: "row", justifyContent: "center", paddingHorizontal: 15 }}>
      <View style={{ flexGrow: 1 }}>
        <Image source={pmubLogo} resizeMode="contain" style={{
          height: logoSize,
          width: logoSize,
        }} />
      </View>
      <TouchableOpacity
        onPress={() => {
          onPressLogout?.();
        }}
        style={{ flexGrow: 1, alignItems: "flex-end" }}>
        <Icon type="ionicon" name="exit" />
      </TouchableOpacity>
    </View>

  )
}
