import React, { useState } from 'react';
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { supabase } from '@lib/supabase.js';
import { useNavigation } from '@react-navigation/native';
import styles from './style.js';
import Input from '@/app/componentes/input.js';
import SelectList from '@/app/componentes/selectList.js';
import CustomButton from '@/app/componentes/Button1.js';

function translateSupabaseError(errorMessage) {
  if (errorMessage === 'User already registered') {
    return 'Este email já possui uma conta. Por favor, faça login.';
  }
  if (errorMessage.includes('Password should be at least 6 characters')) {
    return 'A senha precisa ter no mínimo 6 caracteres.';
  }
  if (errorMessage.includes('Unable to validate email address')) {
    return 'O formato do email é inválido. Verifique o que foi digitado.';
  }
  if (errorMessage.includes('Password should not be a common password')) {
    return 'Por segurança, a senha não pode ser uma senha comum ou fácil de adivinhar.';
  }

  return 'Ocorreu um erro inesperado. Tente novamente.';
}

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedDepartament, setSelectedDepartament] = useState();

  const departamentItems = [
    { label: 'TI', value: 'TI' },
    { label: 'Financeiro', value: 'Financeiro' },
    { label: 'RH', value: 'RH' },
    { label: 'Escritório', value: 'Escritório' },
  ];

  const navigation = useNavigation();

  async function signUpWithEmail() {
    if (!email || !password) {
      Alert.alert('Atenção', 'Email e senha são obrigatórios.');
      return;
    }
    if (!selectedDepartament) {
      Alert.alert('O campo departamento é obrigatório');
      return;
    }
    if (phoneNumber.length < 15) {
      Alert.alert(
        'Celular Inválido',
        'O número de celular deve ter 9 digitos.',
      );
      return;
    }
    if (password.length < 6) {
      Alert.alert('A senha deve ter pelo menos 6 caracteres');
      return;
    }
    if (password !== passwordConfirm) {
      Alert.alert('Erro', 'A senha deve ser a mesma nos dois campos');
      return;
    }

    setLoading(true);

    try {
      const { data: phoneExists, error: rpcError } = await supabase.rpc(
        'phone_exists',
        {
          phone_to_check: phoneNumber,
        },
      );

      if (rpcError) {
        throw new Error('Erro ao verificar o telefone. Tente novamente.');
      }

      if (phoneExists) {
        Alert.alert(
          'Telefone já cadastrado',
          'O número de celular informado já está em uso por outra conta.',
        );
        return;
      }

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (authError) {
        const translatedMessage = translateSupabaseError(authError.message);
        Alert.alert('Erro no cadastro', translatedMessage);
        return;
      }

      if (!authData.user) {
        Alert.alert(
          'Erro inesperado',
          'Não foi possível criar o usuário. Tente novamente.',
        );
        return;
      }

      const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user.id,
        phone: phoneNumber,
        department: selectedDepartament,
        name: name,
      });

      if (profileError) {
        Alert.alert('Erro ao salvar perfil', profileError.message);
        return;
      }

      Alert.alert('Sucesso!', 'Sua conta foi criada com sucesso.');
      navigation.navigate('Account');
    } catch (e) {
      Alert.alert('Erro Inesperado', 'Ocorreu um erro durante o cadastro.');
      console.error(e);
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
      <Text style={styles.header}>Crie sua Conta</Text>

      <Input
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />
      <Input
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        style={styles.input}
        placeholder="Número de Celular"
        placeholderTextColor="#999"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        isNumber={true}
        maskType={'cel-phone'}
        maskOptions={{
          maskType: 'BRL',
          withDDD: 'true',
          dddMask: '(99) ',
        }}
      />
      <Input
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        isPassword={true}
      />
      <Input
        style={styles.input}
        placeholder="Confirme sua Senha"
        placeholderTextColor="#999"
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        isPassword={true}
      />

      <Text style={styles.textDepart}>Selecione seu departamento:</Text>
      <SelectList
        items={departamentItems}
        selectedValue={selectedDepartament}
        onValueChange={(itemValue) => setSelectedDepartament(itemValue)}
        dropdownIconColor="#999"
      />

      <CustomButton
        style={styles.CustomButton}
        title="Cadastrar"
        loading={loading}
        onPress={signUpWithEmail}
        color="#28A745"
      />

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.switchText}>Já tem uma conta ? Faça Login</Text>
      </TouchableOpacity>
    </View>
  );
}
