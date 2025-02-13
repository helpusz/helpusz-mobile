import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import api from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Layout from '../components/Layout';
import CategoryCard from '../components/CategoryCard';
import COLORS from '../constants/colors';
import OngCategoryEnum from '../utils/OngCategoryEnum';
import { Activity } from '../models/Activity';
import ActivityCard from '../components/ActivityCard';
import { User } from '../models/User';
import OngCard from '../components/OngCard';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }: any) => {
  useFocusEffect(
    React.useCallback(() => {
      const loadSelectedCategory = async () => {
        const category = await AsyncStorage.getItem('selectedCategory');
        setSelectedCategory(category);
      };
    
      loadSelectedCategory();
      getuser();
      getActivities();
      getOngs();

      return () => {
        console.log('Saindo da Home');
      };
    }, [])
  );
  
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    getActivities()
    getOngs()
    getuser()
      .finally(() => setIsRefreshing(false));
  }, []);
  
  /* User */
  const [user, setUser] = useState<{ name: string }>();

  const getuser = async () => {
    const email = await AsyncStorage.getItem('email');
    
    const response = await api.get(`/user/getByEmail?email=${email}`);
    setUser(response.data);
    await AsyncStorage.setItem('user', JSON.stringify(response.data));
  };
  /* User */

  /* Tabs */
  const [activeTab, setActiveTab] = useState('Activities');
  /* Tabs */
  
  /* Categories */
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Object.keys(OngCategoryEnum) as (keyof typeof OngCategoryEnum)[];

  const renderCategory = ({ item }: { item: keyof typeof OngCategoryEnum }) => {
    const isSelected = item === selectedCategory;
    const image = categoryImages[OngCategoryEnum[item]];
  
    return (
      <CategoryCard
        title={OngCategoryEnum[item]}
        onPress={() => handleCategoryPress(item)}
        image={image}
        isSelected={isSelected}
      />
    );
  };
  
  const categoryImages = {
    [OngCategoryEnum.MEIO_AMBIENTE]: require('../assets/images/categories/images/MEIO_AMBIENTE.jpeg'),
    [OngCategoryEnum.CAUSA_ANIMAL]: require('../assets/images/categories/images/CAUSA_ANIMAL.webp'),
    [OngCategoryEnum.EDUCACAO]: require('../assets/images/categories/images/EDUCACAO.webp'), 
    [OngCategoryEnum.CULTURA_E_ARTES]: require('../assets/images/categories/images/CULTURA_E_ARTES.jpeg'),
    [OngCategoryEnum.ASSISTENCIA_SOCIAL]: require('../assets/images/categories/images/ASSISTENCIA_SOCIAL.jpeg'),
    [OngCategoryEnum.DIREITOS_HUMANOS]: require('../assets/images/categories/images/DIREITOS_HUMANOS.jpeg'),
    [OngCategoryEnum.SEGURANCA_ALIMENTAR]: require('../assets/images/categories/images/SEGURANCA_ALIMENTAR.jpeg'),
    [OngCategoryEnum.ESPORTE_E_LAZER]: require('../assets/images/categories/images/ESPORTE_E_LAZER.jpeg'),
    [OngCategoryEnum.TECNOLOGIA_E_INOVACAO]: require('../assets/images/categories/images/TECNOLOGIA_E_INOVACAO.jpeg'),
    [OngCategoryEnum.DIREITOS_DOS_IDOSOS]: require('../assets/images/categories/images/DIREITOS_DOS_IDOSOS.webp'),
    [OngCategoryEnum.IGUALDADE_RACIAL]: require('../assets/images/categories/images/IGUALDADE_RACIAL.webp'),
    [OngCategoryEnum.DESENVOLVIMENTO_COMUNITARIO]: require('../assets/images/categories/images/DESENVOLVIMENTO_COMUNITARIO.webp'),
    [OngCategoryEnum.IGUALDADE_DE_GENERO]: require('../assets/images/categories/images/IGUALDADE_DE_GENERO.jpeg'),
    [OngCategoryEnum.SAUDE]: require('../assets/images/categories/images/SAUDE.webp'),
    [OngCategoryEnum.INCLUSAO_DE_PESSOAS_COM_DEFICIENCIA]: require('../assets/images/categories/images/INCLUSAO_DE_PESSOAS_COM_DEFICIENCIA.webp'), 
  };
  
  const handleCategoryPress = async (category: keyof typeof OngCategoryEnum) => {
    if(category === selectedCategory) {
      getActivities();
      getOngs();
      await AsyncStorage.removeItem('selectedCategory');
      setSelectedCategory(null);
    } 
    else {
      setSelectedCategory(category);
      await AsyncStorage.setItem('selectedCategory', category);
      getActivitiesByCategory(category);
      getOngsByCategory(category);
    }
  };
  /* Categories */

  /* Activities */
  const [activities, setActivities] = useState<Activity[]>([]);
  
  const getActivities = async () => {
    if(await AsyncStorage.getItem('selectedCategory') == null || await AsyncStorage.getItem('selectedCategory') == undefined) {
      getAllActivities();
    }
    else {
      const category = await AsyncStorage.getItem('selectedCategory');
      getActivitiesByCategory(category?.toString() as keyof typeof OngCategoryEnum);
    }
  };

  const getAllActivities = async () => {
    try {
      const response = await api.get('/activity/getAll');
      setActivities(response.data);
    } 
    catch(error: any) {
      console.log('Erro na requisição:', error.response.data.message);
    }
  };

  const getActivitiesByCategory = async (category: keyof typeof OngCategoryEnum) => {
    try {
      const response = await api.get(`/activity/getAllByOngCategory?category=${category}`);
      setActivities(response.data);
    } 
    catch(error: any) {
      setActivities([]);
      console.log(error.response.data.message);
    }
  };

  const renderActivity = ({ item }: { item: Activity }) => (
    <ActivityCard activity={item} onPress={() => handleActivityPress(item.id)} />
  );

  const handleActivityPress = (activityId: string) => {
    navigation.navigate('ActivityScreen', { activityId });
  };


  
  /* Activities */

  /* Ongs */
  const [ongs, setOngs] = useState<User[]>([]); 

  const getOngs = async () => {
    try {
      const response = await api.get('/ong/getAll');
      setOngs(response.data);
    } 
    catch (error) {
      console.log('Erro na requisição:', error);
    }
  };

  const renderOng = ({ item }: { item: User }) => (
    <OngCard ong={item} onPress={() => handleOngPress(item.id)} />
  );

  const handleOngPress = (ongId: string) => {
    navigation.navigate('OngScreen', { ongId });
  };

  const getOngsByCategory = async (category: keyof typeof OngCategoryEnum) => {
    try {
      const response = await api.get(`/ong/getAllByCategory?category=${category}`);
      setOngs(response.data);
    } 
    catch(error: any) {
      setOngs([]);
      console.log(error.response.data.message);
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
            Fundações
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

      <View style={styles.activitiesAndOngsContainer}>
        {activeTab === 'Activities' && (
          activities.length > 0 ? (
            <FlatList
              data={activities}
              keyExtractor={(item) => item.id}
              renderItem={renderActivity}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={handleRefresh}
                />
              }
            />
          ) : (
            <Text style={styles.nullText}>
              Não há atividades cadastradas ainda!
            </Text>
          )
        )}

        {activeTab === 'Ongs' && (
          ongs.length > 0 ? (
            <FlatList
              data={ongs}
              keyExtractor={(item) => item.id}
              renderItem={renderOng}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={handleRefresh}
                />
              }
            />
          ) : (
            <Text style={styles.nullText}>
              Não há atividades cadastradas ainda!
            </Text>
          )
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
    maxHeight: 120,
    marginTop: 60,
    marginBottom: 9,
  },

  separator: {
    width: 10,
  },

  activitiesAndOngsContainer: {
    width: '100%',
    height: 400,
  },

  nullText: {
    flex: 1,
    fontSize: 20,
  }
});

export default HomeScreen;
