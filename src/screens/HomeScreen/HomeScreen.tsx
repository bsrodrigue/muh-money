import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import React, { useState } from "react";
import { CardBottomSheet, CreateTransactionForm, ExpandingView, FilterBadge, Row, TotalBalanceCard, TransactionHistoryItem } from "../../components";
import { View, Text, FlatList } from "react-native";
import { useTheme } from "@rneui/themed";
import { FAB } from "@rneui/base";
import { TransactionType } from "../../components/CreateTransactionForm/CreateTransactionForm";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const dividerRadius = 25;

const timeFilters = [
  "Today",
  "Yesterday",
  "Last Week",
];

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { theme: { colors: { white, black, primary } } } = useTheme();
  const [transactionType, setTransactionType] = useState<TransactionType>("Expense");
  const [formIsVisible, setFormIsVisible] = useState(false);

  return (
    <ExpandingView style={{ backgroundColor: white }}>
      <View style={{ position: "relative", marginBottom: "25%" }}>
        <View style={{ backgroundColor: black }}>
          <View style={{
            backgroundColor: white, width: "70%",
            height: 5, borderTopRightRadius: dividerRadius,
            borderBottomRightRadius: dividerRadius,
            marginBottom: 25
          }} />
        </View>

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
              height: 200,
            }}
            contentContainerStyle={{
              gap: 5,
              paddingVertical: 10
            }}
            keyExtractor={(item) => item.toString()}
            data={[1, 2, 3, 4, 5]}
            renderItem={(info) => (
              <TransactionHistoryItem />
            )} />
        </View>
      </View>
      <FAB onPress={() => setFormIsVisible(true)} title="Create Transaction" size="small" color={primary} placement="right" titleStyle={{ fontSize: 12 }} />
      <CardBottomSheet isVisible={formIsVisible} onBackdropPress={() => setFormIsVisible(false)}>
        <CreateTransactionForm type={transactionType} onPressType={(type) => setTransactionType(type)} />
      </CardBottomSheet>
    </ExpandingView>
  )
}

