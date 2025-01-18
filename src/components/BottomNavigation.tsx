import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../constants/colors';

interface BottomNavigationProps {
  onTabPress: (tabName: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ onTabPress }) => {
  const tabs = [
    { name: 'Início', icon: 'home-outline' },
    { name: 'Busca', icon: 'search-outline' },
    { name: 'Postar', icon: 'add-outline' },
    { name: 'Mensagens', icon: 'chatbubble-ellipses-outline' },
    { name: 'Perfil', icon: 'person-outline' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.tabButton}
          onPress={() => onTabPress(tab.name)}
        >
          <Icon name={tab.icon} size={24} color={COLORS.black} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 2,
  },

  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 40,
  },
});

export default BottomNavigation;
