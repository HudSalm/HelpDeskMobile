import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#090808ff',
    gap: 10,
  },

  titleRegister: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 60,
    fontWeight: 'bold',
    color: '#f7f7f7',
    fontWeight: 'bold',
  },

  textDepartment: {
    fontSize: 15,
    marginLeft: 10,
    color: '#f7f7f7',
  },

  inputReason: {
    backgroundColor: '#262424ff',
    borderColor: '#424040ff',
    borderWidth: 1,
    borderRadius: 8,
    color: '#f7f7f7',
  },

  description: {
    height: 200,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#424040ff',
    borderRadius: 8,
    backgroundColor: '#f7f7f7',
    textAlignVertical: 'top',
    textAlign: 'left',
    padding: 10,
    backgroundColor: '#262424ff',
    color: '#f7f7f7',
  },
  customButton: {
    marginTop: 10,
    backgroundColor: '#28A745',
    color: '#262424ff',
    borderRadius: 20,
    height: 50,
  },
});

export default styles;
