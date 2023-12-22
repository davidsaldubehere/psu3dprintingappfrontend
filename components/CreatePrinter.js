import React, {useState, useContext} from 'react';
import {
  ScrollView,
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {AuthContext} from './AuthContext';
import Background from './Background';
import {Picker} from '@react-native-picker/picker';

function CreatePrinter({navigation}) {
  const [name, setName] = useState('');
  const [specs, setSpecs] = useState('');
  const [problems, setProblems] = useState('');
  const [status, setStatus] = useState('Operational');
  const authContext = useContext(AuthContext);

  const handleCreatePrinter = async () => {
    try {
      const response = await fetch(
        'https://psuwebdevclub.pythonanywhere.com/printers/create/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${authContext.authState.accessToken}`,
          },
          body: JSON.stringify({
            name,
            specs,
            problems,
            status,
          }),
        },
      );
      if (response.ok) {
        navigation.goBack();
      } else {
        alert('Failed to create printer');
      }
    } catch (error) {
      alert('Unable to reach server');
      console.error(error);
    }
  };

  return (
    <Background>
      <SafeAreaView style={styles.main}>
        <View style={{flex: 0.9}}>
          <Text style={styles.title}>
            Create Printer
            <Icon.Button
              name="close"
              size={20}
              backgroundColor="transparent"
              onPress={() => navigation.goBack()}
            />
          </Text>
          <Text style={styles.textInfo}>Scroll to bottom to submit</Text>

          <ScrollView style={styles.scrollView}>
            <View style={styles.formContainer}>
              <Text style={styles.label}>Name:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter name"
                value={name}
                onChangeText={text => setName(text)}
              />
              <Text style={styles.label}>Specs:</Text>
              <TextInput
                style={[styles.input, {height: 200}]}
                placeholder="Enter specs"
                multiline={true}
                numberOfLines={10}
                value={specs}
                onChangeText={text => setSpecs(text)}
              />
              <Text style={styles.label}>Problems:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter problems"
                value={problems}
                onChangeText={text => setProblems(text)}
              />
              <Text style={styles.label}>Status:</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  style={styles.picker}
                  selectedValue={status}
                  onValueChange={itemValue => setStatus(itemValue)}>
                  <Picker.Item label="Operational" value="Operational" />
                  <Picker.Item
                    label="Requires Maintenance"
                    value="Requires Maintenance"
                  />
                  <Picker.Item label="Broken" value="Broken" />
                </Picker>
              </View>
              <TouchableOpacity
                style={styles.createButton}
                onPress={handleCreatePrinter}>
                <Text style={styles.createButtonText}>Create Printer</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  textInfo: {
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'italic',
    margin: 20,
  },
  title: {
    margin: 20,
    marginBottom: 0,
    fontSize: 27,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  pickerContainer: {
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    paddingHorizontal: 10,
  },
  createButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  createButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CreatePrinter;
