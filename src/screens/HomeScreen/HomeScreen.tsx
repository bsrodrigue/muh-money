import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import React, { useState } from "react";
import { CardBottomSheet, ExpandingView, FilterBadge, Row, TotalBalanceCard, TransactionHistoryItem } from "../../components";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useTheme } from "@rneui/themed";
import Animated, { interpolate, interpolateColor, runOnJS, useAnimatedReaction, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { FAB } from "@rneui/base";

interface ToggleButtonProps {
  isActiveByDefault: boolean;
  onChange: (active: boolean) => void;
}

function ToggleButton({ isActiveByDefault, onChange }: ToggleButtonProps) {
  const { theme: { colors: { primary, greyOutline, grey2, primaryLight } } } = useTheme();
  const toggled = useSharedValue(isActiveByDefault ? 1 : 0);

  useAnimatedReaction(() => toggled.value, (curr, prev) => {
    if (curr !== prev) {
      //runOnJS(onChange)(curr === 1);
    }
  });

  const toggleButtonAnimatedContainerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      toggled.value,
      [0, 1],
      [greyOutline, primaryLight]
    )
  }));

  const toggleButtonAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      toggled.value,
      [0, 1],
      [grey2, primary]
    ),

    transform: [
      {
        translateX: interpolate(
          toggled.value,
          [0, 1],
          [0, 23]
        )
      }
    ]
  }));

  return (
    <TouchableOpacity style={{ alignItems: "flex-end", gap: 3 }} onPress={() => {
      toggled.value = withSpring((toggled.value === 1) ? 0 : 1);
    }}>
      <Text style={{ opacity: 0.5, fontWeight: "bold", fontSize: 10 }}>Advanced options</Text>
      <Animated.View
        style={[toggleButtonAnimatedContainerStyle, {
          width: 40, height: 15, borderRadius: 25,
          flexDirection: "row", alignItems: "center", paddingVertical: 5, paddingHorizontal: 3
        }]}>
        <Animated.View style={[toggleButtonAnimatedStyle, { height: 10, width: 10, borderRadius: 50 }]} />
      </Animated.View>
    </TouchableOpacity>
  );
}

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
  const [formIsVisible, setFormIsVisible] = useState(false);
  const [optionsEnabled, setOptionsEnabled] = useState(false);

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
        <ExpandingView style={{ paddingHorizontal: 10 }}>
          <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Create Transaction</Text>
            <ToggleButton isActiveByDefault={false} onChange={(active) => setOptionsEnabled(active)} />
          </Row>
          {
            optionsEnabled && (
              <Text>Advanced Options</Text>
            )
          }
        </ExpandingView>
      </CardBottomSheet>
    </ExpandingView>
  )
}
