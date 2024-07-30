import { useTheme } from '@rneui/themed';
import { useState } from 'react';
import { Text } from 'react-native';
import { ExpandingView } from '../ExpandingView';
import { Row } from '../Row';
import { ToggleButton } from '../ToggleButton';
import { FilterBadge } from '../FilterBadge';
import { TextInput } from '../Input';
import { Button } from '../Button';
import { BudgetType } from '../../types/models';
import { budgetTypes } from '../../constants';


export default function CreateBudgetForm() {
  const { theme: { colors: { primary } } } = useTheme();
  const [optionsEnabled, setOptionsEnabled] = useState(false);
  const [accountType, setBudgetType] = useState<BudgetType>("Basic");

  return (
    <ExpandingView style={{ paddingHorizontal: 10 }}>
      <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Create Budget</Text>
        <ToggleButton onChange={(active) => setOptionsEnabled(active)} />
      </Row>

      <Row style={{ gap: 5, marginVertical: 10 }}>
        {budgetTypes.map((filter, index) => (
          <FilterBadge
            onPress={(value) => setBudgetType(value as BudgetType)}
            activeColor={primary} label={filter}
            active={accountType === filter} key={index} />
        ))}
      </Row>

      <TextInput label={`${accountType} name`} />
      <TextInput label={`Initial Amount`} />

      <Button title="Submit" />
    </ExpandingView>
  );
}
