import { Button as BaseButton, ButtonProps as BaseButtonProps } from "@rneui/base";
import { useTheme } from "@rneui/themed";

type ButtonProps = BaseButtonProps;

export default function Button({ titleStyle, ...rest }: ButtonProps) {
  const { theme: { colors: { primary } } } = useTheme();

  return (
    <BaseButton
      titleStyle={[{ fontFamily: "font-700", fontSize: 16 }, titleStyle]}
      color={rest.color || primary}
      size="md"
      radius={5}
      disabled={rest.loading || rest.disabled} {...rest} />
  )
}
