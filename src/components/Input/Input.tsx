import { Input, InputProps } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { forwardRef } from "react";

type TextInputProps = InputProps & {
  name?: string;
};

const TextInput = forwardRef(({ onChange, inputStyle, errorStyle, ...props }: TextInputProps, ref) => {
  const { theme: { colors: { error } } } = useTheme();
  const borderRadius = 5;
  const backgroundColor = "#f1eff2";

  return (
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
        marginVertical: 10,
        backgroundColor,
        borderRadius,
      }}
      inputStyle={
        [
          {
            fontSize: 16,
            fontFamily: "Quicksand-600",
            height: 50
          },
          inputStyle
        ]
      }
      disabledInputStyle={{
        fontSize: 18,
        fontFamily: "Quicksand-600",
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
  )
});

export default TextInput;
