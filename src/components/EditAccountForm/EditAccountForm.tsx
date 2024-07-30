import { useTheme } from '@rneui/themed';
import { useState } from 'react';
import { Text } from 'react-native';
import { ExpandingView } from '../ExpandingView';
import { Row } from '../Row';
import { ToggleButton } from '../ToggleButton';
import { FilterBadge } from '../FilterBadge';
import { TextInput } from '../Input';
import { Button } from '../Button';
import { Account, AccountType } from '../../types/models';
import { accountTypes } from '../../constants';

interface EditAccountFormProps {
  account: Account;
  onPressType?: (type: AccountType) => void;
}

export default function EditAccountForm({ account, onPressType }: EditAccountFormProps) {
  const { theme: { colors: { primary } } } = useTheme();
  const [optionsEnabled, setOptionsEnabled] = useState(false);

  return (
    <ExpandingView style={{ paddingHorizontal: 10 }}>
      <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Edit Account</Text>
        <ToggleButton onChange={(active) => setOptionsEnabled(active)} />
      </Row>

      <Row style={{ gap: 5, marginVertical: 10 }}>
        {accountTypes.map((filter, index) => (
          <FilterBadge onPress={onPressType} activeColor={primary} label={filter} active={account.type === filter} key={index} />
        ))}
      </Row>

      <TextInput label={`Account name`} defaultValue={account.title} />

      <Button title="Submit" />
    </ExpandingView>
  );
}
