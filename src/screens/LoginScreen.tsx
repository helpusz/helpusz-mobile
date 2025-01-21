import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import api from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../components/Input';
import Button from '../components/Button';
import Layout from '../components/Layout';
import COLORS from '../constants/colors';
import { User } from '../models/User';

const LoginScreen: React.FC = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async () => {
    const user: User = {
      email,
      password,
    }

    try {
      console.log(user);
      const response = await api.post('/user/getToken', user);
      
      const token = response.data;

      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('email', email);
  
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      navigation.navigate('HomeScreen');
    } 
    catch(error) {
      console.error('Erro no login:', error);
    }
  };
    
  return(
    <Layout navigation={navigation}>
      <View style={styles.titleView}>
        <Text style={styles.title}>
          Que bom ter você de volta!
        </Text>
      </View>
      
      <View style={styles.main}>
        <View style={styles.inputs}>
          <Input placeholder="Email" onChange={(value) => setEmail(value)} keyboardType="email-address" />
          <Input placeholder="Senha" secureTextEntry={true} onChange={(value) => setPassword(value)} />
        </View>
      </View>

      <View style={styles.actions}>
        <Button
          title="Login"
          onPress={handleLogin}
        />

        <View style={styles.actionsForgotPassword}>
          <Text>Esqueceu a senha?</Text>
          <Text style={styles.forgotPasswordText} onPress={() => navigation.navigate('ForgotPasswordScreen')}>
            Recupere aqui
          </Text>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  titleView: {
    width: '100%',
  },
  
  title: {
    fontFamily: 'Casual',
    fontSize: 44,
    color: COLORS.primary,
  },

  main: {
    width: '100%',
    gap: 15,
    justifyContent: 'space-around',
    height: '65%',
  },

  inputs: {
    gap: 15,
  },

  actions: {
    width: '100%',
  },

  actionsForgotPassword: {
    marginTop: 8,
    alignItems: 'center',
  },

  forgotPasswordText: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});

export default LoginScreen;