import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import BottomNavigation from '../components/BottomNavigation';
import OngCategoryEnum from '../utils/OngCategoryEnum';
import api from '../api/api';
import Layout from '../components/Layout';
import CategoryCard from '../components/CategoryCard';
import COLORS from '../constants/colors';
import { withDecay } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchScreen = ({ navigation }: any) => {
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
      await AsyncStorage.setItem('selectedCategory', category);
      navigation.navigate('HomeScreen');
    };
    /* Categories */

  return (
    <Layout navigation={navigation}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Pesquisar"
          placeholderTextColor={COLORS.black}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTexto}>
          Filtre Fundações por categorias
        </Text>
      </View>

      <View style={styles.categoriesListContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={true}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    padding: 16,
    backgroundColor: COLORS.grey,
    borderRadius: 8,
    width: '100%',
  },

  infoContainer: {
    marginTop: 10,
    width: '100%',
    paddingLeft: 16,
  },

  infoTexto: {
    textAlign: 'justify'
  },

  categoriesListContainer: {
    width : '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
    paddingVertical: 30
  },

  separator: {
    height: 15,
  },

  
});

export default SearchScreen;
