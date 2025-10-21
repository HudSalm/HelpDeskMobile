import React, { useState, useCallback } from 'react';
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
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import DashboardCard from '@/app/componentes/dashboardCard.js';
import { RootStackParamList } from '@/navigation/types';
import TableCalls from '@/app/componentes/TableCalls';
import { Dashboards } from '@/types/types-utils';
import { CallTypeUtils } from '@/types/types-utils';
import { StackScreenProps } from '@react-navigation/stack';

const TableHeader = () => (
  <View style={styles.tableHeader}>
    <Text style={[styles.headerText, styles.columnReason]}>Motivo</Text>
    <Text style={[styles.headerText, styles.columnStatus]}>Status</Text>
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

export default function CallsReceived({ navigation }: Props) {
  const [loading, setLoading] = useState(false);
  const [calls, setCalls] = useState<CallTypeUtils[]>([]);
  const [dashboardData, setDashboardData] = useState<Dashboards[]>([]);

  const { width } = Dimensions.get('window');
  const CARD_CONTAINER_WIDTH = width / 2;

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        setLoading(true);

        try {
          const {
            data: { user },
          } = await supabase.auth.getUser();

          if (user) {
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('department')
              .eq('id', user.id)
              .single();

            if (profileError) {
              Alert.alert(
                'Erro',
                'Não foi possível carregar os dados do seu perfil.',
              );
              console.error(
                'Erro ao buscar o perfil do usuário:',
                profileError,
              );
              setLoading(false);
              return;
            }

            if (profileData) {
              const { data: callDatas, error: callsError } = await supabase
                .from('calls')
                .select('*, profiles ( name, department )')
                .eq('required_department', profileData.department)
                .order('created_at', { ascending: false });

              if (callsError) {
                console.error('Erro ao buscar chamados:', callsError);
              } else {
                setCalls(callDatas || []);
                const newDashboardData = calculateDashboardStats(callDatas);
                setDashboardData(newDashboardData);
              }
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
    }, []),
  );

  async function handleOpenDetails(callItem: any) {
    navigation.navigate('UpdateCalls', { callDetails: callItem });
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
              handleModify={handleOpenDetails}
              isDelete={false}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={<TableHeader />}
        />
      </View>
    </View>
  );
}
