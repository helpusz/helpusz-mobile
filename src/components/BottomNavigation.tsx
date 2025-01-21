import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import COLORS from '../constants/colors';

interface BottomNavigationProps {
  onTabPress: (tabName: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ onTabPress }) => {
  const [activeTab, setActiveTab] = useState('Início');
  
  const tabs = [
    { name: 'Início', icon: 'home-outline', iconActive: 'home' },
    { name: 'Busca', icon: 'search-outline', iconActive: 'search' },
    { name: 'Postar', icon: 'add-circle-outline', iconActive: 'add-circle' },
    { name: 'Mensagens', icon: 'chatbubbles-outline', iconActive: 'chatbubbles' },
    { name: 'Perfil', icon: 'person-outline', iconActive: 'person' },
  ];

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
    onTabPress(tabName); 
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.tabButton}
          onPress={() => handleTabPress(tab.name)}
        >
          <Icon
            name={tab.name === activeTab ? tab.iconActive : tab.icon}
            size={24}
            color={tab.name === activeTab ? COLORS.primary : COLORS.black}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
});

export default BottomNavigation;
