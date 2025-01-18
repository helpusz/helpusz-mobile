import React from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import BottomNavigation from '../components/BottomNavigation';
import { handleTabNavigation } from '../utils/navigateUtil';
import OngCategoryEnum from '../utils/OngCategoryEnum';
import api from '../api/api';

const SearchScreen = ({ navigation }: any) => {
  const handleTabPress = (tabName: string) => {
    handleTabNavigation(tabName, navigation);
  };

  const categories = Object.keys(OngCategoryEnum) as (keyof typeof OngCategoryEnum)[];

  const handleCategoryPress = async (category: OngCategoryEnum) => {

    const response = await api.get(`/ong/getAllByCategory?category=${category}`);
    console.log(response.data);
  };

  const renderCategory = ({ item }: { item: keyof typeof OngCategoryEnum }) => (
    <TouchableOpacity
      style={styles.categoryButton}
      onPress={() => handleCategoryPress(item)}
    >
      <Text style={styles.categoryText}>{OngCategoryEnum[item]}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar"
          placeholderTextColor="#999"
        />
      </View>
      <Text style={styles.filterText}>Filtre ONGs por categorias</Text>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item}
        numColumns={2}
        contentContainerStyle={styles.categoriesContainer}
      />
      <BottomNavigation onTabPress={handleTabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    margin: 8,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
});

export default SearchScreen;
