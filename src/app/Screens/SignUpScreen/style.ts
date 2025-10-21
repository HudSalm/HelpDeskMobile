import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#090808ff',
    marginTop: -50,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#e7e1e1ff',
  },

  input: {
    backgroundColor: '#262424ff',
    borderColor: '#424040ff',
    borderWidth: 1,
    borderRadius: 8,
    color: '#f7f7f7',
  },

  textDepart: {
    marginBottom: 10,
    fontSize: 15,
    marginLeft: 5,
    color: '#e7e1e1ff',
  },

  eyeIcon: {
    padding: 10,
  },

  CustomButton: {
    marginTop: 25,
    marginBottom: 20,
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
