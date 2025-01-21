import {Text, StyleSheet } from 'react-native';
import React from 'react';

import Layout from '../components/Layout';

const PostScreen = ({ navigation }: any) => {
  return (
    <Layout navigation={navigation}>
      <Text>
        PostScreen
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({

});

export default PostScreen;
