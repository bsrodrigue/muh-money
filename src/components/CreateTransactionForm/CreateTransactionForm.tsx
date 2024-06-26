import { useTheme } from '@rneui/themed';
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import Animated, { useSharedValue } from 'react-native-reanimated';
import { ExpandingView } from '../ExpandingView';
import { Row } from '../Row';
import { ToggleButton } from '../ToggleButton';
import { FilterBadge } from '../FilterBadge';
import { TextInput } from '../Input';
import { Icon } from '@rneui/base';
import { Button } from '../Button';

const categories = [
  "Electricity",
  "Water",
  "Internet",
  "Fuel",
  "Clothes",
  "Gift",
  "Uncategorized"
];

const transactionTypes = [
  "Expense",
  "Income",
  "Transfer"
];

export type TransactionType = "Expense" | "Income" | "Transfer";

interface CreateTransactionFormProps {
  type: TransactionType;
  onPressType?: (type: TransactionType) => void;
}

export default function CreateTransactionForm({ type = "Expense", onPressType }: CreateTransactionFormProps) {
  const { theme: { colors: { error, primary, warning, success } } } = useTheme();
  const [optionsEnabled, setOptionsEnabled] = useState(false);

  const transactionTypeColors = {
    "Expense": error,
    "Income": success,
    "Transfer": warning
  }

  return (

    <ExpandingView style={{ paddingHorizontal: 10 }}>
      <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Create Transaction</Text>
        <ToggleButton isActiveByDefault={false} onChange={(active) => setOptionsEnabled(active)} />
      </Row>

      <Row style={{ gap: 5, marginVertical: 10 }}>
        {transactionTypes.map((filter, index) => (
          <FilterBadge onPress={onPressType} activeColor={transactionTypeColors[type] ?? primary} label={filter} active={type === filter} key={index} />
        ))}
      </Row>


      <TextInput label={`${type} name`} />

      <Row style={{ gap: 5 }}>
        <TextInput wrapperStyle={{ flexGrow: 1 }} label="Amount" keyboardType="numeric" />
        {
          type !== "Transfer" && (
            <CategorySelect />
          )
        }
      </Row>

      {
        type === "Transfer" && (
          <View style={{ flexGrow: 1, justifyContent: "space-between" }}>
            <Text style={{
              fontWeight: "bold",
            }}>Transfer Flow</Text>
            <Row style={{ justifyContent: "space-between", alignItems: "center", flex: 1 }}>
              <TouchableOpacity >
                <Text>Wallet</Text>
              </TouchableOpacity>
              <Row style={{ alignItems: "center" }}>
                <Icon name="arrow-right" color={primary} size={35} />
                <Icon name="arrow-right" color={primary} size={35} />
                <Icon name="arrow-right" color={primary} size={35} />
              </Row>
              <TouchableOpacity >
                <Text>Wallet</Text>
              </TouchableOpacity>
            </Row>
          </View>

        )
      }

      <Row style={{ justifyContent: "space-between", marginVertical: 10 }}>
        <View style={{ alignItems: "flex-start" }}>
          <Text style={{ fontWeight: "bold" }}>Date</Text>
          <Text style={{ fontWeight: "bold", opacity: 0.5 }}>06/11/2024</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={{ fontWeight: "bold" }}>Hour</Text>
          <Text style={{ fontWeight: "bold", opacity: 0.5 }}>07:50 PM</Text>
        </View>
      </Row>
      <Button title="Submit" />
    </ExpandingView>
  );
}

function CategorySelect() {
  const { theme: { colors: { primary } } } = useTheme();
  const [categoryIndex, setCategoryIndex] = useState(0);
  const fontSize = useSharedValue(14);

  const handleNextCategory = () => {
    if (categoryIndex >= categories.length - 1) return;
    setCategoryIndex(categoryIndex + 1);
  }

  const handlePreviousCategory = () => {
    if (categoryIndex <= 0) return;
    setCategoryIndex(categoryIndex - 1);
  }

  return (
    <View style={{ flexGrow: 1, justifyContent: "space-between" }}>
      <Text style={{
        fontWeight: "bold",
      }}>Category</Text>
      <Row style={{ justifyContent: "space-between", alignItems: "center", flex: 1 }}>
        <TouchableOpacity onPress={handlePreviousCategory}>
          <Icon name="arrow-left" color={primary} size={35} />
        </TouchableOpacity>
        <Animated.Text
          style={{
            fontWeight: "bold",
            fontSize,
            color: primary
          }}>
          {categories[categoryIndex]}
        </Animated.Text>
        <TouchableOpacity onPress={handleNextCategory}>
          <Icon name="arrow-right" color={primary} size={35} />
        </TouchableOpacity>
      </Row>
    </View>
  );
}
