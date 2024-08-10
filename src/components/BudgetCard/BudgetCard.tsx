import { LayoutChangeEvent, View } from 'react-native'
import { Budget } from '../../types/models';
import { useTheme } from '@rneui/themed';
import { Row } from '../Row';
import { baseCurrency } from '../../config';
import { useTransactionStore } from '../../stores/transaction.store';
import { getRealBalanceFromBudget } from '../../lib/budget';
import { Text } from "../Text";
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { truncate } from '../../lib/utils';

interface BudgetCardProps {
  budget: Budget;
}

export default function BudgetCard({ budget }: BudgetCardProps) {
  const { title, balance } = budget;
  const { theme: { colors: { white, success, error, warning, greyOutline } } } = useTheme();
  const { items: transactions } = useTransactionStore();
  const borderRadius = 10;
  const [currentBalance] = getRealBalanceFromBudget(budget, transactions);

  const truncatedTitle = truncate(title, 20);

  const percentage = ((currentBalance / balance) * 100).toFixed();
  const progressWidth = useSharedValue(0);
  const parentWidth = useSharedValue(0);


  useFocusEffect(useCallback(() => {
    const p = parseInt(percentage);

    if (parentWidth.value > 0) {
      progressWidth.value = withTiming(
        (((p > 0) ? (p > 100 ? 100 : p) : 0) / 100) * parentWidth.value, { duration: 1000 }
      );
    }

    return () => {
      progressWidth.value = 0;
    }
  }, [percentage]));

  const onLayout = (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    const p = parseInt(percentage);
    parentWidth.value = width;
    progressWidth.value = (((p > 0) ? (p > 100 ? 100 : p) : 0) / 100) * width;
  }


  function getColorByPercentage(percentage: number) {
    const thresholds = [30, 60, 100];
    const colors = [error, warning, success];

    const index = thresholds.findIndex(t => percentage <= t);
    if (index == -1) return success;
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
          <Text weight='500' style={{ fontSize: 20 }}>{truncatedTitle}</Text>
        </View>

        <Animated.Text style={{ fontSize: 16, color, fontFamily: "font-700" }}>{`${percentage}%`}</Animated.Text>
      </Row>

      <View style={{ marginVertical: 5 }}>
        <Text weight='700' style={{ opacity: 0.5, marginBottom: -5 }}>Total Balance</Text>
        <Text style={{ fontSize: 30, }}>{`${balance.toLocaleString()} FCFA`}</Text>
      </View>

      <View onLayout={onLayout} style={{ position: "relative", backgroundColor: greyOutline, height: 20, borderRadius }}>
        <View style={{ zIndex: 1, position: "absolute", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
          <Text weight='700' style={{ fontSize: 14, opacity: 0.5 }}>{`${currentBalance.toLocaleString()} ${baseCurrency}`}</Text>
        </View>
        <Animated.View style={{ height: "100%", width: progressWidth, backgroundColor: color, borderRadius }} />
      </View>
    </View>
  );
}
