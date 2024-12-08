import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EpisodesScreen from "../EpisodesScreen";
import EpisodeDetailsScreen from "../EpisodeDetailsScreen";

const Stack = createStackNavigator();

const EpisodesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Episodes" 
        component={EpisodesScreen} 
        options={{ title: "Afleveringlijst " }} 
      />
      <Stack.Screen 
        name="EpisodeDetails" 
        component={EpisodeDetailsScreen} 
        options={{ title: "" }} 
      />
    </Stack.Navigator>
  );
};

export default EpisodesStack;
