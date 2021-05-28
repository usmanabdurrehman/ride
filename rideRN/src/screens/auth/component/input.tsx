import React from "react";
import { Control, Controller, FieldValues, FormState, Validate, ValidationRule } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { LayoutAnimationConfigure } from "../../../contants/functions";
import { heightRef, widthRef } from "../../../contants/screenSize";

interface Props {
  control: Control<FieldValues>;
  formState: FormState<FieldValues>;
  name: string;
  rules?: any;
  label: string;
}
const InputControlComponent = ({ control, formState, name, rules, label }: Props) => {
  const [error, setError] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");

  React.useEffect(() => {
    if (formState.errors[name]) {
      setError(true);
      setMessage(formState.errors[name].message);
    } else setError(false);
    LayoutAnimationConfigure();
  }, [formState.errors[name]]);

  return (
    <View style={{ width: "100%" }}>
      <Controller
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            label={label}
            onChangeText={(value) => onChange(value)}
            value={value}
            error={error}
            style={{ backgroundColor: "white" }}
          />
        )}
        defaultValue=""
        {...{
          name,
          control,
          rules,
        }}
      />
      {error && <Text style={styles.errorText}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 30 * heightRef,
  },
  input: { backgroundColor: "white" },
  errorText: { color: "red", paddingHorizontal: 10 * widthRef },
});

export default InputControlComponent;
