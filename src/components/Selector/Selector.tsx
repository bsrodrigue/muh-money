import { useEffect, useState } from 'react';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { View, Text, TouchableOpacity } from 'react-native'
import { Row } from '../Row';
import { Icon } from '@rneui/base';
import { useTheme } from '@rneui/themed';

interface SelectorProps {
  label?: string;
  options: string[];
  defaultValue?: string;
  onChange?: (index: number) => void;
}

export default function Selector({ label, defaultValue, onChange, options }: SelectorProps) {
  const { theme: { colors: { primary } } } = useTheme();
  const defaultIndex = options.indexOf(defaultValue) ?? 0;
  const [index, setIndex] = useState(defaultIndex);
  const fontSize = useSharedValue(14);

  const handleNext = () => {
    if (index >= options.length - 1) return;
    setIndex(index + 1);
  }

  const handlePrevious = () => {
    if (index <= 0) return;
    setIndex(index - 1);
  }

  useEffect(() => {
    onChange?.(index);
  }, [index]);

  return (
    <View style={{ flexGrow: 1, justifyContent: "space-between" }}>
      <Text style={{
        fontWeight: "bold",
      }}>{label}</Text>
      <Row style={{ justifyContent: "space-between", alignItems: "center", flex: 1 }}>
        <TouchableOpacity onPress={handlePrevious}>
          <Icon name="arrow-left" color={primary} size={35} />
        </TouchableOpacity>
        <Animated.Text
          style={{
            fontWeight: "bold",
            fontSize,
            color: primary
          }}>
          {options[index]}
        </Animated.Text>
        <TouchableOpacity onPress={handleNext}>
          <Icon name="arrow-right" color={primary} size={35} />
        </TouchableOpacity>
      </Row>
    </View>
  );
}
