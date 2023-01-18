import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { COLORS } from '../../const';

export default function Header({ navigation }) {
  const sort = ['up', 'dn', 'Df'];
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.text}>{'TASKMANAGER'}</Text>
      </View>
      <SelectDropdown
        data={sort}
        defaultButtonText={'Sort'}
        buttonStyle={styles.buttonStyle}
        buttonTextStyle={styles.buttonTextStyle}
        dropdownStyle={styles.dropdownStyle}
        rowTextStyle={styles.rowTextStyle}
        selectedRowStyle={styles.selectedRowStyle}
        defaultValueByIndex={2}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
          navigation.navigate('MainPage', { sort: selectedItem });
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return `Sort by ${selectedItem}`;
        }}
        rowTextForSelection={(item, index) => {
          return `Sort by ${item}`;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    top: 0,
    left: 0,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  text: {
    textTransform: 'uppercase',
    fontSize: 16,
    color: '#fff'
  },
  buttonStyle: {
    backgroundColor: COLORS.main,
    flexBasis: 136,
    textAlign: 'left',
    borderRadius: 20,
    height: 40
  },
  buttonTextStyle: {
    color: '#fff',
    fontSize: 16,
    textTransform: 'uppercase'
  },
  dropdownStyle: {
    borderRadius: 25,
    backgroundColor: COLORS.main
  },
  rowTextStyle: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 14
  },
  selectedRowStyle: {
    backgroundColor: COLORS.pink
  }
});
