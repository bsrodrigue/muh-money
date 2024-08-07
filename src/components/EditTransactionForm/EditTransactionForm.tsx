import { Icon, useTheme } from '@rneui/themed';
import { View } from 'react-native';
import { ExpandingView } from '../ExpandingView';
import { Row } from '../Row';
import { ToggleButton } from '../ToggleButton';
import { TextInput } from '../Input';
import { Button } from '../Button';
import { Transaction, TransactionCategory } from '../../types/models';
import { useEffect, useState } from 'react';
import { useSharedValue, withSpring } from 'react-native-reanimated';
import { Selector } from '../Selector';
import { useCategoryStore } from '../../stores';
import { Text } from '../Text';

interface EditTransactionFormProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (uuid: string) => void;
}

export default function EditTransactionForm({ transaction, onEdit, onDelete }: EditTransactionFormProps) {
  const { theme: { colors: { error, black, greyOutline } } } = useTheme();
  const [optionsIsActive, setOptionsIsActive] = useState(false);
  const [title, setTitle] = useState(transaction.title);
  const [amount, setAmount] = useState(transaction.amount.toString());
  const [categoryId, setCategoryId] = useState(transaction.categoryId);
  const { items: categories } = useCategoryStore();
  const height = useSharedValue(10);

  const onSubmit = () => {
    const data: Transaction =
      Object.assign(transaction, { title, amount: parseFloat(amount), categoryId });

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

      <TextInput
        label={`${transaction.type} name`}
        defaultValue={transaction.title}
        onChangeText={setTitle}
      />

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

      <TextInput
        label={`Amount`}
        keyboardType='numeric'
        defaultValue={amount}
        onChangeText={setAmount}
      />

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
