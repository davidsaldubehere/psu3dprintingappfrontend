/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {AuthProvider} from './components/AuthContext';

const Root = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};
AppRegistry.registerComponent(appName, () => Root);
