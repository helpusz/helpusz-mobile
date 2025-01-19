import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import api from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Layout from '../components/Layout';
import CategoryCard from '../components/CategoryCard';
import COLORS from '../constants/colors';
import OngCategoryEnum from '../utils/OngCategoryEnum';

const HomeScreen = ({ navigation }: any) => {
  useEffect(() => {
    getStorageUser();
    getActivities();
  }, []);
  
  /* User */
  const [user, setUser] = useState<{ name: string }>();

  const getStorageUser = async () => {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUser(user);
    }
  };

  /* Tabs */
  const [activeTab, setActiveTab] = useState('Activities');
  
  /* Categories */
  const categories = Object.keys(OngCategoryEnum) as (keyof typeof OngCategoryEnum)[];

  const renderCategory = ({ item }: { item: keyof typeof OngCategoryEnum }) => (
    <CategoryCard
      title={OngCategoryEnum[item]}
      onPress={() => handleCategoryPress(item)}
    />
  );

  const handleCategoryPress = async (category: keyof typeof OngCategoryEnum) => {
    const response = await api.get(`/ong/getAllByCategory?category=${category}`);
    console.log(response.data);
  };

  /* Activities */
  const getActivities = async () => {
    try {
      const response = await api.get('/activity/getAll');
    } 
    catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  /* Ongs */

  return (
    <Layout navigation={navigation}>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab('Activities')}>
          <Text style={[styles.tabText, activeTab === 'Activities' && styles.activeTabText]}>
            Atividades
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('Ongs')}>
          <Text style={[styles.tabText, activeTab === 'Ongs' && styles.activeTabText]}>
            Ongs
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesListContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>

      <View>
        {activeTab === 'Activities' && (
          <View>
            <Text>Atividades</Text>
          </View>
        )}

        {activeTab === 'Ongs' && (
          <Text>
            Ongs
          </Text>
        )}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    gap: 20,
    position: 'absolute',
    top: 20,
    width: '100%',
    justifyContent: 'center',
  },

  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
    minWidth: 100,
    padding: 10,
    textAlign: 'center',
  },

  activeTabText: {
    color: COLORS.primary,
  },

  categoriesListContainer: {
    width: '100%',
    paddingVertical: 10,
  },

  separator: {
    width: 10,
  }
});

export default HomeScreen;
