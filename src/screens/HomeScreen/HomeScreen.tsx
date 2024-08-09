import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import React, { useState } from "react";
import { CardBottomSheet, CenteringView, CreateTransactionForm, EditTransactionForm, ExpandingView, FilterBadge, Row, ScreenDivider, TotalBalanceCard, TransactionHistoryItem } from "../../components";
import { View, FlatList, TouchableOpacity, Dimensions } from "react-native";
import { Icon, useTheme } from "@rneui/themed";
import { FAB } from "@rneui/base";
import { useTransactionStore } from "../../stores/transaction.store";
import { Text } from "../../components";
import { mom } from "../../lib/moment";
import { setDayToStart, setMonthToStart, setWeekToStart } from "../../lib/datetime";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const timeFilters = [
  "Daily",
  "Weekly",
  "Monthly",
];

const timeFilterHandlers = {
  "Daily": setDayToStart,
  "Weekly": setWeekToStart,
  "Monthly": setMonthToStart,
}

const timeFilterStrs = {
  "Daily": "Today",
  "Weekly": "This Week",
  "Monthly": "This Month",
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { theme: { colors: { white, black, primary } } } = useTheme();
  const [createFormIsVisible, setCreateFormIsVisible] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [timeFilterIndex, setTimeFilter] = useState(0);
  const { height } = Dimensions.get("window");

  const { items: transactions, create, update, remove } = useTransactionStore();

  const timeFilter = timeFilterHandlers[timeFilters[timeFilterIndex]](new Date());
  const timeFilterStr = timeFilterStrs[timeFilters[timeFilterIndex]];
  const filtertedTransactions = transactions.filter((t) => new Date(t.createdAt) >= timeFilter)

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
          <Text weight="700" style={{ opacity: 0.5, marginBottom: 10 }}>Transactions</Text>
          <Row style={{ gap: 5 }}>
            {timeFilters.map((filter, index) => (
              <FilterBadge
                label={filter}
                active={index === timeFilterIndex}
                onPress={() => setTimeFilter(index)}
                key={index} />
            ))}
          </Row>
        </View>
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <View
          style={{
            height: (height * 0.35),
          }}
        >
          <Text weight="700" style={{ marginBottom: 10, fontSize: 12 }}>{`${mom(timeFilter).format("dddd - DD/MM/YY")}`}</Text>
          <FlatList
            contentContainerStyle={{
              gap: 5,
              paddingVertical: 10,
              flex: 1,
            }}
            keyExtractor={(item) => item.title.toString()}
            data={filtertedTransactions}
            ListEmptyComponent={
              <CenteringView>
                <View style={{ opacity: 0.5 }}>
                  <Icon size={50} name="inbox" type="feather" color={black} />
                  <Text weight="700" style={{ marginTop: 10 }}>{`No Transactions ${timeFilterStr}`}</Text>
                </View>
              </CenteringView>
            }
            renderItem={(transaction) => (
              <TouchableOpacity onLongPress={() => setEditingTransaction(transaction.item)}>
                <TransactionHistoryItem transaction={transaction.item} />
              </TouchableOpacity>
            )} />
        </View>
      </View>

      <FAB onPress={() =>
        setCreateFormIsVisible(true)}
        title="Create Transaction"
        size="small" color={primary}
        placement="right" titleStyle={{ fontSize: 12, fontFamily: "font-700" }} />

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

