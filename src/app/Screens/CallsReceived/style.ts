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

  columnActions: {
    flex: 1,
    alignItems: 'center',
  },

  buttomPosition: {
    alignSelf: 'flex-end',
    padding: 25,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignSelf: 'center',
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
    padding: 2,
  },
});

export default styles;
