import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import Input from '@/app/componentes/input.js';
import CustomButton from '@/app/componentes/Button1.js';
import styles from './style.js';
import { useRoute, useNavigation } from '@react-navigation/native';
import { supabase } from '@lib/supabase.ts';

export default function UpdateEmail() {
  const route = useRoute();
  const { data } = route.params;
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    setInfo(data);
  }, []);

  const handleUpdateEmail = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        email: info,
      });

      if (error) {
        Alert.alert(
          'Error',
          'Não foi possível atualizar o email. Tente novamente',
          error.message,
        );
      } else {
        Alert.alert('Sucesso', 'Seu email foi atualizado com sucesso');
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert('Erro Inesperado', 'Ocorreu um erro durante a alteração');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
        <Text style={styles.title}>Informe seu novo endereço de e-mail</Text>
        <Text style={styles.text}>
          Insira um endereço de e-mail válido. Ele será usado para receber
          e-mails de verificação.
        </Text>
        <Input
          style={styles.input}
          placeholder="Insira seu e-mail"
          onChangeText={setInfo}
          placeholderTextColor="#f7f7f7"
        />

        <CustomButton title="Confirmar" onPress={() => handleUpdateEmail()} />
      </View>
    </View>
  );
}
