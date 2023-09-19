import 'react-native-gesture-handler';
import * as React from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DashboardScreen, CategoriesScreen, SingleCategoryScreen } from './src/screens';
import { Provider } from 'react-redux'
import { RootState, store } from './src/store';
import { useAppSelector } from './src/hooks';
import SyncStoreLocal from './src/utils/syncstorelocal';
import * as ScreenOrientation from 'expo-screen-orientation'

const Drawer = createDrawerNavigator()

export default function App() {

  React.useEffect(() => {
    (async () => {
      await ScreenOrientation.unlockAsync()
    })();
  })

  return (
    <Provider store={store}>
      <SafeAreaView style = {{ flex: 1, backgroundColor: 'white' }}>
        <SyncStoreLocal>
          <Routes />
        </SyncStoreLocal>
      </SafeAreaView>
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
