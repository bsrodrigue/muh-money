import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import React, { useEffect, useState } from "react";
import { CardBottomSheet, CreateTransactionForm, EditTransactionForm, ExpandingView, FilterBadge, Row, ScreenDivider, TotalBalanceCard, TransactionHistoryItem } from "../../components";
import { View, Text, FlatList, TouchableOpacity, Dimensions } from "react-native";
import { useTheme } from "@rneui/themed";
import { FAB } from "@rneui/base";
import { useTransactionStore } from "../../stores/transaction.store";
import { useAsyncStorage } from "../../lib/storage";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const timeFilters = [
  "Today",
  "Yesterday",
  "Last Week",
];

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { theme: { colors: { white, black, primary } } } = useTheme();
  const [createFormIsVisible, setCreateFormIsVisible] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const { height } = Dimensions.get("window");
  const { storeData } = useAsyncStorage();

  const { items: transactions, create, update, remove } = useTransactionStore();

  useEffect(() => {
    storeData("transactions", transactions);
  }, [transactions]);

  return (
    <ExpandingView style={{ backgroundColor: white }}>
      <View style={{ position: "relative", marginBottom: "25%" }}>
        <ScreenDivider />
        <View style={{
          backgroundColor: black,
          height: 100,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }} />
        <View style={{ paddingHorizontal: 15, position: "absolute", left: 0, right: 0, top: 25 }}>
          <TotalBalanceCard />
        </View>
      </View>

      <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
        <View>
          <Text style={{ fontWeight: "bold", opacity: 0.5, marginBottom: 10 }}>Transactions</Text>
          <Row style={{ gap: 5 }}>
            {timeFilters.map((filter, index) => (
              <FilterBadge label={filter} active={index === 1} key={index} />
            ))}
          </Row>
        </View>
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <View>
          <Text style={{ marginBottom: 10, fontSize: 12 }}>{`June 10th - June 17th`}</Text>
          <FlatList
            style={{
              height: (height * 0.35),
            }}
            contentContainerStyle={{
              gap: 5,
              paddingVertical: 10
            }}
            keyExtractor={(item) => item.title.toString()}
            data={transactions}
            renderItem={(transaction) => (
              <TouchableOpacity onLongPress={() => setEditingTransaction(transaction.item)}>
                <TransactionHistoryItem{...transaction.item} />
              </TouchableOpacity>
            )} />
        </View>
      </View>

      <FAB onPress={() =>
        setCreateFormIsVisible(true)} title="Create Transaction" size="small" color={primary} placement="right" titleStyle={{ fontSize: 12 }} />

      <CardBottomSheet
        isVisible={createFormIsVisible}
        onBackdropPress={() => setCreateFormIsVisible(false)}>
        <CreateTransactionForm
          onCreate={(transaction) => {
            create(transaction);
            setCreateFormIsVisible(false);
          }} />
      </CardBottomSheet>

      <CardBottomSheet
        isVisible={Boolean(editingTransaction)}
        onBackdropPress={() => setEditingTransaction(null)}
      >
        <EditTransactionForm
          transaction={editingTransaction}
          onEdit={(transaction) => {
            update(transaction);
            setEditingTransaction(null);
          }}
          onDelete={(uuid) => {
            remove(uuid);
            setEditingTransaction(null);
          }}
        />
      </CardBottomSheet>

    </ExpandingView>
  );
}

