import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import AppNavigator from './src/routes/AppNavigator.js';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#2980b9' }}>
      <StatusBar barStyle="light-content" backgroundColor="#2980b9" />
      <AppNavigator />
    </SafeAreaView>
  );
}
