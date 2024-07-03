import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon, useTheme } from "@rneui/themed";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Header, LogoutDialog } from "../../components";
import { RootStackParamList } from "../../types";
import { HomeScreen } from "../HomeScreen";
import { ViewAccountScreen } from "../ViewAccountScreen";
import { AccountsScreen } from "../AccountsScreen";

interface TabIconProps {
  icon: string;
  focused: boolean;
}

function TabIcon({ icon, focused }: TabIconProps) {
  const { theme: { colors: { black, greyOutline } } } = useTheme();

  return (
    <Icon color={focused ? black : greyOutline} name={icon} type="font-awesome-5" />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8E8E8",
  },
});

type MainScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

const Tab = createBottomTabNavigator();

export default function MainScreen({ navigation }: MainScreenProps) {
  const [logoutDialogIsvisible, setLogoutDialogIsVisible] = useState(false);
  const { theme: { colors: { black, white } } } = useTheme();

  return (
    <View style={styles.container}>
      <LogoutDialog isVisible={logoutDialogIsvisible} onDismissDialog={() => setLogoutDialogIsVisible(false)} />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            paddingVertical: 10,
            height: 60,
            borderTopWidth: 0,
            shadowColor: white
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "font-600",
            marginBottom: 5,
            color: black,
          },
          header: () => (
            <Header onPressLogout={() => setLogoutDialogIsVisible(true)} />
          )
        }}>
        <Tab.Screen
          options={{
            headerShown: true,
            tabBarLabel: "Home",
            tabBarIcon: ({ focused }) => <TabIcon icon="home" focused={focused} />,
          }}
          name="Home"
          component={HomeScreen} />
        <Tab.Screen
          options={{
            tabBarLabel: "Accounts",
            tabBarIcon: ({ focused }) => <TabIcon icon="wallet" focused={focused} />,
          }}
          name="Accounts"
          component={AccountsScreen} />
        <Tab.Screen
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ focused }) => <TabIcon icon="user" focused={focused} />,
          }}
          name="Profile"
          component={ViewAccountScreen} />
      </Tab.Navigator>
    </View >
  )
}
