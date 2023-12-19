import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';
import Button from '../components/Button';


const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>helpusz</Text>

      <View style={styles.imageContainer}>
        {/* Mudar para SVG */}
        <Image source={require('../assets/love.png')} style={{ width: '65%', height: '65%' }} />
      </View>
      
      <View style={styles.buttons}>
        <Button
          title="Criar conta"
          onPress={() => {
            console.log(navigation);
            navigation.navigate('SignupScreen');
          }}
          style={styles.button}
        />
        <View>
          <Text style={styles.buttonsText}>
            Já tem uma conta?
          </Text>
          <Text onPress={() => navigation.navigate('LoginScreen')} style={{...styles.buttonsText, ...styles.accentText}}>
            Login
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 22,
    justifyContent: "space-around",
    alignContent: "center",

  },
  title: {
    fontSize: 50,
    fontWeight: "800",
    color: COLORS.primary,
    alignSelf: "center",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  subtitleContainer: {
    marginVertical: 22,
  },
  subtitle: {
    fontSize: 20,
    color: COLORS.white,
  },
  button: {
    backgroundColor: COLORS.primary,
  },
  buttons: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 20,
  },
  buttonsText: {
    textAlign: "center",
  },
  accentText: {
    color: COLORS.primary,
    fontWeight: "700",
  },
});

export default WelcomeScreen;
