import React, { useState } from 'react';
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { supabase } from '@lib/supabase.js';
import { useNavigation } from '@react-navigation/native';
import styles from './style.js';
import Input from '@/app/componentes/input.js';
import CustomButton from '@/app/componentes/Button1.js';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  async function signInWithEmail() {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        Alert.alert('Erro', 'Email ou senha incorretos.');
      }
    } catch (error) {
      Alert.alert('Erro Inesperado', 'Ocorreu um erro durante o login');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#28A745" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('@/app/assets/helpdesk.png')}
        style={styles.logo}
      />
      <Text style={styles.header}>HelpDesk</Text>
      <Text style={styles.description}>Faça login para continuar</Text>

      <Input
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        isPassword={true}
      />
      <CustomButton
        style={styles.customButton}
        title={'Entrar'}
        loading={loading}
        onPress={signInWithEmail}
      />

      <TouchableOpacity onPress={() => navigation.navigate('RecoverPassword')}>
        <Text style={styles.switchText}>Esqueceu a senha ?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.switchText}>Não tem uma conta ? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}
