import { useState } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';

const CustomButton = ({ title, loading, onPress, ...props }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={loading}
      {...props}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 100,
    marginBottom: 20,
    backgroundColor: '#28A745',
    color: '#262424ff',
    borderRadius: 20,
    height: 50,
  },

  text: {
    textAlign: 'center',
    margin: 'auto',
    fontSize: 20,
    fontWeight: '500',
  },
});

export default CustomButton;
