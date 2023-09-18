import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DashboardScreen, CategoriesScreen } from './src/screens';
import { Provider } from 'react-redux'
import { store } from './src/store';

const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}



function Routes() {
  const categories = [
    { id: 'newin1', title: 'New In 1' },
    { id: 'newin2', title: 'New In 2' },
    { id: 'newin3', title: 'New In 3' },
    { id: 'newin4', title: 'New In 4' },
  ]
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Categories">
        <Drawer.Screen name="Dashboard" component={DashboardScreen} />
        <Drawer.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{ headerTitle: "Manage Categories" }}
        />
        {categories.map(category => (
          <Drawer.Screen key={category.id} name={category.title} component={CategoriesScreen} />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
