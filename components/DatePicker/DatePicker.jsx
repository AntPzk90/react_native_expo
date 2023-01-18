import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars/src/index';
import moment from 'moment';
import CloseIcon from './closeIcon.svg';
import { COLORS } from '../../const';
import CalIcon from '../../assets/calendar.svg';

export default function DatePicker({ dueDate, color, onChangeDateCb }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(dueDate ? moment(dueDate).format('YYYY-MM-DD') : dueDate);
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <Pressable
          style={styles.calendarWrapper}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <CloseIcon style={styles.iconClose} fill={color} />
          <Calendar
            markedDates={
              date
                ? {
                    [date]: { selected: true, marked: true }
                  }
                : {}
            }
            current={moment().format('YYYY-MM-DD')}
            style={styles.calendar}
            onDayPress={(day) => {
              setDate(day.dateString);
              onChangeDateCb(moment(day).toISOString());
            }}
            hideArrows={false}
            hideExtraDays={true}
            disableMonthChange={false}
            firstDay={1}
            theme={{
              todayTextColor: 'red',
              selectedDayBackgroundColor: color,
              arrowColor: color
            }}
          />
        </Pressable>
      </Modal>
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <View style={styles.calendarIconWrapper}>
          <CalIcon style={styles.calendarIcon} fill={'#000'} />
        </View>
        <Text style={styles.textBtn}>{date ? moment(date).format('YYYY MM DD') : 'No date'}</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  calendarWrapper: {
    backgroundColor: 'rgba(0,0,0, 0.6)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  calendar: {
    borderRadius: 16,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    shadowOffset: { width: 1, height: 4 },
    shadowColor: COLORS.black,
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  iconClose: {
    position: 'absolute',
    top: '10%',
    right: '8%',
    width: 30,
    height: 30
  },
  button: {
    width: '54%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    backgroundColor: COLORS.white,
    borderRadius: 32,
    shadowOffset: { width: 1, height: 4 },
    shadowColor: COLORS.black,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  calendarIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22
  },
  calendarIcon: {
    width: 28,
    height: 28,
    marginTop: 5,
    marginLeft: 7
  },
  textBtn: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
});
