import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import COLORS from '../constants/colors';
import Button from '../components/Button';
import Layout from '../components/Layout';

const WelcomeScreen = ({ navigation }: any) => {
  return (
    <Layout navigation={navigation}>
      <Text style={styles.title}>Helpusz</Text>

      <Image source={require('../assets/images/love.png')} style={styles.image} />

      <View style={styles.actions}>
        <Button
          title="Criar conta"
          onPress={() => navigation.navigate('SignupScreen')}
        />

        <View style={styles.actionsAlreadyHaveAccount}>
          <Text>Já tem uma conta?</Text>
          <Text style={styles.loginText} onPress={() => navigation.navigate('LoginScreen')}>
            Login
          </Text>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "Casual",
    textTransform: "lowercase",
    fontSize: 82,
    color: COLORS.primary,
  },

  image: {
    width: '65%',
    height: '65%',
  },

  actions: {
    width: '100%',
  },

  actionsAlreadyHaveAccount: {
    marginTop: 8,
    alignItems: 'center',
  },

  loginText: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});

export default WelcomeScreen;
