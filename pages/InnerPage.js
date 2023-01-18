import TaskEdit from '../components/TaskEdit/TaskEdit';
import { COLORS } from '../const';

const InnerPage = ({ navigation, route }) => {
  const taskData = route.params.task;
  return (
    <TaskEdit
      navigation={navigation}
      route={route}
      color={COLORS[taskData.color]}
      description={taskData.description}
      colorName={taskData.color}
      repeatingDays={taskData.repeatingDays}
      dueDate={taskData.dueDate}
      task={taskData}
    />
  );
};

export default InnerPage;
