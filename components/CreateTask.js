import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  LinearGradient,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {AuthContext} from './AuthContext';
import Background from './Background';
const CreateTask = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const authContext = React.useContext(AuthContext);
  //probably would be better to pass in the data as a prop but this is okay for now
  const createTask = async () => {
    try {
      const response = await fetch(
        `https://psuwebdevclub.pythonanywhere.com/tasks/create/`,
        {
          method: 'POST',
          headers: {
            Authorization: `Token ${authContext.authState.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: title,
            name: name,
          }),
        },
      );
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error fetching task:', error);
      alert('Error creating task');
    }
  };

  return (
    <Background>
      <SafeAreaView style={styles.main}>
        <Text style={styles.title}>Create Task</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Title"
            onChangeText={text => setTitle(text)}
          />
          <TextInput
            style={[styles.input, {height: 200}]}
            placeholder="Description"
            multiline={true} // Set multiline to true
            numberOfLines={10} // Set the number of lines to display
            onChangeText={text => setName(text)}
          />
          <Button title="Create" onPress={createTask} />
          <Button title="Cancel" onPress={() => navigation.goBack()} />
        </View>
      </SafeAreaView>
    </Background>
  );
};
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
    backgroundColor: 'rgba(255, 255, 255, 0.43)',
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.43)',
  },
  error: {
    color: 'red',
  },
});

export default CreateTask;
