import { Icon, useTheme } from '@rneui/themed';
import { View } from 'react-native';
import { Transaction } from '../../types/models';
import { baseCurrency, transactionTypeColors, transactionTypeSign } from '../../config';
import { useBudgetStore } from '../../stores';
import { mom } from '../../lib/moment';
import { Text } from '../Text';
import { Row } from '../Row';

interface TransactionHistoryItemProps {
  transaction: Transaction;
}

export default function TransactionHistoryItem({ transaction: { title, type, amount, budgetId, createdAt } }: TransactionHistoryItemProps) {
  const { theme: { colors: { greyOutline, grey5 } } } = useTheme();
  const { items } = useBudgetStore()

  const budget = items.find((item) => item.uuid === budgetId);

  const maxChars = 30;

  return (
    <View style={[{
      borderWidth: 1,
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderColor: greyOutline
    }]}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <View style={{
            aspectRatio: 1,
            borderRadius: 50,
            backgroundColor: grey5,
            padding: 5,
            marginRight: 5
          }}>
            <Icon style={{ opacity: 0.5 }} name="money" />
          </View>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 10, opacity: 0.5 }}>{budget.title}</Text>
            <Text style={{ fontWeight: "bold", fontSize: 12 }}>{title.length >= maxChars ? `${title.slice(0, maxChars)}...` : title}</Text>
          </View>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <Row style={{ alignItems: "center", gap: 5 }}>
            <Text weight="500" style={{ fontSize: 10, opacity: 0.5 }}>{mom(createdAt).format("DD/MM/YY")}</Text>
            <Icon size={10} name="clock" type="feather" />
          </Row>
          <Text weight='700' style={{ color: transactionTypeColors[type] }}>{`${transactionTypeSign[type]}${amount} ${baseCurrency}`}</Text>
        </View>
      </View>
    </View>
  );
}
