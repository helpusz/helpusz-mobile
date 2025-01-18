import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { handleTabNavigation } from '../utils/navigateUtil';
import BottomNavigation from './BottomNavigation';

interface LayoutProps {
  children: React.ReactNode;
  navigation: NavigationProp<any>;
}

const Layout: React.FC<LayoutProps> = ({ children, navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {children}
      </View>
      
      <BottomNavigation onTabPress={(tabName) => handleTabNavigation(tabName, navigation)} />
    </View>
  );
};

export default Layout;
