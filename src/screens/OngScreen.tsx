import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Linking } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Layout from "../components/Layout";
import COLORS from "../constants/colors";
import { User } from "../models/User";
import ActivityCard from "../components/ActivityCard";
import { Activity } from "../models/Activity";
import api from "../api/api";
import * as Clipboard from 'expo-clipboard';

const ProfileScreen = ({ route, navigation }: any) => {
  const { ongId } = route.params;

  const handleCopyToClipboard = async (email: string) => {
    try {
      await Clipboard.setStringAsync(email);
      Alert.alert('Chave PIX copiada!', 'Sua doação é muito importante. Obrigado pela ajuda!');
    } 
    catch (error) {
      Alert.alert('Erro', 'Falha ao copiar para a área de transferência.');
    }
  };
  
  /* User */
  const [user, setUser] = useState<User | null>(null);

  const getStorageUser = async () => {
    const userData = await AsyncStorage.getItem("user");
    if(userData) {
      const user = JSON.parse(userData);
      setUser(user);
    }
  };
  /* User */

  /* Ong */
  const [ong, setOng] = useState<User>();

  const getOng = async () => {
    try {
      const response = await api.get(`/ong/getById?id=${ongId}`);
      setOng(response.data);
    } 
    catch(error) {
      console.log(error);
    }
  };
  /* Ong */

  /* Tabs */
  const [activeTab, setActiveTab] = useState('CreatedActivities');
  /* Tabs */

  /* Activities */
  const [activities, setActivities] = useState<Activity[]>([]);

  const getActivities = async () => {
    try {
      const response = await api.get(`/activity/getAllByOngId/${ong!.id}`);  
      setActivities(response.data);
    } 
    catch(error: any) {
      console.log('Erro na requisição:', error.response.data.message);
    }
  };

  const renderActivity = ({ item }: { item: Activity }) => (
    <ActivityCard activity={item} onPress={() => handleActivityPress(item.id)} />
  );

  const handleActivityPress = (activityId: string) => {
    navigation.navigate('ActivityScreen', { activityId });
  };
  /* Activities */

  useEffect(() => {
    getStorageUser()
    getOng();
  }, []);
  
  useEffect(() => {
    if(ong) {
      getActivities();
    }
  }, [ong]);

  return (
    <Layout navigation={navigation}>
      {ong ? (
        <View style={styles.container}>
          <View style={styles.mainInfo}>
            <Image
              source={require("../assets/images/image-not-found.png")}
              style={styles.profileImage}
            />

            <Text style={styles.name}>
              {ong.name}
            </Text>

            <View style={styles.socialLinks}>
              {ong.socialLinks?.twitter && (
                <View style={styles.socialLink}>
                  <Ionicons name="logo-twitter" size={14} color={COLORS.black} />
                  <Text onPress={() => Linking.openURL(`https://twitter.com/${ong.socialLinks!.twitter}`)}>
                    {ong.socialLinks.twitter}
                  </Text>
                </View>
              )}

              {ong.socialLinks?.instagram && (
                <View style={styles.socialLink}>
                  <Ionicons name="logo-instagram" size={14} color={COLORS.black} />
                  <Text onPress={() => Linking.openURL(`https://instagram.com/${ong.socialLinks!.instagram}`)}>
                    {ong.socialLinks.instagram}
                  </Text>
                </View>
              )}

              {ong.socialLinks?.facebook && (
                <View style={styles.socialLink}>
                  <Ionicons name="logo-facebook" size={14} color={COLORS.black} />
                  <Text onPress={() => Linking.openURL(`https://facebook.com/${ong.socialLinks!.facebook}`)}>
                    {ong.socialLinks.facebook}
                  </Text>
                </View>
              )}

              {ong.socialLinks?.linkedin && (
                <View style={styles.socialLink}>
                  <Ionicons name="logo-linkedin" size={14} color={COLORS.black} />
                  <Text onPress={() => Linking.openURL(`https://linkedin.com/in/${ong.socialLinks!.linkedin}`)}>
                    {ong.socialLinks.linkedin}
                  </Text>
                </View>
              )}
            </View>

            {/* Só mostrar caso ong.pix não for nulo */}
            <TouchableOpacity onPress={() => handleCopyToClipboard(ong.email!.address)} style={styles.donationContainer}>
              <MaterialIcons name="pix" size={14} color="#000" />
              <Text style={styles.donationText}>
                {ong.email?.address}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => setActiveTab('CreatedActivities')}>
              <Text style={[styles.tabText, activeTab === 'CreatedActivities' && styles.activeTabText]}>
                Atividades
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setActiveTab('Ongs')}>
              <Text style={[styles.tabText, activeTab === 'Ongs' && styles.activeTabText]}>
                Teste
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'CreatedActivities' && (
            activities.length > 0 ? (
              <FlatList
                data={activities}
                keyExtractor={(item) => item.id}
                renderItem={renderActivity}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <Text style={styles.nullText}>
                Essa ONG ainda não possui atividades!
              </Text>
            )
          )}
        </View>
      ) : (
        <Text>Erro ao carregar usuário</Text>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },

  mainInfo: {
    alignItems: "center",
    justifyContent: "center",
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    width: "100%",
    textAlign: "center",
  },

  socialLinks: {
    marginTop: 10,
    width: "100%",
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 15,
  },

  socialLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  donationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },

  donationText: {

  },

  tabContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 30,
    marginTop: 20,
    marginBottom: 20,
  },

  tabText: {
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.black,
  },

  activeTabText: {
    color: COLORS.primary,
  },

  nullText: {
    flex: 1,
    fontSize: 20,
  },

  contentContainer: {
    width: '100%',
    height: 900,
    marginTop: 20,
    backgroundColor: COLORS.primary,
  },
});

export default ProfileScreen;
