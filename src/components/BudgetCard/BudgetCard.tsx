import { View, Text } from 'react-native'
import { Budget } from '../../types/models';
import { useTheme } from '@rneui/themed';
import { Row } from '../Row';

interface BudgetCardProps {
  budget: Budget;
}


const borderRadius = 10;
export default function BudgetCard({ budget: { type, title, balance } }: BudgetCardProps) {
  const { theme: { colors: { white, success, error, warning, greyOutline } } } = useTheme();
  const currentBalance = 20_000;

  const percentage = ((currentBalance / balance) * 100).toFixed();
  const width = `${percentage}%`;

  function getColorByPercentage(percentage: number) {
    const thresholds = [30, 60, 100];
    const colors = [error, warning, success];

    const index = thresholds.findIndex(t => percentage <= t);
    return colors[index];
  }

  const truncatedTitle = title.length > 20 ? title.slice(0, 20) + "..." : title;

  const color = getColorByPercentage(parseInt(percentage));

  return (
    <View style={{ backgroundColor: white, padding: 15, paddingHorizontal: 20, borderRadius: 10, marginVertical: 10 }}>
      <Row style={{
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <View>
          <Text style={{ opacity: 0.5, fontWeight: "normal" }}>{type}</Text>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>{truncatedTitle}</Text>
        </View>

        <Text style={{ fontSize: 16, fontWeight: "bold", color }}>{width}</Text>
      </Row>

      <View style={{ marginVertical: 5 }}>
        <Text style={{ opacity: 0.5, marginBottom: -5 }}>Total Balance</Text>
        <Text style={{ fontSize: 30, fontWeight: "100" }}>{`${balance.toLocaleString()} FCFA`}</Text>
      </View>

      <View style={{ position: "relative", backgroundColor: greyOutline, height: 20, borderRadius }}>
        <View style={{ zIndex: 1, position: "absolute", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 14, fontWeight: "bold", opacity: 0.5 }}>{`${balance.toLocaleString()} FCFA`}</Text>
        </View>
        <View style={{ height: "100%", width, backgroundColor: color, borderRadius }} />
      </View>
    </View>
  );

}
