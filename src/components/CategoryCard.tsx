import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import COLORS from '../constants/colors';

interface CategoryCardProps {
  title: string;
  onPress: () => void;
  image: any;
}

const CategoryCard: React.FC<CategoryCardProps> = (props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={props.onPress}>
      <View style={styles.imageContainer}>
        <Image source={props.image} style={styles.image} resizeMode="contain" />
      </View>
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 100,
    maxWidth: 100,
  },

  imageContainer: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  title: {
    color: COLORS.black,
    textAlign: 'center',
    fontSize: 14,
    flexWrap: 'wrap',
  },
});

export default CategoryCard;
