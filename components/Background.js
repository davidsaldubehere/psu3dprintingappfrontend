import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function Background({children}) {
  return (
    <LinearGradient
      colors={['#BAC1FF', '#608DFF', '#336CFF']}
      style={styles.linearGradient}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
});

export default Background;
