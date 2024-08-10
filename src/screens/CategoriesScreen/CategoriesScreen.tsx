import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { CardBottomSheet, CreateCategoryForm, ExpandingView } from "../../components";
import { FAB } from "@rneui/base";
import { useRef, useState } from "react";
import { Icon, useTheme } from "@rneui/themed";
import { useCategoryStore } from "../../stores";
import { Dimensions, FlatList, View } from "react-native";
import { Text } from "../../components";
import { truncate } from "../../lib/utils";

type CategoriesScreenProps = NativeStackScreenProps<RootStackParamList, 'Categories'>;

export default function CategoriesScreen({ navigation, route }: CategoriesScreenProps) {
  const { theme: { colors: { primary, greyOutline } } } = useTheme();
  const [createFormIsVisible, setCreateFormIsVisible] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const { create, items } = useCategoryStore();
  const colsRef = useRef(4);


  return (
    <ExpandingView>
      <FlatList
        numColumns={colsRef.current}
        contentContainerStyle={{
          padding: 10,
        }}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 10
        }}
        data={items}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <View style={{ alignItems: "center", gap: 10 }}>
              <View style={{ aspectRatio: 1, borderRadius: 50, borderColor: greyOutline, borderWidth: 1, padding: 15 }}>
                <Icon size={18} name={item?.iconName} type={item?.iconFamily} color={item?.color} />
              </View>
              <Text weight="700" style={{
                fontSize: 12,
              }}>{truncate(item?.title || "", 10)}</Text>
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
