import { Icon, useTheme } from "@rneui/themed";
import { TouchableOpacity, View } from "react-native";
import { Avatar } from "@rneui/base";
import { Text } from "../Text";

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
  const { theme: { colors: { primary, grey1, black, white } } } = useTheme();
  const logoSize = 50;

  return (
    <View style={{ backgroundColor: black, alignItems: "center", flexDirection: "row", justifyContent: "center", padding: 15 }}>
      <View style={{ flexDirection: "row", alignItems: "center", flexGrow: 1 }}>
        <Avatar
          size={logoSize}
          containerStyle={{
            backgroundColor: primary,
            marginRight: 10
          }}
          rounded
        />
        <View >
          <Text style={{ color: white, fontSize: 12, opacity: 0.5 }}  >Welcome back</Text>
          <Text weight="700" style={{ color: white, fontSize: 25 }}>Bazie Maimouna</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          onPressLogout?.();
        }}
        style={{ flexGrow: 1, alignItems: "flex-end" }}>
        <View style={{ padding: 7, backgroundColor: grey1, borderRadius: 50, aspectRatio: 1 }}>
          <Icon color={white} type="font-awesome" name="cog" />
        </View>
      </TouchableOpacity>
    </View>

  )
}
