import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Home } from './app/views/Home.js'
import { LoginPage } from './app/components/LoginPage'

export default function App() {
  return (
    <View style={styles.container}>
      <Home />
      <LoginPage></LoginPage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    zIndex: 1,
  },
});
