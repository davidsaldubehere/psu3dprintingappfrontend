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
import Icon from 'react-native-vector-icons/AntDesign';
import {useState, useContext, useCallback, useEffect} from 'react';
import {AuthContext} from './AuthContext';

function Task({navigation, taskTitle, textInfo}) {
  //create a state for the actual task text

  return (
    <View style={styles.shadow}>
      <View>
        <Text style={styles.taskText}>{taskTitle}</Text>
        <Text style={styles.textInfo}>{textInfo}</Text>
      </View>
      <View>
        <Icon.Button
          name="check"
          size={20}
          backgroundColor="transparent"
          onPress={() =>
            navigation.navigate('Message', {
              presetMessage: 'Hi, I would like to volunteer for example task',
            })
          }
          style={styles.button}
        />
      </View>
    </View>
  );
}
function Tasks({navigation}) {
  const [tasks, setTasks] = useState([]);
  const authContext = React.useContext(AuthContext);
  useEffect(() => {
    console.log(authContext.authState.accessToken);
    fetch('http://127.0.0.1:8000/tasks/', {
      headers: {
        Authorization: `Token ${authContext.authState.accessToken}`, //something is going wrong here
      },
    })
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <View>
      <Text style={styles.title}>Current Projects</Text>
      <ScrollView style={styles.scrollView}>
        {tasks.map(task => (
          <Task
            key={task.id}
            navigation={navigation}
            taskTitle={task.title}
            textInfo={task.name}
          />
        ))}
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
  taskText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
  },
  scrollView: {
    marginLeft: 10,
    marginRight: 10,
  },
  textInfo: {
    fontSize: 12,
    marginLeft: 10,
  },
  shadow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 7,
    marginBottom: 5,
  },
});

export default Tasks;
