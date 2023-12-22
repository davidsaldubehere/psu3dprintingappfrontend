import React from 'react';
import {StatusBar, SafeAreaView, View, StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import PrinterStatus from './components/PrinterStatus';
import Members from './components/Members';
import Message from './components/Message';
import LoginPage from './components/Login';
import CreateAccount from './components/CreateAccount';
import Process from './components/Process';
import Profile from './components/Profile';
import UpdateTask from './components/UpdateTask';
import CreateTask from './components/CreateTask';
import CreateAnnouncements from './components/CreateAnnouncements';
import CreatePrinter from './components/CreatePrinter';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Process">
        <Stack.Screen
          name="Process"
          component={Process}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateTask"
          component={CreateTask}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreatePrinter"
          component={CreatePrinter}
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
          name="CreateAnnouncements"
          component={CreateAnnouncements}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Message"
          component={Message}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UpdateTask"
          component={UpdateTask}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
