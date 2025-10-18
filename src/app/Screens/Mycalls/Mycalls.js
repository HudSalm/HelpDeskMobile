import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { supabase } from '@lib/supabase.js';
import styles from './style.js';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import ButtomCircule from '@/app/componentes/buttomCircule.js';
import DashboardCard from '@/app/componentes/dashboardCard.js';

const TableHeader = () => (
  <View style={styles.tableHeader}>
    <Text style={[styles.headerText, styles.columnReason]}>Motivo</Text>
    <Text style={[styles.headerText, styles.columnStatus]}>Status</Text>
    <Text style={[styles.headerText, styles.columnDept]}>Dp.Chamado</Text>
    <Text style={[styles.headerText, styles.columnActions]}>Ações</Text>
  </View>
);

function calculateDashboardStats(callsArray) {
  if (!callsArray) return [];

  const totalChamados = callsArray.length;
  const abertos = callsArray.filter((call) => call.status === 'Aberto').length;
  const andamento = callsArray.filter(
    (call) => call.status === 'Em andamento',
  ).length;
  const resolvidos = callsArray.filter(
    (call) => call.status === 'Resolvido',
  ).length;

  return [
    {
      id: '1',
      titulo: 'Total de Chamados',
      valor: totalChamados.toString(),
    },
    {
      id: '2',
      titulo: 'Chamados Abertos',
      valor: abertos.toString(),
    },
    {
      id: '3',
      titulo: 'Em Andamento',
      valor: andamento.toString(),
    },
    {
      id: '4',
      titulo: 'Resolvidos',
      valor: resolvidos.toString(),
    },
  ];
}

export default function Account() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [calls, setCalls] = useState([]);
  const [dashboardData, setDashboardData] = useState([]);

  const { width } = Dimensions.get('window');
  const CARD_CONTAINER_WIDTH = width / 2;

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        setLoading(true);
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser();

          if (user) {
            const { data: callDatas, error } = await supabase
              .from('calls')
              .select('id, reason, status, required_department')
              .eq('id_applicant', user.id)
              .order('created_at', { ascending: false });

            if (error) {
              console.error('Erro ao buscar chamados:', error);
            } else if (callDatas) {
              setCalls(callDatas);
              const newDashboardData = calculateDashboardStats(callDatas);
              setDashboardData(newDashboardData);
            }
          }
        } catch (error) {
          Alert.alert(
            'Erro Inesperado',
            'Ocorreu um erro durante o carregamento dos dados',
          );
          console.error(error);
        } finally {
          setLoading(false);
        }
      }

      fetchData();
      return () => {};
    }, []),
  );

  const getStatusStyle = (status) => {
    if (status === 'Aberto') {
      return [styles.statusTextYellow, styles.columnStatusYellow];
    } else if (status === 'Em andamento') {
      return [styles.statusTextBlue, styles.columnStatusBlue];
    }
    return [styles.statusTextGreen, styles.columnStatusGreen];
  };

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={[styles.rowText, styles.columnReason]}>{item.reason}</Text>
      <Text style={getStatusStyle(item.status)}>{item.status}</Text>
      <Text style={[styles.rowText, styles.columnDept]}>
        {item.required_department}
      </Text>
      <View style={[styles.rowText, styles.columnActions]}>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Feather name="trash-2" size={20} color="#E74C3C" />
        </TouchableOpacity>
      </View>
    </View>
  );

  async function handleDelete(chamadoId) {
    Alert.alert(
      'Confirmar Cancelamento',
      'Você tem certeza que deseja cancelar este chamado? Esta ação não pode ser desfeita.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            const { error } = await supabase
              .from('calls')
              .delete()
              .eq('id', chamadoId);

            if (error) {
              Alert.alert(
                'Erro',
                'Não foi possível cancelar o chamado. Tente novamente.',
              );
              console.error('Erro ao deletar:', error);
            } else {
              const newCalls = calls.filter((call) => call.id !== chamadoId);
              setCalls(newCalls);

              const newDashboardData = calculateDashboardStats(newCalls);
              setDashboardData(newDashboardData);

              Alert.alert('Sucesso', 'O chamado foi cancelado.');
            }
          },
          style: 'destructive',
        },
      ],
    );
  }

  function handleRegisterCall() {
    navigation.navigate('RegisterCall');
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
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text>MUDAR FUNDO</Text>
      </View>
      <Text style={styles.textDashboard}>Dashboard</Text>
      <FlatList
        data={dashboardData}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_CONTAINER_WIDTH}
        snapToAlignment="start"
        decelerationRate="fast"
        renderItem={({ item }) => <DashboardCard item={item} />}
        keyExtractor={(item) => item.id}
        style={{ flexGrow: 0 }}
      />
      <Text style={styles.textTittleCalls}>Últimos chamados:</Text>
      <View style={styles.calls}>
        <FlatList
          styles={styles.callsList}
          data={calls}
          renderItem={(props) => renderItem(props, handleDelete)}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={<TableHeader />}
        />
      </View>

      <View style={styles.buttomPosition}>
        <ButtomCircule onPress={handleRegisterCall} />
      </View>
    </View>
  );
}
