import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Modal
} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import { useState } from 'react';
import { COLORS, COLORS_SUB, radioButtonsData } from '../../const';
import { addRadioButtonsActive } from '../../helpers';
import DatePicker from '../DatePicker/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTasksAsync, updateTasksAsync } from '../../features/tasks/tasksSlice';

export default function TaskEdit({
  navigation,
  description = 'some string',
  dueDate,
  colorName,
  task,
  repeatingDays
}) {
  const [radioButtons, setRadioButtons] = useState(
    addRadioButtonsActive(radioButtonsData, colorName)
  );
  const [activeColor, setActiveColor] = useState(colorName);
  const [textInputValue, setTextInputValue] = useState(description);
  const [repeatingDaysArr, setRepeatingDaysArr] = useState(repeatingDays);
  const [selectedDate, setSelectedDate] = useState(dueDate);
  const dispatch = useDispatch();
  const { isLoading, tasks } = useSelector((state) => state.mainTasks);
  useEffect(() => {
    let isElement = tasks.findIndex((taskEl) => taskEl.id == task.id);
    if (isElement === -1) navigation.navigate('MainPage');
  }, [isLoading]);
  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons([...radioButtonsArray]);
    const selectedItem = radioButtonsArray.filter((item) => item.selected);
    setActiveColor(selectedItem[0].value);
  }

  function onKeyPress() {
    dispatch(
      updateTasksAsync({
        id: task.id,
        is_archived: task.isArchived,
        is_favorite: task.isFavorite,
        color: activeColor,
        repeating_days: repeatingDaysArr,
        description: textInputValue,
        due_date: selectedDate
      })
    );
  }

  function onDayPress(day) {
    let copyObj = Object.assign({}, repeatingDaysArr);
    copyObj[day] = !copyObj[day];
    setRepeatingDaysArr(copyObj);
  }

  function onDeleteBtnPress(id) {
    console.log(id);
    dispatch(deleteTasksAsync(id));
  }

  return (
    <View style={[styles.task, { backgroundColor: COLORS[activeColor] }]}>
      <ImageBackground
        source={require('../../assets/inner_page_bg.jpg')}
        resizeMode={'cover'}
        style={styles.image}>
        <View style={styles.textInputWrapper}>
          <TextInput
            value={textInputValue}
            multiline={true}
            numberOfLines={10}
            style={styles.textInput}
            onChangeText={setTextInputValue}
          />
        </View>
        <View style={styles.repeatingDaysRow}>
          {Object.keys(repeatingDaysArr).map((day) => (
            <TouchableOpacity
              style={
                repeatingDaysArr[day]
                  ? [styles.dayWrapper, { backgroundColor: COLORS[activeColor] }]
                  : [styles.dayWrapper, { backgroundColor: COLORS.grey }]
              }
              onPress={() => {
                onDayPress(day);
              }}
              key={day}>
              <Text style={[styles.day, repeatingDaysArr[day] ? { color: '#fff' } : '']}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <DatePicker
          dueDate={dueDate}
          color={COLORS[activeColor]}
          onChangeDateCb={setSelectedDate}
        />
        <RadioGroup
          containerStyle={styles.radioGroupContainer}
          layout={'row'}
          radioButtons={radioButtons}
          onPress={onPressRadioButton}
        />
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: COLORS[activeColor] }]}
          onPress={onKeyPress}>
          <Text style={styles.textBtn}>{isLoading === 'updating task' ? 'Saving...' : 'SAVE'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: 'red' }]}
          onPress={() => {
            onDeleteBtnPress(task.id);
          }}>
          <Text style={styles.textBtn}>
            {isLoading === 'deleting task' ? 'Deleting...' : 'DELETE'}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  task: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  textInputWrapper: {
    backgroundColor: COLORS.white,
    borderRadius: 25,
    width: '90%',
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 14,
    paddingBottom: 14
  },
  textInput: {
    width: '100%',
    fontSize: 20,
    height: 200,
    textAlignVertical: 'top'
  },
  btn: {
    backgroundColor: COLORS.main,
    width: '70%',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    height: 50,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderRadius: 32,
    elevation: 3,
    paddingTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
    marginBottom: 5,
    shadowOffset: { width: 1, height: 4 },
    shadowColor: COLORS.black,
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  textBtn: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  radioGroupContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    padding: 10,
    paddingTop: 20
  },
  repeatingDaysRow: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  dayWrapper: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.grey,
    borderRadius: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 1, height: 4 },
    shadowColor: COLORS.black,
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  day: {
    fontSize: 20,
    textTransform: 'uppercase',
    textAlign: 'left',
    marginRight: 3
  }
});
