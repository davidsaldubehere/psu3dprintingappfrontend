import React, {useState} from 'react';
import {
  ScrollView,
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useContext, useCallback} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import QuickNav from './QuickNav';
import Announcements from './Announcements';
import Tasks from './Tasks';
import Footer from './Footer';
import {AuthContext} from './AuthContext';
import Background from './Background';
import {useFocusEffect} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';

function PrinterStatus({navigation}) {
  const [printers, setPrinters] = useState([]);
  const [editPerms, setEditPerms] = useState(false);
  const [expandedPrinter, setExpandedPrinter] = useState(null);
  const [editedProblems, setEditedProblems] = useState({});
  const [editedStatus, setEditedStatus] = useState({});
  const [showPicker, setShowPicker] = useState(false); // Added state for showing picker
  const authContext = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            'https://psuwebdevclub.pythonanywhere.com/printers/',
            {
              headers: {
                Authorization: `Token ${authContext.authState.accessToken}`,
              },
            },
          );
          const data = await response.json();
          console.log(data);
          setPrinters(data);
          //populate all of the problems and status into the editedProblems and editedStatus objects
          const editedProblems = {};
          const editedStatus = {};
          data.forEach(printer => {
            editedProblems[printer.id] = printer.problems;
            editedStatus[printer.id] = printer.status;
          });
          setEditedProblems(editedProblems);
          setEditedStatus(editedStatus);

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

  const handleExpandPrinter = printerId => {
    if (expandedPrinter === printerId) {
      setExpandedPrinter(null);
    } else {
      setExpandedPrinter(printerId);
    }
  };

  const handleEditProblems = (printerId, problems) => {
    setEditedProblems(prevEditedProblems => ({
      ...prevEditedProblems,
      [printerId]: problems,
    }));
  };

  const handleEditStatus = (printerId, status) => {
    setEditedStatus(prevEditedStatus => ({
      ...prevEditedStatus,
      [printerId]: status,
    }));
  };

  const handleSaveChanges = async printerId => {
    try {
      const response = await fetch(
        `https://psuwebdevclub.pythonanywhere.com/printers/${printerId}/`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${authContext.authState.accessToken}`,
          },
          body: JSON.stringify({
            problems: editedProblems[printerId],
            status: editedStatus[printerId],
          }),
        },
      );
      if (response.ok) {
        // Update the printers list with the updated printer
        setPrinters(prevPrinters =>
          prevPrinters.map(printer =>
            printer.id === printerId
              ? {
                  ...printer,
                  problems: editedProblems[printerId],
                  status: editedStatus[printerId],
                }
              : printer,
          ),
        );
        // Clear the edited problems and status for the printer
      } else {
        alert('Failed to save changes');
      }
    } catch (error) {
      alert('Unable to reach server');
      console.error(error);
    }
  };

  const handleShowPicker = printerId => {
    setShowPicker(prevShowPicker => ({
      ...prevShowPicker,
      [printerId]: true,
    }));
  };

  return (
    <Background>
      <SafeAreaView style={styles.main}>
        <View style={{flex: 0.9}}>
          <Text style={styles.title}>
            Printer Status
            {editPerms && (
              <Icon.Button
                name="edit"
                size={20}
                backgroundColor="transparent"
                onPress={() => navigation.navigate('CreatePrinter')}
              />
            )}
          </Text>
          <Text
            style={{fontStyle: 'italic', marginLeft: 20, marginVertical: 20}}>
            Click to reveal printer specs
          </Text>
          <ScrollView style={styles.scrollView}>
            {printers.map(p => (
              <View key={p.id} style={styles.shadow}>
                <TouchableOpacity
                  style={styles.textContainer}
                  onPress={() => handleExpandPrinter(p.id)}>
                  <Text
                    style={[
                      styles.name,
                      {
                        color:
                          p.status === 'Operational'
                            ? 'green'
                            : p.status === 'Requires Maintenance'
                            ? '#eb7a34'
                            : 'red',
                      },
                    ]}>
                    {p.name}
                  </Text>
                  <Text style={styles.textInfo}>{p.problems}</Text>
                  {expandedPrinter === p.id && (
                    <>
                      <Text style={styles.specs}>Printer specs: {p.specs}</Text>
                      {editPerms && (
                        <TextInput
                          style={styles.input}
                          placeholder="Enter problems"
                          value={editedProblems[p.id]}
                          onChangeText={text => handleEditProblems(p.id, text)}
                          editable={editPerms}
                        />
                      )}
                      {showPicker[p.id] && (
                        <TouchableOpacity>
                          <View
                            style={[
                              styles.pickerContainer,
                              {pointerEvents: 'none'},
                            ]}>
                            <Picker
                              style={styles.picker}
                              selectedValue={editedStatus[p.id]}
                              onValueChange={itemValue =>
                                handleEditStatus(p.id, itemValue)
                              }
                              enabled={editPerms}>
                              <Picker.Item
                                label="Operational"
                                value="Operational"
                              />
                              <Picker.Item
                                label="Requires Maintenance"
                                value="Requires Maintenance"
                              />
                              <Picker.Item label="Broken" value="Broken" />
                            </Picker>
                          </View>
                        </TouchableOpacity>
                      )}
                      {editPerms && (
                        <TouchableOpacity
                          style={styles.saveButton}
                          onPress={() => handleSaveChanges(p.id)}>
                          <Text style={styles.saveButtonText}>
                            Save Changes
                          </Text>
                        </TouchableOpacity>
                      )}
                      {!showPicker[p.id] && editPerms && (
                        <TouchableOpacity
                          style={styles.showPickerButton}
                          onPress={() => handleShowPicker(p.id)}>
                          <Text style={styles.showPickerButtonText}>
                            Change Status
                          </Text>
                        </TouchableOpacity>
                      )}
                    </>
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
        <Footer navigation={navigation} />
      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  textInfo: {
    marginTop: 5,
    fontSize: 17,
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

  specs: {
    marginTop: 10,
    fontSize: 20,
    marginBottom: 10,
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
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
    padding: 5,
  },
  pickerContainer: {
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
    height: 200,
  },
  picker: {
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  showPickerButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  showPickerButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PrinterStatus;
