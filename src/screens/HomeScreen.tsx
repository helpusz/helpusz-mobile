import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import api from '../api/api';

const HomeScreen: React.FC = () => {
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

export default HomeScreen;