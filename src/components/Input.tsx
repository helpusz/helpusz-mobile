import { View, TextInput, StyleSheet, KeyboardTypeOptions } from "react-native";
import COLORS from "../constants/colors";

interface InputProps {
  placeholder: string;
  onChange: (value: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        onChangeText={props.onChange}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
      >
      </TextInput>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },

  input: {
    borderRadius: 8,
    width: '100%',
    padding: 10,
    fontSize: 17,
    backgroundColor: COLORS.secondary,
    color: COLORS.primary,
    fontWeight: '700',
  },
});

export default Input;
