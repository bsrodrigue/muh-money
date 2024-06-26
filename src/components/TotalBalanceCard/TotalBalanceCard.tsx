import { useTheme } from '@rneui/themed';
import { useState, useEffect } from 'react';
import { View, Text } from 'react-native'
import { Spacing } from '../Spacing';
import { Row } from '../Row';
import { ColorDot } from '../ColorDot';
import { shadowStyle } from '../../themes/shadow';

interface TotalBalanceCardProps {

}

export default function TotalBalanceCard({ }: TotalBalanceCardProps) {
  const [_state, _setState] = useState(null); // Replace by your state...
  const { theme: { colors: { white, primary, success, error } } } = useTheme();

  useEffect(() => {
    // Write your code here...
  }, []);

  return (
    <View style={{
      backgroundColor: primary,
      padding: 20,
      borderRadius: 10,
      justifyContent: "space-between"
    }}>
      <View>
        <Text style={{ color: white, opacity: 0.5 }}>Total Balance</Text>
        <Text style={{ color: white, fontWeight: "bold", fontSize: 25 }}>150.000 FCFA</Text>
      </View>

      <Spacing vertical size={10} />

      <View>
        <Text style={{ color: white, marginBottom: 5, opacity: 0.5 }}>Activities</Text>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <SubCard label='Incomes' balanceString='+175.000 FCFA' color={success} />
          <SubCard label='Expenses' balanceString='-25.000 FCFA' color={error} />
        </View>
      </View>
    </View>
  );
}

interface SubCardProps {
  label: string;
  balanceString: string;
  color: string;
}

function SubCard({ label, balanceString, color }: SubCardProps) {
  const { theme: { colors: { white } } } = useTheme();
  return (
    <View style={[{ backgroundColor: white, padding: 10, flexGrow: 1, borderRadius: 5 }, shadowStyle]}>
      <Row style={{ alignItems: "center", gap: 5 }}>
        <ColorDot color={color} />
        <Text style={{ fontWeight: "bold", fontSize: 12 }}>{label}</Text>
      </Row>
      <Text style={{ fontWeight: "bold" }}>
        {balanceString}
      </Text>
    </View>
  );
}
