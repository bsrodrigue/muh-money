import { useTheme } from '@rneui/themed';
import { Text, View } from 'react-native';
import { ExpandingView } from '../ExpandingView';
import { Row } from '../Row';
import { ToggleButton } from '../ToggleButton';
import { TextInput } from '../Input';
import { Button } from '../Button';
import { Transaction } from '../../types/models';
import { useEffect, useState } from 'react';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

interface EditTransactionFormProps {
  transaction: Transaction;
}

export default function EditTransactionForm({ transaction }: EditTransactionFormProps) {
  const { theme: { colors: { error, black } } } = useTheme();
  const [optionsIsActive, setOptionsIsActive] = useState(false);
  const height = useSharedValue(10);

  useEffect(() => {
    height.value = withSpring(optionsIsActive ? 30 : 10);
  }, [optionsIsActive]);

  return (
    <ExpandingView style={{ paddingHorizontal: 10 }}>
      <Row style={{ justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Edit Transaction</Text>
        <ToggleButton onChange={(active) => setOptionsIsActive(active)} />
      </Row>

      <TextInput label={`${transaction.type} name`} defaultValue={transaction.title} />

      {
        optionsIsActive && (
          <Animated.View style={[{ marginVertical: 10, height }]}>
            <Button color={error} title="Delete Account" titleStyle={{
              color: black,
              opacity: 0.5,
            }} />
            <Text style={{
              color: error,
              marginVertical: 5
            }}>
              Warning: Deleting this transaction is irreversible and will not reset the state of your accounts
            </Text>
          </Animated.View>
        )
      }

      <Button title="Submit" />
    </ExpandingView>
  );
}
