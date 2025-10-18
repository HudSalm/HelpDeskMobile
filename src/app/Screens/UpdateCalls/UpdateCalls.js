import React, { useState } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { supabase } from '@lib/supabase.js';
import { Picker } from '@react-native-picker/picker';
import styles from './style';
import CustomButton from '@/app/componentes/Button1';

export default function UpdateCalls() {
  const route = useRoute();
  const navigation = useNavigation();
  const { callDetails } = route.params;

  const [status, setStatus] = useState(callDetails.status);
  const [loading, setLoading] = useState(false);

  async function handleUpdateCalls() {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('calls')
        .update({ status: status })
        .eq('id', callDetails.id);

      if (error) {
        Alert.alert('Atenção0', 'Erro ao salvar alteração', error.message);
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
      <Text style={styles.title}>Detalhes do Chamado</Text>
      <Text style={styles.label}>Solicitante:</Text>
      <Text style={styles.value}>
        {callDetails.profiles?.name || 'Não informado'}
      </Text>

      <Text style={styles.label}>Departamento do Solicitante:</Text>
      <Text style={styles.value}>
        {callDetails.profiles?.department || 'Não informado'}
      </Text>

      <Text style={styles.label}>Motivo do Chamado:</Text>
      <Text style={styles.value}>{callDetails.reason}</Text>

      <Text style={styles.label}>Descrição:</Text>
      <Text style={styles.valueDescription}>{callDetails.description}</Text>

      <Text style={styles.label}>Alterar Status:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue)}
          style={styles.picker}
          dropdownIconColor="#f7f7f7"
        >
          <Picker.Item label="Aberto" value="Aberto" color="#000" />
          <Picker.Item label="Em andamento" value="Em andamento" color="#000" />
          <Picker.Item label="Resolvido" value="Resolvido" color="#000" />
        </Picker>
      </View>

      <CustomButton
        style={styles.customButton}
        title={loading ? 'Salvando...' : 'Salvar Alterações'}
        onPress={handleUpdateCalls}
        disabled={loading}
        color="#21bd5aff"
      />
    </View>
  );
}
