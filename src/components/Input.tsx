import { View, TextInput, StyleSheet } from "react-native";
import COLORS from "../constants/colors";

interface InputProps {
  placeholder: string;
  // onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        // onChangeText={props.onChange}
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
    height: '25%',
    textAlign: 'center',
    fontSize: 17,
  },
});

export default Input;
