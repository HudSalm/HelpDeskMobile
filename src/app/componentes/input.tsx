import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import {
  TextInputMask,
  TextInputMaskOptionProp,
  TextInputMaskTypeProp,
} from 'react-native-masked-text';

type Props = TextInputProps & {
  type?: TextInputMaskTypeProp;
  options?: TextInputMaskOptionProp;
  isNumber?: boolean;
  isPassword?: boolean;
};

const Input = ({
  placeholder,
  value,
  onChangeText,
  isPassword = false,
  isNumber = false,
  type,
  options,
  style,
  placeholderTextColor,
  ...rest
}: Props) => {
  const [isSecure, setIsSecure] = useState(true);

  return (
    <View style={styles.container}>
      {type ? (
        <TextInputMask
          style={[styles.input, style]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword ? isSecure : false}
          autoCapitalize="none"
          keyboardType={isNumber ? 'phone-pad' : 'default'}
          maxLength={isNumber ? 15 : undefined}
          type={type}
          options={options}
          {...rest}
        />
      ) : (
        <TextInput
          style={[styles.input, style]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword ? isSecure : false}
          autoCapitalize="none"
          keyboardType={isNumber ? 'phone-pad' : 'default'}
          maxLength={isNumber ? 15 : undefined}
          {...rest}
        />
      )}

      {isPassword && (
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setIsSecure(!isSecure)}
        >
          {isSecure ? (
            <Feather name="eye-off" size={24} color="#888" />
          ) : (
            <Feather name="eye" size={24} color="#888" />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    height: 60,
    position: 'relative',
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 15,
  },
  eyeIcon: {
    padding: 10,
    marginRight: 10,
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    start: '86%',
  },
});
