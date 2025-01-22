import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Linking } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Layout from "../components/Layout";
import COLORS from "../constants/colors";
import { User } from "../models/User";
import ActivityCard from "../components/ActivityCard";
import { Activity } from "../models/Activity";
import api from "../api/api";

const ProfileScreen = ({ navigation }: any) => {
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

  /* Tabs */
  const [activeTab, setActiveTab] = useState('RegisteredActivities');
  /* Tabs */

  /* Activities */
  const [activities, setActivities] = useState<Activity[]>([]);

  const getActivities = async () => {
    try {
      const response = await api.get(`/activity/getActivitiesRegisteredByVolunteerId/${user!.id}`); 
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
    getStorageUser();
  }, []);
  
  useEffect(() => {
    if(user) {
      getActivities();
    }
  }, [user]);

  return (
    <Layout navigation={navigation}>
      {user ? (
        <View style={styles.container}>
          <View style={styles.topBar}>
            <Icon name="settings-outline" size={24} color={COLORS.black} />
          </View>
          
          <View style={styles.mainInfo}>
            <Image
              source={require("../assets/images/image-not-found.png")}
              style={styles.profileImage}
            />

            <Text style={styles.name}>
              {user.name}
            </Text>

            <View style={styles.socialLinks}>
              {user.socialLinks?.twitter && (
                <View style={styles.socialLink}>
                  <Icon name="logo-twitter" size={14} color={COLORS.black} />
                  <Text onPress={() => Linking.openURL(`https://twitter.com/${user.socialLinks!.twitter}`)}>
                    {user.socialLinks.twitter}
                  </Text>
                </View>
              )}

              {user.socialLinks?.instagram && (
                <View style={styles.socialLink}>
                  <Icon name="logo-instagram" size={14} color={COLORS.black} />
                  <Text onPress={() => Linking.openURL(`https://instagram.com/${user.socialLinks!.instagram}`)}>
                    {user.socialLinks.instagram}
                  </Text>
                </View>
              )}

              {user.socialLinks?.facebook && (
                <View style={styles.socialLink}>
                  <Icon name="logo-facebook" size={14} color={COLORS.black} />
                  <Text onPress={() => Linking.openURL(`https://facebook.com/${user.socialLinks!.facebook}`)}>
                    {user.socialLinks.facebook}
                  </Text>
                </View>
              )}

              {user.socialLinks?.linkedin && (
                <View style={styles.socialLink}>
                  <Icon name="logo-linkedin" size={14} color={COLORS.black} />
                  <Text onPress={() => Linking.openURL(`https://linkedin.com/in/${user.socialLinks!.linkedin}`)}>
                    {user.socialLinks.linkedin}
                  </Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => setActiveTab('RegisteredActivities')}>
              <Text style={[styles.tabText, activeTab === 'RegisteredActivities' && styles.activeTabText]}>
                Atividades Inscritas
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setActiveTab('Ongs')}>
              <Text style={[styles.tabText, activeTab === 'Ongs' && styles.activeTabText]}>
                Teste
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'RegisteredActivities' && (
            activities.length > 0 ? (
              <FlatList
                data={activities}
                keyExtractor={(item) => item.id}
                renderItem={renderActivity}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <Text style={styles.nullText}>
                Você ainda não se inscreveu em nenhuma atividade!
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
  
  topBar: {
    width: "100%",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
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
