import React from 'react';
import {StatusBar, SafeAreaView, View, StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import QuickNav from './QuickNav';
import Announcements from './Announcements';
import Tasks from './Tasks';
import Footer from './Footer';
import Background from './Background';
function HomeScreen({navigation}) {
  return (
    <Background>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={styles.main}>
        <Text style={styles.title}>3D Printing Club</Text>
        <QuickNav navigation={navigation} />
        <Announcements navigation={navigation} />
        <Tasks navigation={navigation} />
        <Footer navigation={navigation} />
      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
  title: {
    margin: 20,
    marginBottom: 0,
    fontSize: 27,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
