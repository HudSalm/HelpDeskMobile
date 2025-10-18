import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#090808ff',
  },
  containerItensWithPhoto: {
    backgroundColor: '#2a2a2a',
    margin: 20,
    borderRadius: 8,
    padding: 15,
    paddingTop: 60,
    gap: 15,
    position: 'relative',
  },
  containerItens: {
    backgroundColor: '#2a2a2a',
    margin: 20,
    borderRadius: 8,
    padding: 15,
    gap: 15,
  },

  pressableCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    margin: 10,
    position: 'absolute',
    top: -70,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  text: {
    color: '#e7e1e1ff',
  },
  textEdit: {
    color: '#9a9797ff',
  },
  itens: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#3a3a3a',
    padding: 15,
    borderRadius: 8,
  },
  edit: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
});

export default styles;
