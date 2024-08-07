import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { CardBottomSheet, CreateCategoryForm, EditTransactionForm, ExpandingView, Row } from "../../components"
import { FAB } from "@rneui/base";
import { useState } from "react";
import { Icon, useTheme } from "@rneui/themed";
import { useCategoryStore } from "../../stores";
import { FlatList, View } from "react-native";
import { Text } from "../../components";

type CategoriesScreenProps = NativeStackScreenProps<RootStackParamList, 'Categories'>;

export default function CategoriesScreen({ navigation, route }: CategoriesScreenProps) {
  const { theme: { colors: { white, black, primary, greyOutline } } } = useTheme();
  const [createFormIsVisible, setCreateFormIsVisible] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const { create, items } = useCategoryStore();

  return (
    <ExpandingView>

      <FlatList
        numColumns={3}
        contentContainerStyle={{
          paddingHorizontal: 10,
        }}
        columnWrapperStyle={{
          justifyContent: "flex-start",
        }}
        data={items} renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
            <View style={{ alignItems: "center", gap: 10 }}>
              <View style={{ aspectRatio: 1, borderRadius: 50, borderColor: greyOutline, borderWidth: 1, padding: 10 }}>
                <Icon name={item.iconName} type={item.iconFamily} color={item.color} />
              </View>

              <Text weight="700">{item.title}</Text>
            </View>
          </View>
        )} />


      <FAB
        onPress={() => setCreateFormIsVisible(true)}
        title="Create Category" size="small"
        color={primary} placement="right"
        titleStyle={{ fontSize: 12 }} />

      <CardBottomSheet isVisible={createFormIsVisible} onBackdropPress={() => setCreateFormIsVisible(false)}>
        <CreateCategoryForm onCreate={(category) => {
          create(category)
          setCreateFormIsVisible(false);
        }} />
      </CardBottomSheet>

      <CardBottomSheet isVisible={Boolean(editingCategory)} onBackdropPress={() => setEditingCategory(null)}>
      </CardBottomSheet>

    </ExpandingView>
  )
}
