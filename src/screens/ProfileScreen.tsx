import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Layout from '../components/Layout';

const ProfileScreen = ({ navigation }: any) => {
  return (
    <Layout navigation={navigation}>
      <Text>
        ProfileScreen
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({

});

export default ProfileScreen;
