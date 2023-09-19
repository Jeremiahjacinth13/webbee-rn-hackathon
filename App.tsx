import 'react-native-gesture-handler';
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DashboardScreen, CategoriesScreen, SingleCategoryScreen } from './src/screens';
import { Provider } from 'react-redux'
import { store } from './src/store';
import { useAppDispatch, useAppSelector } from './src/hooks';
import SyncStoreLocal from './src/components/syncstorelocal';
import * as ScreenOrientation from 'expo-screen-orientation'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Button } from './src/components';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetCategories } from './src/store/categorySlice';
import { resetMachines } from './src/store/machineSlice';

const Drawer = createDrawerNavigator()

export default function App() {

  React.useEffect(() => {
    (async () => {
      await ScreenOrientation.unlockAsync()
    })();
  })

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
  const dispatch = useAppDispatch()

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Dashboard" component={DashboardScreen} options={{
          headerRight() {
            return (
              <TouchableOpacity onPress={() => {
                AsyncStorage.clear()
                dispatch(resetCategories())
                dispatch(resetMachines())
              }}>
                <Ionicons
                  name="refresh-outline"
                  size={24}
                  color="black"
                  style={{ marginRight: 12 }}
                />
              </TouchableOpacity>
            )
          },
        }} />
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
