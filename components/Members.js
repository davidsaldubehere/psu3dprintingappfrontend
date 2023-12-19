import React from 'react';
import {
  ScrollView,
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import QuickNav from './QuickNav';
import Announcements from './Announcements';
import Tasks from './Tasks';
import Footer from './Footer';
function Members({navigation}) {
  //color should be based on status
  return (
    <LinearGradient
      colors={['#BAC1FF', '#608DFF', '#336CFF']}
      style={styles.linearGradient}>
      <SafeAreaView style={styles.main}>
        <Text style={styles.title}>List of current members</Text>
        <ScrollView style={styles.scrollView}>
          <View style={styles.shadow}>
            <View style={styles.textContainer}>
              <Text style={styles.name}>David Saldubehere</Text>
              <Text style={styles.textInfo}>Treasurer</Text>
            </View>
          </View>
          <View style={styles.shadow}>
            <View style={styles.textContainer}>
              <Text style={styles.name}>Micheal</Text>
              <Text style={styles.textInfo}>President</Text>
            </View>
          </View>
          <View style={styles.shadow}>
            <View style={styles.textContainer}>
              <Text style={styles.name}>Eric Wang</Text>
              <Text style={styles.textInfo}>Trophy wife</Text>
            </View>
          </View>
        </ScrollView>
        <Footer navigation={navigation} />
      </SafeAreaView>
    </LinearGradient>
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
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  image: {
    width: 300,
    height: 180,
    overflow: 'hidden',
    borderRadius: 10,
  },
  shadow: {
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 7,
  },
  textContainer: {
    padding: 10,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.63)',
    borderRadius: 10,
  },
});

export default Members;
