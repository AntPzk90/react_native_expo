import { ScrollView, StyleSheet, Text, View } from 'react-native';
import InnerPage from './pages/InnerPage';
import MainPage from './pages/MainPage';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { store } from './app/store';

const Stack = createStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="MainPage" component={MainPage} />
          <Stack.Screen name="InnerPage" component={InnerPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    border: 2,
    borderColor: 'red',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 700
  },
  text: {
    height: 40,
    color: 'green',
    backgroundColor: 'yellow',
    paddingTop: 10,
    boxSizing: 'borderBox'
  }
});
