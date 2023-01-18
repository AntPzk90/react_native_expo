import moment from 'moment';
import { FILTERS } from './const';

export const addRadioButtonsActive = (array = [], activeColor) => {
  const copyArr = JSON.parse(JSON.stringify(array));
  let index = copyArr.findIndex((item) => item.value === activeColor);
  copyArr[index].selected = true;
  return copyArr;
};

export const getDateFormat = (date, format) => {
  switch (format) {
    case 'month-day':
      return moment(date).format('Do MMMM');
    default:
      return moment(date).format('Do MMMM hh:mm');
  }
};

export const adapter = function (data) {
  const toCamel = (str) =>
    str.replace(/([-_][a-z])/gi, ($1) => $1.toUpperCase().replace('-', '').replace('_', ''));

  const isObject = function (obj) {
    return obj === Object(obj) && !Array.isArray(obj) && typeof obj !== 'function';
  };

  const keysToCamel = function (obj) {
    if (isObject(obj)) {
      const n = {};

      Object.keys(obj).forEach((k) => {
        n[toCamel(k)] = keysToCamel(obj[k]);
      });

      return n;
    } else if (Array.isArray(obj)) {
      return obj.map((i) => keysToCamel(i));
    }

    return obj;
  };

  return keysToCamel(data);
};

export const getRepeatingDay = (days) => {
  for (const daysKey in days) {
    if (days[daysKey]) return true;
  }
  return false;
};

export const getFilteredTasks = (tasks, filter) => {
  switch (filter) {
    case FILTERS.ALL:
      return tasks.filter((task) => !task.isArchived);
    case FILTERS.OVERDUE:
      return tasks.filter((task) => {
        return (
          moment(task.dueDate).date() + moment(task.dueDate).month() <
          moment(Date.now()).date() + moment(Date.now()).month()
        );
      });
    case FILTERS.TODAY:
      return tasks.filter((task) => {
        return (
          moment(task.dueDate).date() + moment(task.dueDate).month() ==
          moment(Date.now()).date() + moment(Date.now()).month()
        );
      });
    case FILTERS.ARCHIVED:
      return tasks.filter((task) => task.isArchived);
    case FILTERS.REPEATING:
      return tasks.filter((task) => {
        if (getRepeatingDay(task.repeatingDays)) {
          return task;
        }
      });
    case FILTERS.FAVORITES:
      return tasks.filter((task) => task.isFavorite);
    default:
      return tasks;
  }
};

export const getSortedTask = (tasks, param = 'def') => {
  if (param === 'up') {
    return tasks.sort((a, b) => {
      return (
        (a.dueDate === null) - (b.dueDate === null) ||
        +(moment(a.dueDate).unix() < moment(b.dueDate).unix()) // up
      );
    });
  }
  if (param === 'dn') {
    return tasks.sort((a, b) => {
      return (
        (a.dueDate === null) - (b.dueDate === null) ||
        -(moment(a.dueDate).unix() > moment(b.dueDate).unix()) // down
      );
    });
  }
  return tasks;
};
