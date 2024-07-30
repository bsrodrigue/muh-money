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


export default function CreateBudgetForm() {
  const { theme: { colors: { primary } } } = useTheme();
  const [optionsEnabled, setOptionsEnabled] = useState(false);
  const [linkedAccount, setLinkedAccount] = useState("");
  const [dateLimit, setDateLimit] = useState<Date>(new Date());

  return (
    <ExpandingView style={{ paddingHorizontal: 10 }}>
      <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Create Budget</Text>
        <ToggleButton onChange={(active) => setOptionsEnabled(active)} />
      </Row>

      <TextInput label={`Budget name`} />
      <TextInput label={`Budget Limit`} keyboardType='numeric' />

      {
        optionsEnabled && (
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 14, marginBottom: -10 }}>Date Limit</Text>
            <DateTimePicker date={dateLimit} mode="date" onChange={(value) => setDateLimit(value)} />
          </View>
        )
      }

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

      <Button title="Submit" />
    </ExpandingView>
  );
}
