import { useTheme } from "@rneui/themed";
import Animated, { interpolate, interpolateColor, runOnJS, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Text, TouchableOpacity } from 'react-native'

interface ToggleButtonProps {
  isActiveByDefault: boolean;
  onChange: (active: boolean) => void;
}

export default function ToggleButton({ isActiveByDefault, onChange }: ToggleButtonProps) {
  const { theme: { colors: { primary, greyOutline, grey2, primaryLight } } } = useTheme();
  const toggled = useSharedValue(isActiveByDefault ? 1 : 0);

  const toggleButtonAnimatedContainerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      toggled.value,
      [0, 1],
      [greyOutline, primaryLight]
    )
  }));

  const toggleButtonAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      toggled.value,
      [0, 1],
      [grey2, primary]
    ),

    transform: [
      {
        translateX: interpolate(
          toggled.value,
          [0, 1],
          [0, 23]
        )
      }
    ]
  }));

  return (
    <TouchableOpacity style={{ alignItems: "flex-end", gap: 3 }} onPress={() => {
      toggled.value = withSpring((toggled.value === 1) ? 0 : 1, {}, () => {
        runOnJS(onChange)(toggled.value === 1);
      });
    }}>
      <Text style={{ opacity: 0.5, fontWeight: "bold", fontSize: 10 }}>Advanced options</Text>
      <Animated.View
        style={[toggleButtonAnimatedContainerStyle, {
          width: 40, height: 15, borderRadius: 25,
          flexDirection: "row", alignItems: "center", paddingVertical: 5, paddingHorizontal: 3
        }]}>
        <Animated.View style={[toggleButtonAnimatedStyle, { height: 10, width: 10, borderRadius: 50 }]} />
      </Animated.View>
    </TouchableOpacity>
  );
}
