import { useTheme } from '@rneui/themed';
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ExpandingView } from '../ExpandingView';
import { Row } from '../Row';
import { ToggleButton } from '../ToggleButton';
import { FilterBadge } from '../FilterBadge';
import { TextInput } from '../Input';
import { Icon } from '@rneui/base';
import { Button } from '../Button';
import { TransactionType } from '../../types/models';
import { transactionTypeColors } from '../../config';
import { CategorySelect } from '../CategorySelect';

const transactionTypes = [
  "Expense",
  "Income",
  "Transfer"
];

export default function CreateTransactionForm() {
  const { theme: { colors: { primary } } } = useTheme();
  const [optionsEnabled, setOptionsEnabled] = useState(false);
  const [transactionType, setTransactionType] = useState<TransactionType>("Expense");

  return (
    <ExpandingView style={{ paddingHorizontal: 10 }}>
      <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Create Transaction</Text>
        <ToggleButton onChange={(active) => setOptionsEnabled(active)} />
      </Row>

      <Row style={{ gap: 5, marginVertical: 10 }}>
        {transactionTypes.map((filter, index) => (
          <FilterBadge
            onPress={(value) => setTransactionType(value as TransactionType)}
            activeColor={transactionTypeColors[transactionType] ?? primary}
            label={filter} active={transactionType === filter} key={index} />
        ))}
      </Row>


      <TextInput label={`${transactionTypes} name`} />

      <Row style={{ gap: 5 }}>
        <TextInput wrapperStyle={{ flexGrow: 1 }} label="Amount" keyboardType="numeric" />
        {
          transactionType !== "Transfer" && (
            <CategorySelect />
          )
        }
      </Row>
      {
        transactionType === "Transfer" && (
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
