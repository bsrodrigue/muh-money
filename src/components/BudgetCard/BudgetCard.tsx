import { View } from 'react-native'
import { Budget } from '../../types/models';
import { useTheme } from '@rneui/themed';
import { Row } from '../Row';
import { baseCurrency } from '../../config';
import { useTransactionStore } from '../../stores/transaction.store';
import { getRealBalanceFromBudget } from '../../lib/budget';
import { Text } from "../Text";

interface BudgetCardProps {
  budget: Budget;
}

export default function BudgetCard({ budget }: BudgetCardProps) {
  const { title, balance } = budget;
  const { theme: { colors: { white, success, error, warning, greyOutline } } } = useTheme();
  const { items: transactions } = useTransactionStore();
  const borderRadius = 10;
  const [currentBalance] = getRealBalanceFromBudget(budget, transactions);

  const truncatedTitle = title.length > 20 ? title.slice(0, 20) + "..." : title;

  const percentage = ((currentBalance / balance) * 100).toFixed();
  const width = `${percentage}%`;

  function getColorByPercentage(percentage: number) {
    const thresholds = [30, 60, 100];
    const colors = [error, warning, success];

    const index = thresholds.findIndex(t => percentage <= t);
    return colors[index];
  }

  const color = getColorByPercentage(parseInt(percentage));

  return (
    <View style={{ backgroundColor: white, padding: 15, paddingHorizontal: 20, borderRadius: 10, marginVertical: 10 }}>
      <Row style={{
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <View>
          <Text weight='300' style={{ fontSize: 20 }}>{truncatedTitle}</Text>
        </View>

        <Text weight='700' style={{ fontSize: 16, color }}>{width}</Text>
      </Row>

      <View style={{ marginVertical: 5 }}>
        <Text weight='700' style={{ opacity: 0.5, marginBottom: -5 }}>Total Balance</Text>
        <Text style={{ fontSize: 30, }}>{`${balance.toLocaleString()} FCFA`}</Text>
      </View>

      <View style={{ position: "relative", backgroundColor: greyOutline, height: 20, borderRadius }}>
        <View style={{ zIndex: 1, position: "absolute", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
          <Text weight='700' style={{ fontSize: 14, opacity: 0.5 }}>{`${currentBalance.toLocaleString()} ${baseCurrency}`}</Text>
        </View>
        <View style={{ height: "100%", width, backgroundColor: color, borderRadius }} />
      </View>
    </View>
  );
}
