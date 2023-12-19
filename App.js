import React from 'react';
import {StatusBar, SafeAreaView, View, StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import PrinterStatus from './components/PrinterStatus';
import Members from './components/Members';
import Message from './components/Message';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PrinterStatus"
          component={PrinterStatus}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Members"
          component={Members}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Message"
          component={Message}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
