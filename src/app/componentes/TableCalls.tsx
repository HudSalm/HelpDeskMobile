import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CallTypeUtils } from '@/types/types-utils';
import { Feather } from '@expo/vector-icons';

type Props = {
  item: CallTypeUtils;
  handleModify: (id: number) => void;
  isDelete: boolean;
};

const TableCalls = ({ item, handleModify, isDelete }: Props) => (
  <View style={styles.tableRow}>
    <Text style={[styles.rowText, styles.columnReason]}>{item.reason}</Text>
    <Text style={getStatusStyle(item.status)}>{item.status}</Text>
    <Text style={[styles.rowText, styles.columnDept]}>
      {item.required_department}
    </Text>
    {isDelete ? (
      <View style={styles.columnActions}>
        <TouchableOpacity onPress={() => handleModify(item.id)}>
          <Feather name="trash-2" size={20} color="#E74C3C" />
        </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.columnActions}>
        <TouchableOpacity onPress={() => handleModify(item.id)}>
          <Feather name="edit-2" size={20} color="#E74C3C" />
        </TouchableOpacity>
      </View>
    )}
  </View>
);

const getStatusStyle = (status: string | null) => {
  if (status === 'Aberto') {
    return [styles.statusTextYellow, styles.columnStatusYellow];
  } else if (status === 'Em andamento') {
    return [styles.statusTextBlue, styles.columnStatusBlue];
  }
  return [styles.statusTextGreen, styles.columnStatusGreen];
};

export default TableCalls;

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
    alignItems: 'center',
    gap: 2,
  },
  rowText: {
    color: '#DDDDDD',
    textAlign: 'center',
  },
  columnReason: {
    flex: 2,
    textAlign: 'left',
    paddingLeft: 10,
  },
  columnStatus: {
    flex: 2,
  },
  columnDept: {
    flex: 2,
  },

  columnActions: {
    flex: 1,
    alignItems: 'center',
  },

  statusTextGreen: {
    color: '#57d775ff',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  columnStatusGreen: {
    flex: 1,
    backgroundColor: '#0a3d11b9',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#424040ff',
    padding: 1,
  },
  statusTextYellow: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#c1a414ff',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  columnStatusYellow: {
    flex: 1,
    backgroundColor: '#393206ff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#424040ff',
    padding: 1,
  },
  statusTextBlue: {
    color: '#1470f0ff',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  columnStatusBlue: {
    flex: 1,
    backgroundColor: '#0c164c81',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#424040ff',
    padding: 5,
  },
});
