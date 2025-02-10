import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';

import COLORS from '../constants/colors';
import { User } from '../models/User';
import OngCategoryEnum from '../utils/OngCategoryEnum';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface OngCardProps {
  ong: User;  
  onPress: () => void;
}

const OngCard: React.FC<OngCardProps> = (props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Image 
        source={props.ong.profilePhotoUrl ? { uri: props.ong.profilePhotoUrl } : require('../assets/images/image-not-found.png')} 
        style={styles.image} 
      />
      
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {props.ong.name}
        </Text>

        
        <View style={styles.categoryAndLocationContainer}>
          <View style={styles.row}>
            <Text>
              <MaterialIcons name="category" size={14} color="#000" />
            </Text>

            <Text>
              {OngCategoryEnum[props.ong.category!]}
            </Text>
          </View>
          
          <View style={styles.row}>
            <Text>
              <Icon name="pin-outline" size={14} color={COLORS.black} /> 
            </Text>

            <Text>
              Paranaguá - PR
            </Text>
          </View>
        </View>
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

  categoryAndLocationContainer: {
    flexDirection: 'column',
    gap: 5,
  },

  row : {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  
});

export default OngCard;
