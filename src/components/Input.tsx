import { View, TextInput, StyleSheet } from "react-native";
import COLORS from "../constants/colors";

interface InputProps {
  placeholder: string;
  onChange: (value: string) => void;
  secureTextEntry?: boolean;
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        onChangeText={props.onChange}
        secureTextEntry={props.secureTextEntry}
      >
      </TextInput>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 4,
    width: '80%',
    height: 40,
    textAlign: 'center',
    fontSize: 17,
  },
});

export default Input;
