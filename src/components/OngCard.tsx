import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';

import COLORS from '../constants/colors';
import { User } from '../models/User';
import OngCategoryEnum from '../utils/OngCategoryEnum';

interface OngCardProps {
  ong: User;  
  onPress: () => void;
}

const OngCard: React.FC<OngCardProps> = (props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Image source={require('../assets/images/image-not-found.png')} style={styles.image} />
      
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {props.ong.name}
        </Text>

        
        <Text style={styles.category}>
          {OngCategoryEnum[props.ong.category!]}
        </Text>

      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 2,
    alignItems: 'center',
    width: '100%',
    padding: 2,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.grey,
    flexDirection: 'row',
  },

  image: {
    width: 80,
    height: 80,
    padding: 5,
  },

  infoContainer: {
    // flex: 1,
    // justifyContent: 'center',
  },

  name: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
  },

  category: {
    fontSize: 14,
    color: COLORS.black,
  },
});

export default OngCard;
