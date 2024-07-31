import { useTheme } from '@rneui/themed';
import { Text, View } from 'react-native';
import { ExpandingView } from '../ExpandingView';
import { Row } from '../Row';
import { ToggleButton } from '../ToggleButton';
import { TextInput } from '../Input';
import { Button } from '../Button';
import { Transaction } from '../../types/models';
import { useEffect, useState } from 'react';
import { useSharedValue, withSpring } from 'react-native-reanimated';

interface EditTransactionFormProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (uuid: string) => void;
}

export default function EditTransactionForm({ transaction, onEdit, onDelete }: EditTransactionFormProps) {
  const { theme: { colors: { error, black } } } = useTheme();
  const [optionsIsActive, setOptionsIsActive] = useState(false);
  const [title, setTitle] = useState(transaction.title);
  const [amount, setAmount] = useState(transaction.amount.toString());
  const height = useSharedValue(10);

  const onSubmit = () => {
    const data: Transaction =
      Object.assign(transaction, { title, amount: parseFloat(amount) });

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

      <TextInput
        label={`Budget Limit`}
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
