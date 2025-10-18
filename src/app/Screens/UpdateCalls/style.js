import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#090808ff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: '#f7f7f7',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    color: '#9a9797ff',
    fontSize: 16,
    marginTop: 15,
  },
  value: {
    color: '#f7f7f7',
    fontSize: 20,
    marginBottom: 10,
  },
  valueDescription: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 10,
    lineHeight: 22,
  },
  pickerContainer: {
    backgroundColor: '#262424ff',
    borderRadius: 8,
    marginTop: 5,
  },
  picker: {
    color: '#f7f7f7',
  },
  customButton: {
    marginTop: 50,
    backgroundColor: '#28A745',
    color: '#262424ff',
    borderRadius: 20,
    height: 50,
  },
});

export default styles;
