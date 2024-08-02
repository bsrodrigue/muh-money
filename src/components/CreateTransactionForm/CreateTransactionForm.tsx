import { useTheme } from '@rneui/themed';
import { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ExpandingView } from '../ExpandingView';
import { Row } from '../Row';
import { FilterBadge } from '../FilterBadge';
import { TextInput } from '../Input';
import { Icon } from '@rneui/base';
import { Button } from '../Button';
import { Transaction, TransactionType } from '../../types/models';
import { transactionTypeColors } from '../../config';
import { DateTimePicker } from '../DateTimePicker';
import { Selector } from '../Selector';
import { useBudgetStore } from '../../stores';
import Crypto from '../../lib/crypto';
import { Text } from '../Text';

const transactionTypes = [
  "Expense",
  "Income",
  // "Transfer"
];

interface CreateTransactionFormProps {
  onCreate: (transaction: Transaction) => void;
}

export default function CreateTransactionForm({ onCreate }: CreateTransactionFormProps) {
  const { theme: { colors: { primary, error } } } = useTheme();
  const [transactionType, setTransactionType] = useState<TransactionType>("Expense");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("0");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [budgetId, setBudgetId] = useState("");

  const { items: budgets } = useBudgetStore();

  const hasBudgets = budgets.length !== 0;

  const onSubmit = () => {
    const uuid = Crypto.generateRandomUUID();
    const budget = budgets.find((budget) => budget.uuid === budgetId);

    const data: Transaction = {
      uuid,
      title,
      date: date.toISOString(),
      time: time.toISOString(),
      amount: parseFloat(amount),
      type: transactionType,
      accountId: budget.linkedAccount,
      budgetId: budget.uuid,
    }

    onCreate(data);
  };

  return (
    <ExpandingView style={{ paddingHorizontal: 10 }}>
      <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
        <Text weight='700' style={{ fontSize: 18 }}>Create Transaction</Text>
      </Row>

      <Row style={{ gap: 5, marginVertical: 10 }}>
        {transactionTypes.map((filter, index) => (
          <FilterBadge
            onPress={(value) => setTransactionType(value as TransactionType)}
            activeColor={transactionTypeColors[transactionType] ?? primary}
            label={filter} active={transactionType === filter} key={index} />
        ))}
      </Row>

      <TextInput label={`${transactionType} name`} onChangeText={setTitle} />

      <TextInput wrapperStyle={{ flexGrow: 1 }} label="Amount" keyboardType="numeric" onChangeText={setAmount} />

      <Row>
        {hasBudgets &&
          (<Selector
            label="Budget"
            defaultValue={budgets[0].title}
            options={budgets.map((budget) => budget.title)}
            onChange={(index) => setBudgetId(budgets[index].uuid)}
          />)}
        {
          !hasBudgets &&
          (
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontWeight: "bold", fontSize: 12, color: error, marginTop: 5 }}>
                You need to create at least one budget to proceed
              </Text>
            </View>
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

      <Row style={{ gap: 5 }}>
        <DateTimePicker label="Date" containerStyle={{ flexGrow: 1 }} date={date} onChange={setDate} mode="date" />
        <DateTimePicker label="Time" containerStyle={{ flexGrow: 1 }} date={time} onChange={setTime} mode="time" />
      </Row>
      <Button disabled={!hasBudgets} onPress={onSubmit} title="Submit" />
    </ExpandingView>
  );
}
