import { View, FlatList, TouchableOpacity } from 'react-native'
import { CenteringView } from '../CenteringView';
import { TransactionHistoryItem } from '../TransactionHistoryItem';
import { Transaction } from '../../types/models';
import { Icon, useTheme } from '@rneui/themed';
import { Text } from '../Text';

interface TransactionListProps {
  transactions: Transaction[];
  emptyStr?: string;
  onPress?: (transaction: Transaction) => void;
}

export default function TransactionList({ transactions, emptyStr, onPress }: TransactionListProps) {
  const { theme: { colors: { black } } } = useTheme();

  return (
    <FlatList
      contentContainerStyle={{
        gap: 5,
        paddingVertical: 10,
        flex: 1,
      }}
      keyExtractor={(item) => item.uuid}
      data={transactions}
      ListEmptyComponent={
        <CenteringView>
          <View style={{ opacity: 0.5 }}>
            <Icon size={50} name="inbox" type="feather" color={black} />
            <Text weight="700" style={{ marginTop: 10 }}>{emptyStr}</Text>
          </View>
        </CenteringView>
      }
      renderItem={({ item }) => (
        <TouchableOpacity onLongPress={() => onPress(item)}>
          <TransactionHistoryItem transaction={item} />
        </TouchableOpacity>
      )} />
  );
}
