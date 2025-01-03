import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button, Alert } from 'react-native';
import api from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Activity {
  id: string;
  ongId: string;
  name: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  limitInscriptionDate: string;
  quantityVolunteersAvailable: number;
  volunteers: string[];
  actitivityStatusEnum: string;
  activityVisibilityEnum: string;
  tags: string[];
  imageURL: string;
}

const ActivityScreen: React.FC = ({ route }) => {
  const { activityId } = route.params;
  const [activity, setActivity] = useState<Activity | null>(null);
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);

  const getActivityDetails = async () => {
    try {
      const response = await api.get(`/activity/${activityId}`);
      setActivity(response.data);
    } catch (error) {
      console.error('Erro ao carregar os detalhes da atividade:', error);
    }
  };

  const getStorageUser = async () => {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    }
  };

  const handleEnterActivity = async () => {
    if (!user || !activity) {
      Alert.alert('Erro', 'Informações do usuário ou atividade não encontradas.');
      return;
    }

    try {
      const response = await api.post('/activity/enterIntoActivity', {
        userId: user.id,
        activityId: activity.id,
      });
      Alert.alert('Sucesso', 'Inscrição feita com sucesso!');
    } catch (error) {
      console.error('Erro ao se inscrever na atividade:', error);
      Alert.alert('Erro', 'Não foi possível realizar a inscrição. Tente novamente.');
    }
  };

  useEffect(() => {
    getActivityDetails();
    getStorageUser();
  }, [activityId]);

  return (
    <ScrollView style={styles.container}>
      {activity ? (
        <>
          <Image source={{ uri: activity.imageURL }} style={styles.image} />
          <Text style={styles.title}>{activity.name}</Text>
          <Text style={styles.description}>{activity.description}</Text>
          <Text style={styles.location}>
            <Text style={styles.label}>Local:</Text> {activity.location}
          </Text>
          <Text style={styles.date}>
            <Text style={styles.label}>Início:</Text>{' '}
            {new Date(activity.startDate).toLocaleString()}
          </Text>
          <Text style={styles.date}>
            <Text style={styles.label}>Término:</Text>{' '}
            {new Date(activity.endDate).toLocaleString()}
          </Text>
          <Text style={styles.date}>
            <Text style={styles.label}>Inscrições até:</Text>{' '}
            {new Date(activity.limitInscriptionDate).toLocaleString()}
          </Text>
          <Text style={styles.volunteers}>
            <Text style={styles.label}>Vagas disponíveis:</Text>{' '}
            {activity.quantityVolunteersAvailable}
          </Text>
          <Text style={styles.status}>
            <Text style={styles.label}>Status:</Text> {activity.actitivityStatusEnum}
          </Text>
          <Text style={styles.visibility}>
            <Text style={styles.label}>Visibilidade:</Text>{' '}
            {activity.activityVisibilityEnum}
          </Text>
          <View>
            <Text style={styles.label}>Tags:</Text>
            {activity.tags.map((tag, index) => (
              <Text key={index}>{tag}</Text>
            ))}
          </View>
          <Button
            title="Participar da Atividade"
            onPress={handleEnterActivity}
          />
        </>
      ) : (
        <Text style={styles.loading}>Carregando...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  location: {
    fontSize: 14,
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    marginBottom: 5,
  },
  volunteers: {
    fontSize: 14,
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    marginBottom: 5,
  },
  visibility: {
    fontSize: 14,
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  loading: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ActivityScreen;
