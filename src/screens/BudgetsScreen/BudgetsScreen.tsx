import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { BudgetCard, CardBottomSheet, CreateBudgetForm, EditBudgetForm, ExpandingView, ScreenDivider } from "../../components"
import { FAB } from "@rneui/base";
import { View, FlatList, TouchableOpacity, Dimensions } from "react-native";
import { useTheme } from "@rneui/themed";
import { useEffect, useState } from "react";
import { useBudgetStore } from "../../stores";
import { useAsyncStorage } from "../../lib/storage";

type BudgetsScreenProps = NativeStackScreenProps<RootStackParamList, 'Budgets'>;

export default function BudgetsScreen({ navigation, route }: BudgetsScreenProps) {
  const { theme: { colors: { black, primary } } } = useTheme();
  const { height } = Dimensions.get("window");
  const [createFormIsVisible, setCreateFormIsVisible] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);

  const { items, create, update, remove } = useBudgetStore();
  const { storeData } = useAsyncStorage();

  useEffect(() => {
    storeData('budgets', items);
  }, [items]);

  return (
    <ExpandingView>
      <ScreenDivider />
      <View style={{ backgroundColor: black }}>
        <View style={{ backgroundColor: primary, padding: 20, paddingHorizontal: 20 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{
              height: (height * 0.8)
            }}
            contentContainerStyle={{
              paddingBottom: 50
            }}
            data={items}
            keyExtractor={(_item, number) => number.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onLongPress={() => setEditingBudget(item)}>
                <BudgetCard budget={item} />
              </TouchableOpacity>
            )} />
        </View>
      </View>

      <FAB onPress={() => setCreateFormIsVisible(true)} title="Create Budget" size="small" color={primary} placement="right" titleStyle={{ fontSize: 12 }} />

      <CardBottomSheet isVisible={createFormIsVisible} onBackdropPress={() => setCreateFormIsVisible(false)}>
        <CreateBudgetForm
          onCreate={(budget) => {
            create(budget);
            setCreateFormIsVisible(false);
          }} />
      </CardBottomSheet>

      <CardBottomSheet isVisible={Boolean(editingBudget)} onBackdropPress={() => setEditingBudget(null)}>
        <EditBudgetForm
          budget={editingBudget}
          onEdit={(budget) => {
            update(budget);
            setEditingBudget(null);
          }}
          onDelete={(uuid) => {
            remove(uuid);
            setEditingBudget(null);
          }}
        />
      </CardBottomSheet>
    </ExpandingView>
  )
}
