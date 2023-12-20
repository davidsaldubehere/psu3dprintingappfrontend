import React from 'react';
import {useState, useCallback, useContext, useEffect} from 'react';
import {ActivityIndicator, StyleSheet, SafeAreaView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import QuickNav from './QuickNav';
import Announcements from './Announcements';
import Tasks from './Tasks';
import Footer from './Footer';
import * as Keychain from 'react-native-keychain';

import {AuthContext} from './AuthContext';
function Process({navigation}) {
  const authContext = useContext(AuthContext);
  const [status, setStatus] = useState('loading');

  const loadJWT = useCallback(async () => {
    try {
      const value = await Keychain.getGenericPassword();
      const jwt = JSON.parse(value.password);
      authContext.setAuthState({
        accessToken: jwt.token || null,
        authenticated: jwt.token !== null,
      });
      setStatus('success');
    } catch (error) {
      setStatus('error');
      authContext.setAuthState({
        accessToken: null,
        authenticated: false,
      });
    }
  }, []);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  if (status === 'loading') {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#007aff" />
      </SafeAreaView>
    );
  }

  if (authContext?.authState?.authenticated === false) {
    navigation.navigate('Login');
  } else {
    navigation.navigate('Home');
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Process;
