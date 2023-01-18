import { StyleSheet, Text, View, Button, ScrollView, ImageBackground } from 'react-native';
import Task from '../components/Task/Task';
import { useEffect, useState } from 'react';
import { COLORS } from '../const';
import { getTasksAsync } from '../features/tasks/tasksSlice';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header/Headr';
import { getSortedTask } from '../helpers';

export default function MainPage({ navigation, route }) {
  const sort = route.params?.sort;
  const dispatch = useDispatch();
  const tasks = useSelector((state) => getSortedTask([...state.mainTasks.tasks], sort));
  useEffect(() => {
    dispatch(getTasksAsync());
  }, []);

  return (
    <ImageBackground
      style={{ flex: 1, flexDirection: 'column' }}
      source={require('../assets/main_page_bg.png')}
      resizeMode={'cover'}>
      <Header navigation={navigation} />
      <ScrollView style={styles.container}>
        <View style={styles.list}>
          {tasks.map((task) => (
            <Task
              navigation={navigation}
              description={task.description}
              colorName={task.color}
              color={COLORS[task.color]}
              key={task.id}
              id={task.id}
              dueDate={task.dueDate}
              taskData={task}
              repeatingDays={task.repeatingDays}
            />
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    flexDirection: 'row'
  }
});
