import { NavigationProp } from '@react-navigation/native';

interface BottomNavigationProps {
  onTabPress: (tabName: 'Início' | 'Busca' | 'Postar' | 'Mensagens' | 'Perfil') => void;
}


export const handleTabNavigation = (tabName: string, navigation: NavigationProp<any>) => {
  switch(tabName) {
    case 'Início':
      navigation.navigate('HomeScreen');
      break;
    case 'Busca':
      navigation.navigate('SearchScreen');
      break;
    case 'Postar':
      navigation.navigate('PostScreen');
      break;
    case 'Mensagens':
      navigation.navigate('ChatScreen');
      break;
    case 'Perfil':
      navigation.navigate('ProfileScreen');
      break;
    default:
      console.warn(`Tab ${tabName} não mapeada.`);
  }
};
