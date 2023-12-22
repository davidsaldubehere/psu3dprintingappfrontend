import React from 'react';
import {useState} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import QuickNav from './QuickNav';
import Announcements from './Announcements';
import Tasks from './Tasks';
import Footer from './Footer';

function Message({navigation, route}) {
  const receivedData = route.params?.presetMessage;

  const [message, setMessage] = useState('');
  // Set the initial value of message to the preset message
  // If the preset message is undefined, set the initial value to an empty string
  useState(() => {
    setMessage(receivedData ?? '');
  }, [receivedData]);

  const handleSubmit = () => {
    // Perform form submission logic here
    if (message.trim() === '') {
      //try get the preset message
      alert('Please enter a message');
    } else {
      // Submit the form
      alert('Message submitted successfully');
      navigation.navigate('Home');
    }
  };

  return (
    <LinearGradient
      colors={['#BAC1FF', '#608DFF', '#336CFF']}
      style={styles.linearGradient}>
      <SafeAreaView style={styles.main}>
        <Text style={styles.title}>Officer Contact</Text>
        <Text style={styles.subText}>
          Use this form to request special prints, volunteer for printer
          maintenance, or anything else pertaining the officers
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your message here"
          value={message}
          onChangeText={setMessage}
          multiline={true} // Set multiline to true
          numberOfLines={4} // Set the number of lines to display
        />
        <TouchableOpacity style={styles.navBorder} onPress={handleSubmit}>
          <Text style={styles.infoText}>Submit Message</Text>
        </TouchableOpacity>
        <Footer navigation={navigation} />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
  subText: {
    margin: 20,
    marginBottom: 0,
    fontSize: 13,
    fontStyle: 'italic',
  },
  title: {
    margin: 20,
    marginBottom: 0,
    fontSize: 27,
    fontWeight: 'bold',
  },

  input: {
    borderRadius: 10,
    height: 150,
    padding: 10,
    margin: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.43)',
  },
  navBorder: {
    backgroundColor: '#749AF9',
    margin: 20,
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default Message;
