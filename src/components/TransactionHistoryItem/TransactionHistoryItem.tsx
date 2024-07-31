import { Icon, useTheme } from '@rneui/themed';
import { View, Text } from 'react-native';
import { TransactionType } from '../../types/models';
import { baseCurrency, transactionTypeColors, transactionTypeSign } from '../../config';

interface TransactionHistoryItemProps {
  category?: string;
  title?: string;
  type?: TransactionType;
  amount?: number;
}

export default function TransactionHistoryItem({ title, category, type, amount }: TransactionHistoryItemProps) {
  const { theme: { colors: { greyOutline, grey5 } } } = useTheme();

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
            <Text style={{ fontWeight: "bold", fontSize: 10, opacity: 0.5 }}>{category ?? "Transaction"}</Text>
            <Text style={{ fontWeight: "bold", fontSize: 12 }}>{title.length >= maxChars ? `${title.slice(0, maxChars)}...` : title}</Text>
          </View>
        </View>

        <Text style={{ color: transactionTypeColors[type] }}>{`${transactionTypeSign[type]}${amount} ${baseCurrency}`}</Text>
      </View>
    </View>
  );
}
