import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import api from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Activity {
  id: string;
  name: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  imageURL: string;
}

const HomeScreen: React.FC = ({ navigation }) => {
  const [user, setUser] = useState<{ name: string }>();
  const [activities, setActivities] = useState<Activity[]>([]);

  const getActivities = async () => {
    try {
      const response = await api.get('/activity/getAll');
      setActivities(response.data);
    } 
    catch(error) {
      console.error('Erro na requisição:', error);
    }
  };

  const getStorageUser = async () => {
    const userData = await AsyncStorage.getItem('user');
    if(userData) {
      const user = JSON.parse(userData);
      setUser(user);
    }
  };

  useEffect(() => {
    getActivities();
    getStorageUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Olá {user?.name}</Text>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ActivityScreen', { activityId: item.id })}
          >
            <Image source={{ uri: item.imageURL }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.location}>{item.location}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  greeting: {
    fontSize: 18,
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
  },
  cardContent: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  location: {
    fontSize: 12,
    color: '#888',
  },
});

export default HomeScreen;
