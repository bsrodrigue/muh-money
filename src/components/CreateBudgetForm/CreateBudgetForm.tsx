import { useTheme } from '@rneui/themed';
import { useState } from 'react';
import { FlatList, View } from 'react-native';
import { ExpandingView } from '../ExpandingView';
import { Row } from '../Row';
import { ToggleButton } from '../ToggleButton';
import { FilterBadge } from '../FilterBadge';
import { TextInput } from '../Input';
import { Button } from '../Button';
import { DateTimePicker } from '../DateTimePicker';
import { Budget } from '../../types/models';
import { useAccountStore } from '../../stores';
import Crypto from '../../lib/crypto';
import { Text } from '../Text';

interface CreateBudgetFormProps {
  onCreate: (budget: Budget) => void;
}

export default function CreateBudgetForm({ onCreate }: CreateBudgetFormProps) {
  const { theme: { colors: { primary, error } } } = useTheme();
  const { items } = useAccountStore();
  const [optionsEnabled, setOptionsEnabled] = useState(false);
  const [accountTitle, setAccountTitle] = useState(items[0]?.title ?? "");
  const [limitDate, setLimitDate] = useState<Date>();
  const [title, setTitle] = useState("");
  const [limit, setLimit] = useState("");

  const hasAccounts = items.length !== 0;

  const isValid = (title && limit);

  const onSubmit = () => {
    const uuid = Crypto.generateRandomUUID();
    const account = items.find((item) => item.title === accountTitle);
    const data: Budget = {
      uuid,
      title, linkedAccount: account.uuid,
      limitDate: limitDate?.toISOString() ?? "",
      balance: parseInt(limit),
    }

    onCreate(data);
  };

  return (
    <ExpandingView style={{ paddingHorizontal: 10 }}>
      <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
        <Text weight='700' style={{ fontSize: 18 }}>Create Budget</Text>
        <ToggleButton onChange={(active) => setOptionsEnabled(active)} />
      </Row>
      <TextInput label={`Budget name`} onChangeText={setTitle} />
      <TextInput label={`Budget Limit`} keyboardType='numeric' onChangeText={setLimit} />
      {
        optionsEnabled && (
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 14, marginBottom: -10 }}>Date Limit</Text>
            <DateTimePicker date={limitDate} mode="date" onChange={(value) => setLimitDate(value)} />
          </View>
        )
      }
      {
        (hasAccounts) && (
          <>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>Linked Account</Text>
            <FlatList
              contentContainerStyle={{
                gap: 10,
                paddingVertical: 10
              }}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={items}
              renderItem={({ item, index }) => (
                <FilterBadge
                  onPress={(value) => {
                    setAccountTitle(value)
                  }}
                  activeColor={primary}
                  label={item.title}
                  active={accountTitle === item.title} key={index} />
              )}
            />
          </>
        )
      }
      {
        (!hasAccounts) && (
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 12, color: error, marginTop: 5 }}>
              You need to create at least one account to proceed
            </Text>
          </View>
        )
      }
      <Button disabled={!isValid || !hasAccounts} title="Submit" onPress={onSubmit} />
    </ExpandingView>
  );
}
