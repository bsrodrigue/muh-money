import { Icon, useTheme } from '@rneui/themed';
import { View, Text, TouchableOpacity } from 'react-native';

interface TransactionHistoryItemProps {
  category?: string;
  title?: string;
  type?: "income" | "expense" | "transfer";
}

export default function TransactionHistoryItem({ title, category, type }: TransactionHistoryItemProps) {
  const { theme: { colors: { success, greyOutline, grey5 } } } = useTheme();

  return (
    <TouchableOpacity style={[{
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
            padding: 5
          }}>
            <Icon style={{ opacity: 0.5 }} name="money" />
          </View>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 10, opacity: 0.5 }}>Software Engineering Salary</Text>
            <Text style={{ fontWeight: "bold", fontSize: 12 }}>Build a budget manager application</Text>
          </View>
        </View>

        <Text style={{ color: success }}>{`+175.000 FCFA`}</Text>
      </View>
    </TouchableOpacity>
  );
}
