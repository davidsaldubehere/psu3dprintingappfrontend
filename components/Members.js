import React from 'react';
import {
  ScrollView,
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  ImageBackground,
} from 'react-native';
import {useState, useContext, useCallback, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import QuickNav from './QuickNav';
import Announcements from './Announcements';
import Tasks from './Tasks';
import Footer from './Footer';
import {AuthContext} from './AuthContext';
import Background from './Background';
function Members({navigation}) {
  const [users, setUsers] = useState([]);
  const authContext = React.useContext(AuthContext);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/users/', {
      headers: {
        Authorization: `Token ${authContext.authState.accessToken}`,
      },
    })
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.main}>
        <Text style={styles.title}>List of app members</Text>
        <ScrollView style={styles.scrollView}>
          {users.map(user => (
            <View key={user.id} style={styles.shadow}>
              <View style={styles.textContainer}>
                <Text style={user.is_staff ? styles.officer : styles.name}>
                  {user.username}
                </Text>
                <Text style={styles.textInfo}>{user.email}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
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
  name: {
    fontSize: 22,
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
  officer: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default Members;
