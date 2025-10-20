import { useState } from 'react';
import { Alert, View, Text, ActivityIndicator } from 'react-native';
import { supabase } from '@lib/supabase.ts';
import { useRoute, useNavigation } from '@react-navigation/native';
import Input from '@/app/componentes/input.js';
import styles from './style.js';
import CustomButton from '@/app/componentes/Button1.js';

export default function UpdatePassword() {
  const route = useRoute();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const { isSession } = route.params; // talvez eu tenha que criar uma variavel com o valor false como padrão, para caso o parametro session não seja passado

  const navigation = useNavigation();

  async function handleUpdatePassword() {
    if (!password) {
      Alert.alert('Erro', 'Por favor, digite uma senha.');
      return;
    }
    if (!passwordConfirm) {
      Alert.alert('Erro', 'Por favor, confirme sua senha');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (password !== passwordConfirm) {
      Alert.alert('Erro', 'A senha deve ser a mesma nos dois campos');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        Alert.alert(
          'Error',
          'Não foi possível atualizar a senha. Tente novamente.',
        );
      } else {
        Alert.alert('Sucesso!', 'Sua senha foi atualizada.');
        if (!isSession) {
          await supabase.auth.signOut();
          navigation.navigate('Login');
        } else {
          navigation.goBack();
        }
      }
    } catch (error) {
      Alert.alert('Erro Inesperado', 'Ocorreu um erro durante a alteração');
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
      <View style={styles.containerItens}>
        <Text style={styles.header}>Redefinir Senha</Text>
        <Text style={styles.text}>Entre com sua nova senha abaixo</Text>
        <Input
          style={styles.input}
          placeholder="Nova senha"
          value={password}
          onChangeText={setPassword}
          isPassword={true}
          placeholderTextColor="#f7f7f7"
        />
        <Input
          style={styles.input}
          placeholder="Confirme sua senha"
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          isPassword={true}
          placeholderTextColor="#f7f7f7"
        />
        <CustomButton
          style={styles.CustomButton}
          title={'Recuperar senha'}
          onPress={handleUpdatePassword}
          color="#007AFF"
        />
      </View>
    </View>
  );
}
