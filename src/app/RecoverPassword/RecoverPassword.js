import { useState } from 'react';
import { Alert, View, Text } from 'react-native';
import { supabase } from '@lib/supabase.ts';
import { useNavigation } from '@react-navigation/native';
import Input from '@/app/componentes/input';
import styles from './style.js';
import CustomButton from '@/app/componentes/Button1';

export default function RecoverPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  async function handlePasswordRecovery() {
    if (!email) {
      Alert.alert('Erro', 'Por favor, digite seu email.');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'helpdeskapp://',
      });

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert(
          'Verifique seu Email',
          'Se uma conta com este email existir, um link para redefinir sua senha foi enviado.',
        );
        navigation.navigate('Login');
      }
    } catch (error) {
      Alert.alert('Erro Inesperado', 'Ocorreu um erro durante o processo');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Esqueceu sua senha ?</Text>
      <Text style={styles.text}>Entre com o email da sua conta</Text>
      <Input
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />
      <CustomButton
        title={'Recuperar Senha'}
        disabled={loading}
        onPress={handlePasswordRecovery}
        color="#007AFF"
        style={styles.CustomButton}
      />
    </View>
  );
}
