import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import COLORS from '../constants/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  filled?: boolean;
  color?: string;
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = (props) => {
  const filledBgColor = props.color || COLORS.primary;
  const outlinedColor = COLORS.white;
  const bgColor = props.filled ? filledBgColor : outlinedColor;
  const textColor = COLORS.white;

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        ...{ backgroundColor: bgColor },
        ...(props.style as object),
      }}
      onPress={props.onPress}
    >
      <Text style={{ fontSize: 18, ...(props.style as TextStyle), ...{ color: textColor } }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingBottom: 16,
    paddingVertical: 10,
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Button;
