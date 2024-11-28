import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import api from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../components/Input';
import Button from '../components/Button';
import User from '../models/User';
import TypeAccountEnum from '../models/TypeAccountEnum';

const LoginScreen: React.FC = ({ navigation }) => {
  const handleLogin = async () => {
    // O typeAccount ainda está sendo passado hardcoded
    const user = new User(email, password, TypeAccountEnum.VOLUNTEER);

    try {
      console.log(JSON.stringify(user));
      const response = await api.post('/user/getToken', user);
      
      const token = response.data;

      // console.log('Resposta do login:', response);
      console.log('Token LoginScreen:', token);  
  
      await AsyncStorage.setItem('authToken', token);
  
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      navigation.navigate('HomeScreen');
      
    } 
    catch(error) {
      console.error('Erro no login:', error);
    }

  };
  
  const [pingResponse, setPingResponse] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await api.get('/user/ping');
      const responseData = response.data;
      console.log(responseData);
      setPingResponse(responseData.message);
    } 
    catch(error) {
      console.error('Erro na requisição:', error);
    }
  };


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    
  return(
    <View style={styles.container}>
      <Text>Luchkasz</Text>
      <Text>Resposta do Ping: {pingResponse}</Text>

      <View style={styles.inputs}>
        <Input placeholder="Email" onChange={(value) => setEmail(value)} />
        <Input placeholder="Senha" secureTextEntry={true} onChange={(value) => setPassword(value)} />
      </View>

      <View style={styles.button}>
        <Button title="Login" onPress={handleLogin} />

        <Button title="Ping" onPress={fetchData} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputs: {
    width: '100%',
    gap: 15,
  },
  button: {
    marginTop: 20,
    width: '80%',
    gap: 15,
  }
});

export default LoginScreen;