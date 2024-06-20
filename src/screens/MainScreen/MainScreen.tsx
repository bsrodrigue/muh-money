import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon, useTheme } from "@rneui/themed";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Header, LogoutDialog } from "../../components";
import { RootStackParamList } from "../../types";
import { HomeScreen } from "../HomeScreen";
import { ViewAccountScreen } from "../ViewAccountScreen";

interface TabIconProps {
  icon: string;
  focused: boolean;
}

function TabIcon({ icon, focused }: TabIconProps) {
  const { theme: { colors: { yellow } } } = useTheme();

  return (
    <Icon color={focused ? yellow : "white"} name={icon} type="font-awesome-5" />
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
  const { theme: { colors: { primary, secondary, black } } } = useTheme();

  return (
    <View style={styles.container}>
      <LogoutDialog isVisible={logoutDialogIsvisible} onDismissDialog={() => setLogoutDialogIsVisible(false)} />
      <Tab.Navigator screenOptions={{
        tabBarStyle: {
          paddingVertical: 10,
          height: 60,
          backgroundColor: black
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Quicksand-600",
          marginBottom: 5,
          color: "white"
        },
        tabBarActiveTintColor: primary,
        header: () => (
          <Header onPressLogout={() => setLogoutDialogIsVisible(true)} />
        )
      }}>
        <Tab.Screen
          options={{
            headerShown: true,
            tabBarLabel: "Accueil",
            tabBarIcon: ({ focused }) => <TabIcon icon="home" focused={focused} />,
          }}
          name="Home"
          component={HomeScreen} />
        <Tab.Screen
          options={{
            tabBarLabel: "Mon Profil",
            tabBarIcon: ({ focused }) => <TabIcon icon="user" focused={focused} />,
          }}
          name="Profile"
          component={ViewAccountScreen} />
      </Tab.Navigator>
    </View >
  )
}
