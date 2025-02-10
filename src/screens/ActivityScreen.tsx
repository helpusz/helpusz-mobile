import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { act, useEffect, useState } from 'react';
import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import api from '../api/api';
import Button from '../components/Button';
import Layout from '../components/Layout';
import COLORS from '../constants/colors';
import { Activity } from '../models/Activity';
import { User } from '../models/User';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';

const ActivityScreen = ({ route, navigation }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const { activityId } = route.params;
  
  /* User */
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);
  const [volunteers, setVolunteers] = useState<User[]>([]);

  const getStorageUser = async () => {
    const userData = await AsyncStorage.getItem('user');
    if(userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    }
  };

  const getAllVolunteers = async() => {
    try {
      const response = await api.get(`/user/volunteers/${activityId}`); 
      console.log('Dados recebidos:', response.data);
      console.log('Quantidade:', response.data.length);
      setVolunteers(response.data);
    } 
    catch(error) {
      console.error('Erro ao carregar os voluntários:', error);
    }
  };
  
  /* User */

  /* Activity */
  const [activity, setActivity] = useState<Activity | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const getActivityDetails = async () => {
    try {
      const response = await api.get(`/activity/${activityId}`);
      setActivity(response.data);
    } 
    catch(error) {
      console.error('Erro ao carregar os detalhes da atividade:', error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleEnterActivity = async () => {
    if(!user || !activity) {
      Alert.alert('Erro', 'Informações do usuário ou atividade não encontradas.');
      return;
    }

    try {
      await api.post('/activity/enterIntoActivity', {
        userId: user.id,
        activityId: activity.id,
      });
      setIsEnrolled(true);
      Alert.alert('Sucesso', 'Inscrição feita com sucesso!');
    } 
    catch(error) {
      console.error('Erro ao se inscrever na atividade:', error);
      Alert.alert('Erro', 'Não foi possível realizar a inscrição. Tente novamente.');
    }
  };
  /* Activity */

  /* Ong */
  const [ong, setOng] = useState<User | null>(null);

  const getOng = async () => {
    try {
      const response = await api.get(`/ong/getById?id=${activity!.ongId}`);
      setOng(response.data);
    } 
    catch(error) {
      console.error('Erro ao carregar a ONG:', error);
    }
  };

  const handleOngPress = (ongId: string) => {
    navigation.navigate('OngScreen', { ongId });
  };
  /* Ong */
  
  useEffect(() => {
    getStorageUser();
    getActivityDetails();
    getAllVolunteers();
  }, []);

  useEffect(() => {
    if(activity?.ongId) {
      getOng();
    }

    if(user && activity?.volunteers?.includes(user.id)) {
      setIsEnrolled(true);
    } 
    else {
      setIsEnrolled(false);
    }
  }, [activity, user]);

  return (
    <Layout navigation={navigation}>
      {activity && !isLoading ? (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>{activity.name}</Text>

          <View style={styles.who}>
            <Text style={styles.whoText} onPress={() => handleOngPress(activity.ongId)}>
              {ong ? `${ong.name}` : 'Erro ao carregar ONG'}
            </Text>
          </View>

          <View style={styles.when}>
            <Text>
              <Ionicons name="calendar-outline" size={14} color={COLORS.black} />
            </Text>
            <Text>
              {new Date(activity.startDate).toLocaleDateString('pt-BR')} | {new Date(activity.endDate).toLocaleDateString('pt-BR')}
            </Text>
          </View>

          <View style={styles.where}>
            <Text>
              <Icon name="pin-outline" size={14} color={COLORS.black} /> 
            </Text>
            
            <Text>{activity.location}</Text>
          </View>

          <Image 
            source={activity.imageURL ? { uri: activity.imageURL } : require('../assets/images/image-not-found.png')} 
            style={styles.image} 
          />

          <View style={styles.card}>
            <View style={styles.photosContainer}>
              {volunteers.map((volunteer, index) => (
                <Image
                  key={index}
                  source={{ uri: volunteer.profilePhotoUrl }}
                  style={styles.photo}
                />
              ))}
            </View>
            <Text>{activity.volunteers?.length} Participantes</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.subtitle}>Sobre:</Text>
            <Text style={styles.description}>{activity.description}</Text>
          </View>

          <View style={styles.actions}>
            {!isEnrolled && (
              <Button title="Participar!" onPress={handleEnterActivity} />
            )}
          </View>
        </ScrollView>
      ) : (
        <Text>Erro ao carregar Atividade</Text>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 20, 
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    width: '100%',
  },

  who: {
    marginTop: 10,
    width: '100%',
  },

  whoText: {
    fontWeight: 'bold',
  },

  when: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: 8,
  },

  where: {
    flexDirection: 'row',
    width: '100%',
  },

  image: {
    width: '100%',
    height: 200, 
    borderRadius: 10,
    marginTop: 20,
  },

  card: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: COLORS.grey,
    marginTop: 20,
    padding: 10,
  },

  subtitle: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: 'bold',
  },

  photosContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  
  photo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  description: {
    fontSize: 14,
    flexWrap: 'wrap',
    width: '100%',
    textAlign: 'justify',
  },

  actions: {
    width: '100%',
    padding: 30,
  },
});

export default ActivityScreen;
