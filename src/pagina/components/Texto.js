import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Texto = (props) => {
  return <Text style={styles.text}>{props.text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: '#90ee90',
    fontSize: 18,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
  },
});

export default Texto;