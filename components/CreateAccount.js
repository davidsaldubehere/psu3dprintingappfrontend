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

function CreateAccount({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

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
    if (email.trim() === '') {
      setEmailError('Password is required');
      isValid = false;
    } else {
      setEmailError('');
    }
    return isValid;
  };

  const handleLogin = () => {
    if (validateForm()) {
      fetch('https://psuwebdevclub.pythonanywhere.com/users/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          email,
        }),
      })
        .then(response => {
          if (response.ok) {
            alert('Account created successfully');
            navigation.navigate('Login');
          } else {
            console.log(response);
            alert('Something went wrong');
            setEmailError('Something went wrong');
          }
        })
        .catch(error => {
          alert(error);
          setEmailError('Something went wrong');
        });
    }
  };

  return (
    <LinearGradient
      colors={['#BAC1FF', '#608DFF', '#336CFF']}
      style={styles.linearGradient}>
      <SafeAreaView style={styles.main}>
        <Text style={styles.title}>Create an Account</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
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
          <TextInput
            style={styles.input}
            placeholder="PSU Email"
            onChangeText={text => setEmail(text)}
          />
          {passwordError ? (
            <Text style={styles.error}>{passwordError}</Text>
          ) : null}
          <Button title="Sign Up" onPress={handleLogin} />
          <Button title="Back to Login" onPress={() => navigation.goBack()} />
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

export default CreateAccount;
