import { useState } from 'react';
import { Text, View, TextInput, Alert, ActivityIndicator } from 'react-native';
import CustomButtom from '@/app/componentes/Button1.js';
import Input from '@/app/componentes/input.js';
import SelectList from '@/app/componentes/selectList.js';
import styles from './style.js';
import { supabase } from '@lib/supabase.ts';
import { useNavigation } from '@react-navigation/native';

export default function RegisterCall() {
  const [requiredDepartment, setRequiredDepartment] = useState();
  const [description, setDescription] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const departamentItems = [
    { label: 'TI', value: 'TI' },
    { label: 'RH', value: 'RH' },
    { label: 'Financeiro', value: 'Finaceiro' },
    { label: 'Escritório', value: 'Escritório' },
  ];

  async function sendCall() {
    if (!reason || !requiredDepartment || !description) {
      Alert.alert('Todos os campos são obrigátorios');
      return;
    }
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        Alert.alert('Erro', 'Você não está autenticado.');
        return;
      }

      const { error } = await supabase.from('calls').insert({
        reason: reason,
        required_department: requiredDepartment,
        description: description,
        id_applicant: user.id,
      });
      if (error) {
        Alert.alert('Erro ao salvar chamado', error.message);
      } else {
        Alert.alert('Sucesso!', 'Seu chamado foi registrado');
        navigation.goBack();
      }
    } catch (e) {
      Alert.alert('Erro Inesperado', 'Ocorreu um erro durante o cadastro');
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
      <Text style={styles.titleRegister}>Registrar Chamado</Text>
      <Input
        style={styles.inputReason}
        placeholder="Motivo do Chamado"
        placeholderTextColor="#999"
        value={reason}
        onChangeText={setReason}
      />
      <Text style={styles.textDepartment}>Departamento Solicitado:</Text>
      <SelectList
        style={styles.inputRequiredDepartment}
        items={departamentItems}
        selectedValue={requiredDepartment}
        onValueChange={(itemValue) => setRequiredDepartment(itemValue)}
        dropdownIconColor="#f7f7f7"
      />

      <TextInput
        style={styles.description}
        placeholder="Digite um breve resumo sobre o seu problema"
        placeholderTextColor="#999"
        value={description}
        onChangeText={setDescription}
        multiline={true}
      />
      <CustomButtom
        style={styles.customButton}
        title={'Enviar Chamado'}
        loading={loading}
        onPress={sendCall}
        color="#21bd5aff"
      />
    </View>
  );
}
