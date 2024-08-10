import { Icon, useTheme } from '@rneui/themed';
import { View } from 'react-native';
import { ExpandingView } from '../ExpandingView';
import { Row } from '../Row';
import { ToggleButton } from '../ToggleButton';
import { TextInput } from '../Input';
import { Button } from '../Button';
import { Transaction, TransactionCategory, TransactionType } from '../../types/models';
import { useEffect, useState } from 'react';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import { Selector } from '../Selector';
import { useBudgetStore, useCategoryStore } from '../../stores';
import { Text } from '../Text';
import { FilterBadge } from '../FilterBadge';
import { transactionTypeColors, transactionTypes } from '../../config';

interface EditTransactionFormProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (uuid: string) => void;
}

export default function EditTransactionForm({ transaction, onEdit, onDelete }: EditTransactionFormProps) {
  const { theme: { colors: { error, black, greyOutline, primary } } } = useTheme();
  const [optionsIsActive, setOptionsIsActive] = useState(false);
  const [transactionType, setTransactionType] = useState<TransactionType>(transaction.type);
  const [title, setTitle] = useState(transaction.title);
  const [amount, setAmount] = useState(transaction.amount.toString());
  const [categoryId, setCategoryId] = useState(transaction.categoryId);
  const [budgetId, setBudgetId] = useState("");

  const { items: categories } = useCategoryStore();
  const { items: budgets } = useBudgetStore();

  const height = useSharedValue(10);

  const hasBudgets = budgets.length !== 0;
  const isTransfer = (transactionType === "Transfer");

  const onSubmit = () => {
    const budget = budgets.find((budget) => budget.uuid === budgetId);
    const data: Transaction =
      Object.assign(transaction, { title, amount: parseFloat(amount), categoryId, budgetId: budget?.uuid, linkedAccount: budget?.linkedAccount });

    onEdit(data);
  }

  useEffect(() => {
    height.value = withSpring(optionsIsActive ? 30 : 10);
  }, [optionsIsActive]);

  return (
    <ExpandingView style={{ paddingHorizontal: 10 }}>
      <Row style={{ justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Edit Transaction</Text>
        <ToggleButton onChange={(active) => setOptionsIsActive(active)} />
      </Row>

      <Row style={{ gap: 5, marginVertical: 10 }}>
        {transactionTypes.map((filter, index) => (
          <FilterBadge
            onPress={(value) => setTransactionType(value as TransactionType)}
            activeColor={transactionTypeColors[transactionType] ?? primary}
            label={filter} active={transactionType === filter} key={index} />
        ))}
      </Row>

      <TextInput
        label={`${transaction.type} name`}
        defaultValue={transaction.title}
        onChangeText={setTitle}
      />

      <TextInput
        label={`Amount`}
        keyboardType='numeric'
        defaultValue={amount}
        onChangeText={setAmount}
      />

      <Row>
        {
          categories.length != 0 && (
            <Selector
              label="Category"
              defaultValue={categories.find((cat) => cat.uuid === categoryId)?.title ?? categories[0].title}
              options={categories.map((category) => category.title)}
              onChange={(index) => {
                setCategoryId(categories[index].uuid);
              }}
              OptionComponent={(optionTitle) => {
                const option = categories.find((item) => item.title === optionTitle) as TransactionCategory;
                return (
                  <Row style={{ alignItems: "center", gap: 10 }}>
                    <View style={{ aspectRatio: 1, borderRadius: 50, borderColor: greyOutline, borderWidth: 1, padding: 5 }}>
                      <Icon size={14} name={option.iconName} type={option.iconFamily} color={option.color} />
                    </View>
                    <Text weight='700'>{option.title}</Text>
                  </Row>
                )
              }}
            />
          )
        }

        {
          !isTransfer && (
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
          )
        }

      </Row>

      {
        optionsIsActive && (
          <View style={{ marginVertical: 10 }}>
            <Button onPress={() => onDelete(transaction.uuid)} color={error}
              titleStyle={{ color: black, opacity: 0.5, fontWeight: "bold" }}>Delete Transaction</Button>
            <Text style={{ fontWeight: "bold", fontSize: 12, color: error, marginTop: 5 }}>
              Warning: Deleting your transaction is irreversible
            </Text>
          </View>
        )
      }

      <Button title="Submit" onPress={onSubmit} />
    </ExpandingView>
  );
}
