import { useTheme } from '@rneui/themed';
import { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { ExpandingView } from '../ExpandingView';
import { Row } from '../Row';
import { ToggleButton } from '../ToggleButton';
import { FilterBadge } from '../FilterBadge';
import { TextInput } from '../Input';
import { Button } from '../Button';
import { accounts } from '../../mock';
import { DateTimePicker } from '../DateTimePicker';
import { Budget } from '../../types/models';

interface EditBudgetFormProps {
  budget: Budget;
};

export default function EditBudgetForm({ budget: { title, balance, linkedAccount: defaultLinkedAccount, limitDate } }: EditBudgetFormProps) {
  const { theme: { colors: { primary, error, black } } } = useTheme();
  const [optionsEnabled, setOptionsEnabled] = useState(false);
  const [linkedAccount, setLinkedAccount] = useState(defaultLinkedAccount);
  const [dateLimit, setDateLimit] = useState<Date>(null);

  return (
    <ExpandingView style={{ paddingHorizontal: 10 }}>
      <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Edit Budget</Text>
        <ToggleButton onChange={(active) => setOptionsEnabled(active)} />
      </Row>

      <TextInput label={`Budget name`} defaultValue={title} />
      <TextInput label={`Budget Limit`} keyboardType='numeric' defaultValue={balance.toString()} />


      <Text style={{ fontWeight: "bold", fontSize: 14 }}>Linked Account</Text>
      <FlatList
        contentContainerStyle={{
          gap: 10,
          paddingVertical: 10
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={accounts}
        renderItem={({ item, index }) => (
          <FilterBadge
            onPress={(value) => {
              const alreadySelected = (value == linkedAccount);
              setLinkedAccount(alreadySelected ? "" : value)
            }}
            activeColor={primary}
            label={item.title}
            active={linkedAccount === item.title} key={index} />
        )}
      />

      {
        optionsEnabled && (
          <>
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 14, marginBottom: -10 }}>Date Limit</Text>
              <DateTimePicker date={dateLimit} mode="date" onChange={(value) => setDateLimit(value)} />
            </View>

            <View style={{ marginVertical: 10 }}>
              <Button color={error} titleStyle={{ color: black, opacity: 0.5, fontWeight: "bold" }}>Delete Budget</Button>
              <Text style={{ fontWeight: "bold", fontSize: 12, color: error, marginTop: 5 }}>
                Warning: Deleting your budget will also lead to losing all your related transactions
              </Text>
            </View>

          </>
        )
      }



      <Button title="Submit" />
    </ExpandingView>
  );
}
