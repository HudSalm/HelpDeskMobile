import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { supabase } from '@lib/supabase';
import styles from './style';
import { StackScreenProps } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import ButtomCircule from '@/app/componentes/buttomCircule.js';
import DashboardCard from '@/app/componentes/dashboardCard.js';
import { RootStackParamList, RootTabParamList } from '@/navigation/types.js';
import TableCalls from '@/app/componentes/TableCalls';
import { Dashboards } from '@/types/types-utils';
import { CallTypeUtils } from '@/types/types-utils';

const TableHeader = () => (
  <View style={styles.tableHeader}>
    <Text style={[styles.headerText, styles.columnReason]}>Motivo</Text>
    <Text style={[styles.headerText, styles.columnStatus]}>Status</Text>
    <Text style={[styles.headerText, styles.columnDept]}>Dp.Chamado</Text>
    <Text style={[styles.headerText, styles.columnActions]}>Ações</Text>
  </View>
);

function calculateDashboardStats(callsArray: CallTypeUtils[]) {
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

type Props = StackScreenProps<RootStackParamList, 'MainTabs'>;

export default function MyCalls({ navigation }: Props) {
  const [loading, setLoading] = useState(false);
  const [calls, setCalls] = useState<CallTypeUtils[]>([]);
  const [dashboardData, setDashboardData] = useState<Dashboards[]>([]);

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

  async function handleDelete(chamadoId: number) {
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
          data={calls}
          renderItem={({ item }) => (
            <TableCalls
              item={item}
              handleModify={handleDelete}
              isDelete={true}
            />
          )}
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
