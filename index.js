/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {AuthProvider} from './components/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
const Root = () => {
  return (
    <AuthProvider>
      <LinearGradient
        colors={['#BAC1FF', '#608DFF', '#336CFF']}
        style={{flex: 1}}>
        <App />
      </LinearGradient>
    </AuthProvider>
  );
};
AppRegistry.registerComponent(appName, () => Root);
