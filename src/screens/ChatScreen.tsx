import { View, Text, StyleSheet } from 'react-native'; // Adicione StyleSheet aqui
import React from 'react';
import BottomNavigation from '../components/BottomNavigation';
import { handleTabNavigation } from '../utils/navigateUtil';

const ChatScreen: React.FC = ({ navigation }) => {

  const handleTabPress = (tabName: string) => {
    handleTabNavigation(tabName, navigation);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ChatScreen</Text>
      <BottomNavigation onTabPress={handleTabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  text: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default ChatScreen;
