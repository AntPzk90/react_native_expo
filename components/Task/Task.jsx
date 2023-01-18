import { StyleSheet, Text, View, ImageBackground, TouchableHighlight } from 'react-native';
import { COLORS, COLORS_SUB } from '../../const';
import CalIcon from '../../assets/calendar.svg';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';

export default function Task({
  navigation,
  description,
  color,
  colorName,
  id,
  taskData,
  dueDate,
  repeatingDays
}) {
  return (
    <LinearGradient colors={[COLORS_SUB[colorName], color]} style={styles.task}>
      <TouchableHighlight
        style={styles.link}
        onPress={() => {
          navigation.navigate('InnerPage', { id: id, task: taskData });
        }}>
        <ImageBackground
          // source={}
          resizeMode={'cover'}
          style={styles.image}>
          <View style={styles.repeatingDaysTxtRow}>
            <Text style={styles.dayTxt}>{'Repeating days'}</Text>
          </View>
          <View style={styles.repeatingDaysRow}>
            {Object.keys(repeatingDays).map((day) => (
              <View
                style={
                  repeatingDays[day]
                    ? [styles.dayWrapper, { backgroundColor: color }]
                    : [styles.dayWrapper, { backgroundColor: COLORS.grey }]
                }
                key={day}>
                <Text
                  style={
                    repeatingDays[day]
                      ? [styles.day, { color: '#fff' }]
                      : [styles.day, { color: '#000' }]
                  }>
                  {' '}
                  {day}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.textWrapper}>
            <Text numberOfLines={4} style={styles.text}>
              {description}
            </Text>
          </View>
          <View style={styles.calendarRow}>
            <View style={[styles.calendarWrapper, { borderColor: color }]}>
              <CalIcon style={styles.calendar} fill={'#fff'} />
            </View>
            <Text style={styles.date}>
              {dueDate ? moment(dueDate).format('DD MMM YY') : 'No date'}
            </Text>
          </View>
        </ImageBackground>
      </TouchableHighlight>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  task: {
    position: 'relative',
    width: '46%',
    borderRadius: 40,
    minHeight: 166,
    marginTop: 4,
    marginBottom: 4,
    backgroundColor: '#fff'
  },
  link: {
    justifyContent: 'center',
    flex: 1,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 40
  },
  text: {
    width: 'auto',
    position: 'relative',
    fontSize: 9,
    fontWeight: 'normal',
    textTransform: 'capitalize',
    textAlign: 'left',
    zIndex: 2,
    color: '#9B9191',
    padding: 10
  },
  textWrapper: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    alignSelf: 'flex-start',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    marginLeft: 'auto',
    marginBottom: 2,
    height: 86
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    padding: 5
  },
  calendarRow: {
    width: '90%',
    height: 42,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: 2,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 8
  },
  calendarWrapper: {
    width: 30,
    height: 30,
    marginRight: 18,
    backgroundColor: 'transparent',
    borderRadius: 12,
    shadowOffset: { width: 1, height: 4 },
    shadowColor: COLORS.black,
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  calendar: {
    width: 30,
    height: 30,
    marginTop: 2,
    marginLeft: 3
  },
  date: {
    flex: 1,
    flexShrink: 1,
    textAlign: 'right',
    flexWrap: 'wrap',
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: COLORS.white,
    marginLeft: 4
  },
  repeatingDaysRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18
  },
  dayWrapper: {
    width: 20,
    height: 14,
    backgroundColor: COLORS.grey,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 1, height: 4 },
    shadowColor: COLORS.black,
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  day: {
    fontSize: 8,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  repeatingDaysTxtRow: {
    justifyContent: 'center',
    marginBottom: 12,
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#1C1D2F',
    borderRadius: 20
  },
  dayTxt: {
    width: 'auto',
    fontSize: 8,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#fff'
  }
});
