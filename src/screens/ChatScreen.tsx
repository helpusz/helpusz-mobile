import { Text, StyleSheet } from 'react-native';
import React from 'react';

import Layout from '../components/Layout';

const ChatScreen: React.FC = ({ navigation }) => {
  return (
    <Layout navigation={navigation}>
      <Text>
        ChatScreen
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({

});

export default ChatScreen;
