import React from 'react';
import { TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ButtomCircule = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.botao} onPress={onPress}>
      <Feather name="plus" size={32} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  botao: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#21bd5aff', // Uma cor azul, por exemplo
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
});

export default ButtomCircule;