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
          <Text style={styles.tabText}>{tab.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.black,
  },
  tabButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 70,
    height: 40,
  },
  tabText: {
    fontSize: 12,
    color: COLORS.black,
    marginTop: 4,
    textAlign: 'center',
  },
});

export default BottomNavigation;
