import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
function Footer({navigation}) {
  return (
    <View style={styles.container}>
      <Icon.Button
        name="setting"
        size={20}
        backgroundColor="transparent"
        style={styles.button}
      />
      <Icon.Button
        name="home"
        size={20}
        backgroundColor="transparent"
        onPress={() => navigation.navigate('Home')}
        style={styles.button}
      />
      <Icon.Button
        name="message1"
        size={20}
        backgroundColor="transparent"
        onPress={() => navigation.navigate('Message')}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 75,
    backgroundColor: 'rgba(206, 189, 255, 0.8)',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
export default Footer;
