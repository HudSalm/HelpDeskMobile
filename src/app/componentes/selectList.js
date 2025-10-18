import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SelectList = ({
  items,
  selectedValue,
  onValueChange,
  style,
  dropdownIconColor,
}) => {
  return (
    <View style={styles.select}>
      <Picker
        style={[styles.selectList, style]}
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        dropdownIconColor={dropdownIconColor}
      >
        <Picker.Item
          label="Selecione uma opção..."
          value={null}
          enabled={false}
          style={{ color: '#999', backgroundColor: '#262424ff' }}
        />
        {items.map((item) => (
          <Picker.Item
            style={styles.interList}
            key={item.value}
            label={item.label}
            value={item.value}
          />
        ))}
      </Picker>
    </View>
  );
};

export default SelectList;

const styles = StyleSheet.create({
  select: {
    height: 60,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    borderColor: '#424040ff',
    justifyContent: 'center',
    backgroundColor: '#262424ff',
    paddingLeft: 5,
    paddingRight: 5,
  },
  selectList: {
    backgroundColor: '#262424ff',
    height: '100%',
    borderRadius: 100,
    borderWidth: 1,
  },

  interList: {
    color: '#999',
    backgroundColor: '#262424ff',
  },
});
