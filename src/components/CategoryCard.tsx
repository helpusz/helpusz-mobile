import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import COLORS from '../constants/colors';

interface CategoryCardProps {
  title: string;
  onPress: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = (props) => {

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={props.onPress}
    >
      <Text style={styles.placeholder}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 120,
    maxWidth: 120,
    justifyContent: 'center',
  },

  placeholder: {
    color: COLORS.white,
    textAlign: 'center',
    flexWrap: 'wrap',
    width: '100%',
  }
});

export default CategoryCard;
