import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import api from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen: React.FC = () => {
  const handleLogin = async () => {
    try {
      const response = await api.post('/ong/login', {name: 'lucas', email: 'lucas', password: 'lucas' });
      const token = response.data;

      // console.log('Resposta do login:', response);
      console.log('Token LoginScreen:', token);  
  
      await AsyncStorage.setItem('authToken', token);
  
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } 
    catch (error) {
      console.error('Erro no login:', error);
    }
  };

  useEffect(() => {
    handleLogin();
    
  }, []);
  
  const [pingResponse, setPingResponse] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/ong/ping');
        const responseData = response.data;
        setPingResponse(responseData.message);
      } 
      catch (error) {
        console.error('Erro na requisição:', error);
      }
    };

    fetchData();
  }, []);

  return(
    <View style={styles.container}>
      <Text>Luchkasz</Text>
      <Text>Resposta do Ping: {pingResponse}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;