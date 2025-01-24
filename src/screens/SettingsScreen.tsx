import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Layout from "../components/Layout";
import { User } from "../models/User";
import Input from "../components/Input";
import COLORS from "../constants/colors";
import api from "../api/api";
import { HttpStatusCode } from "axios";

const SettingsScreen = ({ navigation }: any) => {
  /* User */
  const [user, setUser ] = useState<User | null>(null);

  const getStorageUser = async () => {
    const userData = await AsyncStorage.getItem("user");
    if(userData) {
      const user = JSON.parse(userData);
      setUser(user);
    }
  };

  const updateUser = async (user: User) => {
    const response = await api.patch(`/user/update`, user);
    if(response.status === HttpStatusCode.Ok) {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      getStorageUser();
    }
  };
  /* User */

  const handleVariableChange = (value: string, variable: keyof User) => {
    if(user) {
      setUser ({ ...user, [variable]: value });
    } 
  };

  useEffect(() => {
    getStorageUser();
  }, []);

  return (
    <Layout navigation={navigation}>
      {user ? (
        <View style={styles.container}>
          <View style={styles.topBar} >
            <Text>
            <Text style={styles.topBarCancelText}>
              Cancelar
            </Text>
            </Text>
            
            <Text style={styles.topBarText} onPress={() => updateUser(user)}>
              Salvar
            </Text>
          </View>
          
          <Text style={styles.subtitle}>
            Perfil
          </Text>
          
          <View style={styles.option}>
            <View>
              <Text>Nome</Text>
            </View>

            <View>
              <Input 
                value={user?.name || ''} 
                noStyle={true}
                onChange={(value) => handleVariableChange(value, 'name')}
              />
            </View>
          </View>

          {/* <View style={styles.option}>
            <View>
              <Text>Endereço</Text>
            </View>

            <View>
              <Input 
                value={'Hard Code'} 
                noStyle={true}
                onChange={(value) => handleVariableChange(value, 'location')}
              />
            </View>
          </View>

          <View style={styles.option}>
            <View>
              <Text>Chave PIX</Text>
            </View>

            <View>
              <Input 
                value={'Hard Code'}
                noStyle={true}
                onChange={(value) => setName(value)}
              />
            </View>
          </View>

          <View style={styles.option}>
            <View>
              <Text>Twitter</Text>
            </View>

            <View>
              <Input 
                value={user.socialLinks?.twitter}
                noStyle={true}
                onChange={(value) => handleVariableChange(value, 'socialLinks', 'twitter')}
              />
            </View>
          </View>

          <View style={styles.option}>
            <View>
              <Text>Instagram</Text>
            </View>

            <View>
              <Input 
                value={user.socialLinks?.instagram}
                noStyle={true}
                onChange={(value) => setName(value)}
              />
            </View>
          </View>

          <View style={styles.option}>
            <View>
              <Text>Facebook</Text>
            </View>

            <View>
              <Input 
                value={user.socialLinks?.facebook}
                noStyle={true}
                onChange={(value) => setName(value)}
              />
            </View>
          </View>

          <View style={styles.option}>
            <View>
              <Text>Linkedin</Text>
            </View>

            <View>
              <Input 
                value={user.socialLinks?.linkedin}
                noStyle={true}
                onChange={(value) => setName(value)}
              />
            </View>
          </View>

          <View style={styles.option}>
            <View>
              <Text>Site</Text>
            </View>

            <View>
              <Input 
                value={user.socialLinks?.site}
                noStyle={true}
                onChange={(value) => setName(value)}
              />
            </View>
          </View> */}
        </View>
      ) : (
        <Text>Erro ao carregar usuário</Text>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  topBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  topBarCancelText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.secondary,
  },
  
  topBarText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.primary,
  },
  
  container: {
    width: '100%',
    height: '100%',
  },

  subtitle: {
    textTransform: 'uppercase',
    fontSize: 10,
    paddingVertical: 20,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginBottom: 20,
  },

  input: {

  },
});

export default SettingsScreen;
