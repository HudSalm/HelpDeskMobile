import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#090808ff',
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 40,
  },

  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#e7e1e1ff',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#9a9797ff',
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#262424ff',
    borderColor: '#424040ff',
    borderWidth: 1,
    borderRadius: 8,
    color: '#f7f7f7',
  },
  customButton: {
    marginTop: 25,
    marginBottom: 25,
    backgroundColor: '#28A745',
    color: '#262424ff',
    borderRadius: 20,
    height: 50,
  },
  switchText: {
    color: '#e7e1e1ff',
    textAlign: 'center',
    marginTop: 25,
    textDecorationLine: 'underline',
  },
});

export default styles;
