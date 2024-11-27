import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './home';
import DetailsScreen from './details';
import { RootStackParamList } from './types/types';  // Zorg ervoor dat je types importeer
import EpisodesScreen from './EpisodesScreen';


const Drawer = createDrawerNavigator<RootStackParamList>();  // Type je navigator

const RootLayout = () => {
  return (
    <Drawer.Navigator initialRouteName="home">
      <Drawer.Screen name="home" component={HomeScreen} options={{ title: "Characters" }} />
      <Drawer.Screen name="details" component={DetailsScreen} options={{ title: "Details" }} />
      <Drawer.Screen name="episodes" component={EpisodesScreen} options={{ title: "Episodes" }} />
    </Drawer.Navigator>
  );
};

export default RootLayout;
