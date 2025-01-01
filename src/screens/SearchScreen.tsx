import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import BottomNavigation from '../components/BottomNavigation';
import { handleTabNavigation } from '../utils/navigateUtil';

const SearchScreen = ({ navigation }: any) => {
  const handleTabPress = (tabName: string) => {
    handleTabNavigation(tabName, navigation);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>SearchScreen</Text>
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
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 1,
  },
});

export default SearchScreen;
