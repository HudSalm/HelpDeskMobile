import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090808ff',
  },

  header: {
    flexDirection: 'row',
    backgroundColor: '#090808ff',
    justifyContent: 'space-between',
    marginTop: 45,
    padding: 25,
  },

  textDashboard: {
    color: '#f7f7f7',
    paddingLeft: 30,
    fontSize: 30,
    fontWeight: 'bold',
  },

  textTittleCalls: {
    color: '#f7f7f7',
    paddingLeft: 30,
    fontSize: 20,
    fontWeight: 'bold',
  },

  calls: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 10,
  },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#3a3a3a',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerText: {
    color: '#f7f7f7',
    fontWeight: 'bold',
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

  buttomPosition: {
    alignSelf: 'flex-end',
    padding: 25,
  },
});

export default styles;
