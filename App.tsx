import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DashboardScreen, CategoriesScreen, SingleCategoryScreen } from './src/screens';
import { Provider } from 'react-redux'
import { store } from './src/store';
import { useAppSelector } from './src/hooks';
import SyncStoreLocal from './src/utils/syncstorelocal';

const Drawer = createDrawerNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <SyncStoreLocal>
        <Routes />
      </SyncStoreLocal>
    </Provider>
  );
}



function Routes() {

  const { categories } = useAppSelector(store => store.categories)
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
          <Drawer.Screen key={category.id} name={category.id} component={SingleCategoryScreen} options={{ drawerLabel: category.name, headerTitle: category.name }} />
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
