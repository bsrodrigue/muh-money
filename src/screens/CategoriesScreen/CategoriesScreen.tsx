import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { CardBottomSheet, CreateCategoryForm, CreateTransactionForm, EditTransactionForm, ExpandingView } from "../../components"
import { FAB, Icon } from "@rneui/base";
import { useState } from "react";
import { useTheme } from "@rneui/themed";

import iconData from "../../constants/icon_data.json";
import { Dimensions, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";

const familiesMapping = {
  "AntDesign": "antdesign",
  "Entypo": "entypo",
  "EvilIcons": "evilicon",
  "Feather": "feather",
  "FontAwesome": "font-awesome",
  "FontAwesome5": "font-awesome-5",
  "Fontisto": "fontisto",
  "Foundation": "foundation",
  "Ionicons": "ionicon",
  "MaterialIcons": "material",
  "MaterialCommunityIcons": "material-community",
  "Octicons": "octicon",
  "SimpleLineIcons": "simple-line-icon",
  "Zocial": "zocial"
};

const iconFamilies = Object.keys(iconData).filter((item) => familiesMapping[item] !== undefined);

type CategoriesScreenProps = NativeStackScreenProps<RootStackParamList, 'Categories'>;

export default function CategoriesScreen({ navigation, route }: CategoriesScreenProps) {
  const { theme: { colors: { white, black, primary } } } = useTheme();
  const [createFormIsVisible, setCreateFormIsVisible] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const height = Dimensions.get('window').height

  return (
    <ExpandingView>
      {
        <View style={{
          height,
        }}>
          <Text>{iconFamilies[0]}</Text>
          <FlashList
            getItemType={(item) => typeof (item)}
            bounces
            numColumns={5}
            data={iconData[iconFamilies[0]]}
            estimatedItemSize={10000}
            contentContainerStyle={{
              padding: 20
            }}
            renderItem={({ item }) =>
              (<Icon name={item as string} type={familiesMapping[iconFamilies[0]]} />)} />
        </View>
      }
      <FAB
        onPress={() => setCreateFormIsVisible(true)}
        title="Create Category" size="small"
        color={primary} placement="right"
        titleStyle={{ fontSize: 12 }} />

      <CardBottomSheet isVisible={createFormIsVisible} onBackdropPress={() => setCreateFormIsVisible(false)}>
        <CreateCategoryForm />
      </CardBottomSheet>

      <CardBottomSheet isVisible={Boolean(editingCategory)} onBackdropPress={() => setEditingCategory(null)}>
        <EditTransactionForm transaction={editingCategory} />
      </CardBottomSheet>

    </ExpandingView>
  )
}
