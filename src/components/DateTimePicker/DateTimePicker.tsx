import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { View, Text, TouchableOpacity, ViewStyle } from "react-native";
import { TextInput } from "../Input";
import { mom } from "../../lib/moment";

type DateTimePickerProps = {
  date: Date;
  onChange: (value: Date) => void;
  mode: "date" | "time";
  errorMessage?: string;
  containerStyle?: ViewStyle;
  label?: string;
}

export default function DateTimePicker({ label, date, mode, errorMessage, onChange, containerStyle }: DateTimePickerProps) {

  const onOpenDatePicker = () => {
    DateTimePickerAndroid.open({
      mode,
      value: date ?? new Date(),
      onChange: (_e, date) => {
        onChange(date);
      },
    });
  }

  const format = (mode === "date") ? "DD/MM/YY" : "HH:MM";

  return (
    <View style={[{ marginVertical: 10 }, containerStyle]}>
      <Text style={{ marginBottom: -2, fontWeight: "bold" }}>{label}</Text>
      <TouchableOpacity
        onPress={onOpenDatePicker}>
        <TextInput
          disabled
          placeholder="Press to select a date"
          errorMessage={errorMessage}
          value={date ? mom(date).format(format) : null}
        />
      </TouchableOpacity>
    </View>
  )
}
