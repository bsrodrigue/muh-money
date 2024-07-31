import { useTheme } from '@rneui/themed';
import { View, Text } from 'react-native'
import { Row } from '../Row';
import { Account } from '../../types/models';
import { getRealBalanceFromAccount } from '../../lib/account';
import { useTransactionStore } from '../../stores/transaction.store';
import { baseCurrency } from '../../config';

interface AccountCardProps {
  account: Account;
}

export default function AccountCard({ account }: AccountCardProps) {
  const { theme: { colors: { white, success, error } } } = useTheme();
  const { items: transactions } = useTransactionStore();
  const { uuid, title, type } = account;

  const [total, incomes, expenses] = getRealBalanceFromAccount(account, transactions);

  return (
    <View style={{ backgroundColor: white, padding: 10, paddingHorizontal: 20, borderRadius: 10, marginVertical: 10 }}>
      <View>
        <Text style={{ opacity: 0.5, fontWeight: "bold", marginBottom: -5 }}>{type}</Text>
        <Text style={{ fontWeight: "bold", fontSize: 22 }}>{title}</Text>
      </View>
      <View style={{ marginVertical: 5 }}>
        <Text style={{ opacity: 0.5, marginBottom: -5 }}>Total Balance</Text>
        <Text style={{ fontSize: 30, fontWeight: "100" }}>{`${total.toLocaleString()} ${baseCurrency}`}</Text>
      </View>
      <Row style={{ justifyContent: "space-between" }}>
        <View>
          <Text style={{ color: success }}>Incomes</Text>
          <Text>{`${incomes.toLocaleString()} ${baseCurrency}`}</Text>
        </View>

        <View>
          <Text style={{ color: error }}>Expenses</Text>
          <Text>{`${expenses.toLocaleString()} ${baseCurrency}`}</Text>
        </View>
      </Row>
    </View>
  );
}
