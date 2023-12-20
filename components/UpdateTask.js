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
const UpdateTask = ({navigation, route}) => {
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const id = route.params.id;
  const authContext = React.useContext(AuthContext);
  //probably would be better to pass in the data as a prop but this is okay for now
  const fetchTask = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/tasks/${id}/`, {
        headers: {
          Authorization: `Token ${authContext.authState.accessToken}`,
        },
      });
      const data = await response.json();
      console.log('Task fetched:', data.title);
      setTitle(data.title);
      setName(data.name);
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  const handleEdit = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/tasks/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${authContext.authState.accessToken}`,
        },
        body: JSON.stringify({
          title: title,
          name: name,
        }),
      });
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/tasks/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${authContext.authState.accessToken}`,
        },
      });
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.title}>Update Task</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <TextInput
          style={styles.input}
          value={name}
          multiline={true} // Set multiline to true
          numberOfLines={10} // Set the number of lines to display
          onChangeText={text => setName(text)}
        />
        <Button title="Done" onPress={handleEdit} />
      </View>
      <Button title="Delete" onPress={handleDelete} />
    </SafeAreaView>
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

export default UpdateTask;
