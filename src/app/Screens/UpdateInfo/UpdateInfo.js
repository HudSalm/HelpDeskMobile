import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import Input from '@/app/componentes/input.js';
import CustomButton from '@/app/componentes/Button1.js';
import styles from './style.js';
import { useRoute, useNavigation } from '@react-navigation/native';
import { supabase } from '@lib/supabase.js';

export default function UpdateInfo() {
  const route = useRoute();
  const { nameColumn, data, text } = route.params;
  const [info, setInfo] = useState('');
  const [isNumber, setIsNumber] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    setInfo(data);

    if (nameColumn === 'phone') {
      setIsNumber(true);
    }
  }, []);

  const handleUpdateInfo = async (nameColumn) => {
    setLoading();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ [nameColumn]: info })
        .eq('id', session.user.id);

      if (error) {
        Alert.alert('Erro ao salvar alteração', error.message);
      } else {
        Alert.alert('Sucesso!', 'Sua alteração foi realizada');
        navigation.goBack();
      }
    } catch (e) {
      Alert.alert('Erro Inesperado', 'Ocorreu um erro durante a alteração');
      console.error(e);
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
        <Text style={styles.title}>Insira seu {text}</Text>
        <Text style={styles.text}>
          Usar seus dados conforme o seu cadastro na empresa pode ajudar a te
          localizar mais rápido.
        </Text>

        {isNumber ? (
          <Input
            style={styles.input}
            value={info}
            onChangeText={setInfo}
            placeholderTextColor="#f7f7f7"
            isNumber={true}
            maskType={'cel-phone'}
            maskOptions={{
              maskType: 'BRL',
              withDDD: 'true',
              dddMask: '(99) ',
            }}
          />
        ) : (
          <Input
            style={styles.input}
            value={info}
            onChangeText={setInfo}
            placeholderTextColor="#f7f7f7"
          />
        )}

        <CustomButton
          title="Confirmar"
          onPress={() => handleUpdateInfo(nameColumn)}
        />
      </View>
    </View>
  );
}
