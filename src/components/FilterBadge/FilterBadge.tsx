import { useTheme } from '@rneui/themed';
import { TouchableOpacity, Text } from 'react-native';

interface FilterBadgeProps {
  active?: boolean;
  label: string;
}

export default function FilterBadge({ label, active }: FilterBadgeProps) {
  const { theme: { colors: { white, black, primary, greyOutline } } } = useTheme();

  return (
    <TouchableOpacity style={{
      borderRadius: 25,
      backgroundColor: (active) ? primary : greyOutline,
      paddingVertical: 5,
      paddingHorizontal: 20
    }}>
      <Text style={{
        color: (active) ? white : black,
        fontWeight: "bold",
        opacity: (active) ? 1 : 0.5
      }}>{label}</Text>
    </TouchableOpacity>
  );
}
