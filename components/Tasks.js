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
function Task({navigation}) {
  //create a state for the actual task text

  return (
    <View style={styles.shadow}>
      <View>
        <Text style={styles.taskText}>Task Text</Text>
        <Text style={styles.textInfo}>
          Take notes during the meeting and then post them as a PDF to the
          Google Drive so we can all access them. you know what to dod it aj
        </Text>
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
  return (
    <View>
      <Text style={styles.title}>Current Projects</Text>
      <ScrollView style={styles.scrollView}>
        <Task navigation={navigation} />
        <Task navigation={navigation} />
        <Task navigation={navigation} />
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
