export const COLORS = {
  blue: '#0B468E',
  yellow: '#FFC107',
  black: '#913FFF',
  green: '#0CEBEB',
  pink: '#EC008C',
  grey: '#EBEBF4',
  main: '#913FFF',
  white: '#fff'
};
export const COLORS_SUB = {
  blue: '#CCE0FF',
  yellow: '#FDF085',
  black: '#CCE0FF',
  green: '#29FFC6',
  pink: '#FC6767'
};
export const radioButtonsData = [
  {
    id: '1', // acts as primary key, should be unique and non-empty string
    // label: 'bl',
    value: 'blue',
    color: COLORS['blue'],
    selected: false,
    borderSize: 4,
    containerStyle: {
      backgroundColor: '#fff',
      borderRadius: 12,
      shadowOffset: { width: 1, height: 4 },
      shadowColor: COLORS.black,
      shadowOpacity: 0.2,
      shadowRadius: 2
    }
  },
  {
    id: '2',
    // label: 'Yl',
    value: 'yellow',
    color: COLORS['yellow'],
    selected: false,
    borderSize: 4,
    containerStyle: {
      backgroundColor: '#fff',
      borderRadius: 12,
      shadowOffset: { width: 1, height: 4 },
      shadowColor: COLORS.black,
      shadowOpacity: 0.2,
      shadowRadius: 2
    }
  },
  {
    id: '3',
    // label: 'Bl',
    value: 'black',
    color: COLORS['black'],
    selected: false,
    borderSize: 4,
    containerStyle: {
      backgroundColor: '#fff',
      borderRadius: 12,
      shadowOffset: { width: 1, height: 4 },
      shadowColor: COLORS.black,
      shadowOpacity: 0.2,
      shadowRadius: 2
    }
  },
  {
    id: '4',
    // label: 'Gr',
    value: 'green',
    color: COLORS['green'],
    selected: false,
    borderSize: 4,
    containerStyle: {
      backgroundColor: '#fff',
      borderRadius: 12,
      shadowOffset: { width: 1, height: 4 },
      shadowColor: COLORS.black,
      shadowOpacity: 0.2,
      shadowRadius: 2
    }
  },
  {
    id: '5',
    // label: 'Pk',
    value: 'pink',
    color: COLORS['pink'],
    selected: false,
    borderSize: 4,
    containerStyle: {
      backgroundColor: '#fff',
      borderRadius: 12,
      shadowOffset: { width: 1, height: 4 },
      shadowColor: COLORS.black,
      shadowOpacity: 0.2,
      shadowRadius: 2
    }
  }
];

export const FILTERS = {
  ALL: 'all',
  OVERDUE: 'overdue',
  TODAY: 'today',
  FAVORITES: 'favorites',
  REPEATING: 'repeating',
  ARCHIVED: 'archived'
};
export const MIN_TASKS_COUNT = 8;
