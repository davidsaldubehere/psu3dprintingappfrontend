import React from 'react';
import {
  ScrollView,
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Button,
  Alert,
} from 'react-native';
import {useState, useContext, useCallback, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import QuickNav from './QuickNav';
import Announcements from './Announcements';
import Tasks from './Tasks';
import Footer from './Footer';
import {AuthContext} from './AuthContext';
import {useFocusEffect} from '@react-navigation/native';
function Profile({navigation}) {
  const authContext = React.useContext(AuthContext);
  const [editPerms, setEditPerms] = useState(false);
  function handleLogout() {
    authContext.logout();
    navigation.navigate('Login');
  }
  function handleDeleteAccount() {
    Alert.alert(
      'Delete Account',
      'This action is permanent. If you need to modify your account, please contact an officer via the officer contact form.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(
                'https://psuwebdevclub.pythonanywhere.com/users/delete/',
                {
                  method: 'DELETE',
                  headers: {
                    Authorization: `Token ${authContext.authState.accessToken}`,
                  },
                },
              );
              if (response.ok) {
                navigation.navigate('Login');
              } else {
                alert('Unable to delete account. Contact an officer.');
              }
            } catch (error) {
              console.error(error);
              alert('Unable to reach server');
            }
          },
        },
      ],
    );
  }
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const editPermsResponse = await fetch(
            'https://psuwebdevclub.pythonanywhere.com/users/is_staff/',
            {
              headers: {
                Authorization: `Token ${authContext.authState.accessToken}`,
              },
            },
          );
          const editPermsData = await editPermsResponse.json();
          setEditPerms(editPermsData.is_staff);
        } catch (error) {
          alert('Unable to reach server');
          console.error(error);
        }
      };

      fetchData();
    }, [authContext.authState.accessToken]),
  );
  //color should be based on status
  return (
    <LinearGradient
      colors={['#BAC1FF', '#608DFF', '#336CFF']}
      style={styles.linearGradient}>
      <SafeAreaView style={styles.main}>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.shadow}>
          <View style={styles.textContainer}>
            <Text style={styles.name}>Authentication Status:</Text>
            <Text style={styles.textInfo}>
              {authContext.authState.authenticated
                ? 'Logged in'
                : 'Not logged in'}
            </Text>
          </View>
        </View>
        <View style={styles.shadow}>
          <View style={styles.textContainer}>
            <Text style={styles.name}>Officer Status:</Text>
            <Text style={styles.textInfo}>
              {editPerms ? (
                'You have officer permissions'
              ) : (
                <Button
                  title="Request Officer Permissions"
                  onPress={() =>
                    navigation.navigate('Message', {
                      presetMessage: 'I would like officer permissions',
                    })
                  }></Button>
              )}
            </Text>
          </View>
        </View>

        <Button title="Log out" onPress={handleLogout} />
        <Button
          title="Delete Account"
          onPress={handleDeleteAccount}
          color={'red'}
        />
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

export default Profile;
