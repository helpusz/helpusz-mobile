import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import api from '../api/api';
import Button from '../components/Button';
import Layout from '../components/Layout';
import COLORS from '../constants/colors';
import { Activity } from '../models/Activity';
import { User } from '../models/User';

const OngScreen = ({ route, navigation }: any) => {
  const { ongId } = route.params;
  
  /* User */
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);

  const getStorageUser = async () => {
    const userData = await AsyncStorage.getItem('user');
    if(userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    }
  };
  /* User */


  /* Ong */
  const [ong, setOng] = useState<User | null>(null);

  const getOng = async () => {
    try {
      const response = await api.get(`/ong/getById?id=${ongId}`);
      setOng(response.data);
    } 
    catch(error) {
      console.error('Erro ao carregar a ONG:', error);
    }
  };
  /* Ong */
  
  useEffect(() => {
    getStorageUser();
    getOng();
  }, []);

  return (
    <Layout navigation={navigation}>
      {ong ? (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>
            {ong.name}
          </Text>

          <Text style={styles.category}>
            {ong.category}
          </Text> 
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
    fontSize: 20,
    fontWeight: 'bold'
  },

  category: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  
});

export default OngScreen;
