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
import {useState, useContext, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {AuthContext} from './AuthContext';

function Task({navigation, taskTitle, textInfo, editPerms, id}) {
  //create a state for the actual task text
  return (
    <View style={styles.shadow}>
      <View>
        <Text style={styles.taskText}>{taskTitle}</Text>
        <Text style={styles.textInfo}>{textInfo}</Text>
      </View>
      <View>
        {editPerms && (
          <Icon.Button
            name="edit"
            size={20}
            backgroundColor="transparent"
            onPress={() =>
              navigation.navigate('UpdateTask', {
                id: `${id}`,
              })
            }
          />
        )}
        <Icon.Button
          name="check"
          size={20}
          backgroundColor="transparent"
          onPress={() =>
            navigation.navigate('Message', {
              presetMessage: 'Hi, I would like to volunteer for example task',
            })
          }
        />
      </View>
    </View>
  );
}
function Tasks({navigation}) {
  const [tasks, setTasks] = useState([]);
  const [editPerms, setEditPerms] = useState(false);
  const authContext = React.useContext(AuthContext);
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const tasksResponse = await fetch('http://127.0.0.1:8000/tasks/', {
            headers: {
              Authorization: `Token ${authContext.authState.accessToken}`,
            },
          });
          const tasksData = await tasksResponse.json();
          setTasks(tasksData);

          const editPermsResponse = await fetch(
            'http://127.0.0.1:8000/users/is_staff/',
            {
              headers: {
                Authorization: `Token ${authContext.authState.accessToken}`,
              },
            },
          );
          const editPermsData = await editPermsResponse.json();
          setEditPerms(editPermsData.is_staff);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }, [authContext.authState.accessToken]),
  );

  return (
    <View>
      <View>
        <Text style={styles.title}>
          Current Projects
          {editPerms && (
            <Icon.Button
              name="edit"
              size={20}
              backgroundColor="transparent"
              style={styles.button}
            />
          )}
        </Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {tasks.map(task => (
          <Task
            key={task.id}
            id={task.id}
            navigation={navigation}
            taskTitle={task.title}
            textInfo={task.name}
            editPerms={editPerms}
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
    marginRight: 20,
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
  button: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 5,
  },
});

export default Tasks;
