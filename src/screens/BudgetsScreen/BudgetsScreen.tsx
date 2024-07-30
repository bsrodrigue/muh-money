import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { BudgetCard, CardBottomSheet, CreateBudgetForm, EditBudgetForm, ExpandingView, ScreenDivider } from "../../components"
import { FAB } from "@rneui/base";
import { View, FlatList, TouchableOpacity, Dimensions } from "react-native";
import { useTheme } from "@rneui/themed";
import { budgets } from "../../mock";
import { useState } from "react";

type BudgetsScreenProps = NativeStackScreenProps<RootStackParamList, 'Budgets'>;

export default function BudgetsScreen({ navigation, route }: BudgetsScreenProps) {
  const { theme: { colors: { black, primary } } } = useTheme();
  const { height } = Dimensions.get("window");
  const [createFormIsVisible, setCreateFormIsVisible] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);

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
            data={budgets}
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
        <CreateBudgetForm />
      </CardBottomSheet>

      <CardBottomSheet isVisible={Boolean(editingBudget)} onBackdropPress={() => setEditingBudget(null)}>
        <EditBudgetForm budget={editingBudget} />
      </CardBottomSheet>
    </ExpandingView>
  )
}
