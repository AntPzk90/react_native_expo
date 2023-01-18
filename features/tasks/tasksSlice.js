import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteData, getData, postData, putData } from './api';
import { adapter } from '../../helpers';
import { FILTERS } from '../../const';

const initialState = {
  tasks: [],
  isLoading: 'idle',
  errors: null,
  isTaskOpen: null,
  filter: FILTERS.ALL
};

export const getTasksAsync = createAsyncThunk('@tasks/fetchTasks', async (path = 'tasks') => {
  const url = `https://16.ecmascript.pages.academy/task-manager/${path}`;

  const response = await getData(url);
  const data = response.json();
  return data;
});

export const updateTasksAsync = createAsyncThunk('@tasks/updateTasks', async (editedTask) => {
  const url = `https://16.ecmascript.pages.academy/task-manager/tasks/${editedTask.id}`;
  const response = await putData(url, editedTask);
  const data = response.json();
  return data;
});

export const deleteTasksAsync = createAsyncThunk('@tasks/deleteTask', async (id) => {
  const url = `https://16.ecmascript.pages.academy/task-manager/tasks/${id}`;
  const response = await deleteData(url);
  const data = response.status;
  return { status: data, id: id };
});

export const postTasksAsync = createAsyncThunk('@tasks/createTasks', async (newTask) => {
  const url = `https://16.ecmascript.pages.academy/task-manager/tasks`;
  const response = await postData(url, newTask);
  const data = response.json();
  return data;
});

const tasksSlice = createSlice({
  name: '@tasks',
  initialState,
  reducers: {
    setTaskOpenStatus: (state, payload) => {
      state.isTaskOpen = payload.payload;
    },
    setFilter: (state, payload) => {
      state.filter = payload.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTasksAsync.pending, (state) => {
      state.isLoading = 'loading';
    });
    builder.addCase(getTasksAsync.fulfilled, (state, action) => {
      state.tasks = adapter(action.payload);
      state.isLoading = 'idle';
    });
    builder.addCase(getTasksAsync.rejected, (state) => {
      state.error = 'some error';
    });
    builder.addCase(updateTasksAsync.pending, (state) => {
      state.isLoading = 'updating task';
    });
    builder.addCase(updateTasksAsync.fulfilled, (state, action) => {
      state.tasks[state.tasks.findIndex((task) => task.id == action.payload.id)] = action.payload;
      state.tasks = adapter(state.tasks);
      state.isTaskOpen = false;
      state.isLoading = 'idle';
    });
    builder.addCase(updateTasksAsync.rejected, (state) => {
      state.error = 'some error';
    });
    builder.addCase(deleteTasksAsync.pending, (state) => {
      state.isLoading = 'deleting task';
    });
    builder.addCase(deleteTasksAsync.fulfilled, (state, action) => {
      const { status, id } = action.payload;
      status == 200
        ? state.tasks.splice(
            state.tasks.findIndex((task) => task.id == id),
            1
          )
        : state.tasks;
      state.isLoading = 'idle';
    });
    builder.addCase(deleteTasksAsync.rejected, (state) => {
      state.error = 'some error';
    });
    builder.addCase(postTasksAsync.pending, (state) => {
      state.isLoading = 'loading';
    });
    builder.addCase(postTasksAsync.fulfilled, (state, action) => {
      state.tasks.unshift(action.payload);
      state.tasks = adapter(state.tasks);
      state.isLoading = 'idle';
    });
    builder.addCase(postTasksAsync.rejected, (state) => {
      state.error = 'some error';
    });
  }
});
export const { setTaskOpenStatus, setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;
