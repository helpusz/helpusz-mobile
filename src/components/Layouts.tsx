import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationProp, useRoute } from '@react-navigation/native';
import { handleTabNavigation } from '../utils/navigateUtil';
import BottomNavigation from './BottomNavigation';
import COLORS from '../constants/colors';

interface LayoutProps {
  children: React.ReactNode;
  navigation: NavigationProp<any>;
}

const Layout: React.FC<LayoutProps> = ({ children, navigation }) => {
  const noBottomNavigationScreens = ['WelcomeScreen', 'LoginScreen', 'SignupScreen'];
  const route = useRoute();
  const isBottomNavigationVisible = !noBottomNavigationScreens.includes(route.name);

  return (
    <View style={styles.container}>
      <View style={styles.childrenContainer}>r
        {children}
      </View>
      
      {isBottomNavigationVisible && (
        <BottomNavigation onTabPress={(tabName) => handleTabNavigation(tabName, navigation)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white,
  },
  
  childrenContainer: {
    flex: 1,
  },
});

export default Layout;
