import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

type Props = TouchableOpacityProps & {
  title: string;
  loading: boolean;
  color: string;
};

const CustomButton = ({ title, loading, onPress, ...rest }: Props) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={loading}
      {...rest}
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
