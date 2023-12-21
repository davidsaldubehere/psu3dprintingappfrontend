import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AuthContext} from './AuthContext';
function getRandomPastelColor() {
  const hue = Math.floor(Math.random() * 30) + 230; // Adjust the range to generate purplish hues
  const pastelColor = `hsl(${hue}, 50%, 80%)`;
  return pastelColor;
}

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const authContext = React.useContext(AuthContext);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/announcements/', {
      headers: {
        Authorization: `Token ${authContext.authState.accessToken}`,
      },
    })
      .then(response => response.json())
      .then(data => setAnnouncements(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <View>
      <Text style={styles.title}>Announcements</Text>
      <ScrollView style={styles.scrollView} horizontal={true}>
        {announcements.map(announcement => (
          <View key={announcement.id} style={styles.shadow}>
            <View
              style={[styles.image, {backgroundColor: getRandomPastelColor()}]}>
              <View style={styles.textContainer}>
                <Text style={styles.announcement}>{announcement.title}</Text>
                <Text style={styles.textInfo}>{announcement.content}</Text>
              </View>
            </View>
          </View>
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
  announcement: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollView: {
    marginLeft: 10,
  },
  textInfo: {
    fontSize: 14,
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
    position: 'absolute',
    padding: 10,
    width: '100%',
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.63)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default Announcements;
