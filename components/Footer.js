import {View, StyleSheet, useNavigation} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useRoute} from '@react-navigation/native';

function Footer({navigation}) {
  const route = useRoute();
  const navigateToProfile = () => {
    if (navigation.isFocused() && route.name == 'Profile') {
      return;
    }
    navigation.navigate('Profile');
  };

  const navigateToHome = () => {
    console.log(navigation);
    if (
      (navigation.isFocused() && route.name == 'Home') ||
      route.name == 'Process'
    ) {
      return;
    }
    navigation.navigate('Home');
  };

  const navigateToMessage = () => {
    if (navigation.isFocused() && route.name == 'Message') {
      return;
    }
    navigation.navigate('Message');
  };

  return (
    <View style={styles.container}>
      <Icon.Button
        name="setting"
        size={20}
        backgroundColor="transparent"
        onPress={navigateToProfile}
        style={styles.button}
      />
      <Icon.Button
        name="home"
        size={20}
        backgroundColor="transparent"
        onPress={navigateToHome}
        style={styles.button}
      />
      <Icon.Button
        name="message1"
        size={20}
        backgroundColor="transparent"
        onPress={navigateToMessage}
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
