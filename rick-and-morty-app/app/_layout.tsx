import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ImageBackground, StyleSheet } from "react-native";
import HomeScreen from "./homeScreen";
import DetailsScreen from "./details";
import Quiz from "./quizScreen";
import { RootStackParamList } from "./types/types";
import EpisodesScreen from "./episodesScreen";



const Drawer = createDrawerNavigator<RootStackParamList>();

const RootLayout = () => {
  return (
    <ImageBackground
      source={require("./assets/images/RickAndMortyBackground.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <Drawer.Navigator
        initialRouteName="home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          headerTitleStyle: {
            color: "white",
          },
          drawerStyle: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          drawerActiveTintColor: "white",
          drawerInactiveTintColor: "white",
        }}
      >
        <Drawer.Screen
          name="home"
          component={HomeScreen}
          options={{ title: "Rick & Morty karakters" }}
        />
        <Drawer.Screen
          name="details"
          component={DetailsScreen}
          options={{ title: "Details" }}
        />
        <Drawer.Screen
          name="episodes"
          component={EpisodesScreen}
          options={{ title: "Episodes" }}
        />
        <Drawer.Screen
          name="quiz"
          component={Quiz}
          options={{ title: "Rick and Morty Quiz" }}
        />


      </Drawer.Navigator>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default RootLayout;
