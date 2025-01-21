import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import COLORS from '../constants/colors';
import { Activity } from '../models/Activity';
import Icon from 'react-native-vector-icons/Ionicons';

interface ActivityCardProps {
  activity: Activity;  
  onPress: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = (props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Image source={require('../assets/images/image-not-found.png')} style={styles.image} />
      
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {props.activity.name}
        </Text>

        <Text style={styles.description}>
          {props.activity.description}
        </Text>
        
        <View style={styles.whenAndWhereContainer}>
          <Text style={styles.location}>
            <Icon name="pin-outline" size={14} color={COLORS.black} />
            Paranaguá - PR
          </Text>

          <Text style={styles.date}>
            {/* {new Date(props.activity.startDate).getDate().toString().padStart(2, '0')} */}
            <Icon name="calendar-outline" size={14} color={COLORS.black} />
            11 de Dezembro
          </Text>
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

  description: {
    fontSize: 14,
    color: COLORS.black,
  },

  whenAndWhereContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    textAlign: 'right',
    marginTop: 10,
    gap: 10,
    justifyContent: 'flex-start',
  },

  location: {
  },

  date: {
  }
});

export default ActivityCard;
