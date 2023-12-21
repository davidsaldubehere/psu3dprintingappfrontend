import React, {useState, useCallback, useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect} from '@react-navigation/native';
import {AuthContext} from './AuthContext';
function getRandomPastelColor() {
  const hue = Math.floor(Math.random() * 30) + 230; // Adjust the range to generate purplish hues
  const pastelColor = `hsl(${hue}, 50%, 80%)`;
  return pastelColor;
}

function Announcements({navigation}) {
  const [announcements, setAnnouncements] = useState([]);
  const authContext = React.useContext(AuthContext);
  const [editPerms, setEditPerms] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8000/announcements/', {
            headers: {
              Authorization: `Token ${authContext.authState.accessToken}`,
            },
          });
          const data = await response.json();
          console.log(data);
          setAnnouncements(data);

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
          alert('Unable to reach server');
          console.error(error);
        }
      };

      fetchData();
    }, [authContext.authState.accessToken]),
  );

  return (
    <View>
      <Text style={styles.title}>
        Announcements
        {editPerms && (
          <Icon.Button
            name="edit"
            size={20}
            backgroundColor="transparent"
            style={styles.button}
            onPress={() => navigation.navigate('CreateAnnouncements')}
          />
        )}
      </Text>
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
  button: {
    top: 7,
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
    backgroundColor: 'rgba(255, 255, 255, 0.43)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default Announcements;
