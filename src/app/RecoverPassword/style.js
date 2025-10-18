import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090808ff',
    padding: 30,
  },

  title: {
    textAlign: 'start',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 40,
    color: '#e7e1e1ff',
  },

  text: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'start',
    color: '#9a9797ff',
  },
  input: {
    backgroundColor: '#262424ff',
    borderColor: '#424040ff',
    borderWidth: 1,
    borderRadius: 8,
    color: '#f7f7f7',
  },
  CustomButton: {
    marginTop: 100,
    backgroundColor: '#28A745',
    color: '#262424ff',
    borderRadius: 20,
    height: 50,
  },
});

export default styles;
