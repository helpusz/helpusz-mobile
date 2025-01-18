import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationProp, useRoute } from '@react-navigation/native';
import { handleTabNavigation } from '../utils/navigateUtil';
import BottomNavigation from './BottomNavigation';

interface LayoutProps {
  children: React.ReactNode;
  navigation: NavigationProp<any>;
}

const Layout: React.FC<LayoutProps> = ({ children, navigation }) => {
  const noBottomNavigationScreens = ['LoginScreen', 'SignupScreen'];
  const route = useRoute();
  const isBottomNavigationVisible = !noBottomNavigationScreens.includes(route.name);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {children}
      </View>
      
      {isBottomNavigationVisible && (
        <BottomNavigation onTabPress={(tabName) => handleTabNavigation(tabName, navigation)} />
      )}
    </View>
  );
};

export default Layout;
