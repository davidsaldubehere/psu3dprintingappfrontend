import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function Announcements() {
  return (
    <View>
      <Text style={styles.title}>Announcements</Text>
      <ScrollView style={styles.scrollView} horizontal={true}>
        <View style={styles.shadow}>
          <ImageBackground
            source={require('../assets/example1.jpeg')}
            resizeMethod='cover'
            style={styles.image}>
            <View style={styles.textContainer}>
              <Text style={styles.announcement}>Club Cancellation</Text>
              <Text style={styles.textInfo}>Do some more stuff that involves being cool and doing your job ya know</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.shadow}>
          <ImageBackground
            source={require('../assets/example1.jpeg')}
            resizeMethod='cover'
            style={styles.image}>
            <View style={styles.textContainer}>
              <Text style={styles.announcement}>Ender 3 Is Broken</Text>
              <Text style={styles.textInfo}>Do some more stuff that involves being cool and doing your job ya know</Text>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    title: {
        margin: 20,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 0,
      },
    announcement: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    scrollView: {
        marginLeft: 10,
    },
    textInfo:{
        fontSize: 14,
    },
    image:{
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
    textContainer:{
        position: 'absolute',
        padding: 10,
        width: '100%',
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.63)',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
});

export default Announcements;
