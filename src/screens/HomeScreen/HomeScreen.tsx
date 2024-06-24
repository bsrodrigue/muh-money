import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import React from "react";
import { ExpandingView, FilterBadge, Row, TotalBalanceCard, TransactionHistoryItem } from "../../components";
import { View, Text } from "react-native";
import { useTheme } from "@rneui/themed";
import { FAB } from "@rneui/base";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const dividerRadius = 25;

const timeFilters = [
  "Daily",
  "Weekly",
  "Monthly",
  "Yearly"
];

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { theme: { colors: { white, black, primary } } } = useTheme();

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
              <FilterBadge label={filter} active={index === 1} />
            ))}
          </Row>
        </View>
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <View>
          <Text style={{ marginBottom: 10, fontSize: 12 }}>{`June 10th - June 17th`}</Text>
          <View style={{ gap: 10 }}>
            {
              [1, 2, 3].map((_) => (
                <TransactionHistoryItem />
              ))
            }
          </View>
        </View>
      </View>

      <FAB title="Create Transaction" size="small" color={primary} placement="right" titleStyle={{ fontSize: 12 }} />
    </ExpandingView>
  )
}
