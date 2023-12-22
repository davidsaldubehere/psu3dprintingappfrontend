import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AuthContext} from './AuthContext';
import * as Keychain from 'react-native-keychain';

function LoginPage({navigation}) {
  const authContext = React.useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateForm = () => {
    let isValid = true;

    if (username.trim() === '') {
      setUsernameError('Username is required');
      isValid = false;
    } else {
      setUsernameError('');
    }

    if (password.trim() === '') {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      const data = {
        username: username,
        password: password,
      };

      try {
        const response = await fetch(
          'https://psuwebdevclub.pythonanywhere.com/api-token-auth/',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          },
        );
        const json = await response.json();
        var token;
        try {
          token = json.token;
        } catch (error) {
          setPasswordError('Error logging in. Please try again.');
        }
        // Do something with the token
      } catch (error) {
        setPasswordError('Error logging in. Please try again.');
      }
      if (token == null) {
        setPasswordError('Error logging in. Please try again.');
      } else {
        authContext.setAuthState({
          accessToken: token,
          authenticated: true,
        });
        await Keychain.setGenericPassword(
          'token',
          JSON.stringify({
            token,
          }),
        );
        navigation.navigate('Home');
      }
    }
  };

  return (
    <LinearGradient
      colors={['#BAC1FF', '#608DFF', '#336CFF']}
      style={styles.linearGradient}>
      <SafeAreaView style={styles.main}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            spellCheck={false}
            onChangeText={text => setUsername(text)}
          />
          {usernameError ? (
            <Text style={styles.error}>{usernameError}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />
          {passwordError ? (
            <Text style={styles.error}>{passwordError}</Text>
          ) : null}
          <Button title="Login" onPress={handleLogin} />
          <Button
            title="Sign Up"
            onPress={() => navigation.navigate('CreateAccount')}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  // existing styles
  main: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
  title: {
    margin: 20,
    marginBottom: 40,
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
  input: {
    height: 40,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.63)',
  },
  error: {
    color: 'red',
  },
});

export default LoginPage;
