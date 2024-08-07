import { Input, InputProps } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { forwardRef } from "react";
import { View, ViewStyle } from "react-native";
import { Text } from "../Text";

type TextInputProps = {
  name?: string;
  label?: string;
  wrapperStyle?: ViewStyle;
} & InputProps;

const TextInput = forwardRef(({ onChange, wrapperStyle, label, inputStyle, errorStyle, ...props }: TextInputProps, ref) => {
  const { theme: { colors: { error } } } = useTheme();
  const borderRadius = 5;
  const backgroundColor = "#f1eff2";

  return (
    <View style={wrapperStyle}>
      {
        label && (
          <Text weight="600">{label}</Text>
        )
      }
      <Input
        errorStyle={
          [
            {
              position: "absolute",
              bottom: -10,
              right: 25,
              backgroundColor: props.errorMessage ? "white" : "transparent",
              paddingHorizontal: 5,
              borderRadius,
              zIndex: 1,
              fontStyle: "italic"
            }, errorStyle
          ]
        }
        containerStyle={{
          marginVertical: 5,
          backgroundColor,
          borderRadius,
        }}
        inputStyle={
          [
            {
              fontSize: 14,
              fontFamily: "font-600",
              height: 30
            },
            inputStyle
          ]
        }
        disabledInputStyle={{
          fontSize: 18,
          fontFamily: "font-600",
          opacity: 1
        }}
        inputContainerStyle={{
          borderColor: props.errorMessage ? error : backgroundColor,
          borderRadius,
          paddingHorizontal: 10,
          marginHorizontal: -10
        }}
        {...props}
        ref={ref}
      />

    </View>
  )
});

export default TextInput;
