import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function QuickNav({navigation}) {
  return (
    <View>
      <ScrollView horizontal={true} style={styles.scrollView}>
        <View style={styles.nav}>
          <View style={styles.shadow}>
            <TouchableOpacity
              style={styles.navBorder}
              onPress={() => navigation.navigate('PrinterStatus')}>
              <Text style={styles.infoText}>Printer Status</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.shadow}>
            <TouchableOpacity
              style={styles.navBorder}
              onPress={() => navigation.navigate('Members')}>
              <Text style={styles.infoText}>Members</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.shadow}>
            <TouchableOpacity
              style={styles.navBorder}
              onPress={() => navigation.navigate('Profile')}>
              <Text style={styles.infoText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollView: {
    marginLeft: 10,
  },

  infoText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  navBorder: {
    backgroundColor: '#749AF9',
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
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
});

export default QuickNav;
