import { useTheme } from '@rneui/themed';
import { useState } from 'react';
import { Text } from 'react-native';
import { ExpandingView } from '../ExpandingView';
import { Row } from '../Row';
import { ToggleButton } from '../ToggleButton';
import { FilterBadge } from '../FilterBadge';
import { TextInput } from '../Input';
import { Button } from '../Button';
import { AccountType } from '../../types/models';
import { accountTypes } from '../../constants';


export default function CreateAccountForm() {
  const { theme: { colors: { primary } } } = useTheme();
  const [optionsEnabled, setOptionsEnabled] = useState(false);
  const [accountType, setAccountType] = useState<AccountType>("Cash");

  return (
    <ExpandingView style={{ paddingHorizontal: 10 }}>
      <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Create Account</Text>
        <ToggleButton onChange={(active) => setOptionsEnabled(active)} />
      </Row>

      <Row style={{ gap: 5, marginVertical: 10 }}>
        {accountTypes.map((filter, index) => (
          <FilterBadge
            onPress={(value) => setAccountType(value as AccountType)}
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
