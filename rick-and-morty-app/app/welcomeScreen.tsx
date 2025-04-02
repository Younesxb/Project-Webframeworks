import React from "react";
import { View, Text, StyleSheet, Button, ImageBackground } from "react-native";
import { HomeScreenProps } from "./types/types";

const WelcomeScreen = ({ navigation }:HomeScreenProps) => {
  return (
    <ImageBackground
      source={require("./assets/images/rickandmortylaadexpo.jpg")} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welkom op mijn Rick and Morty project!</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Klik hier voor Rick & Morty Karakters"
            color="#000"
            onPress={() => navigation.navigate("home")}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  textContainer: {
    backgroundColor: "white", 
    borderRadius: 8, 
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20, 
    elevation: 5, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 4, 
  },
  title: {
    fontSize: 24,
    color: "#000",
    textAlign: "center",
  },
  buttonContainer: {
    backgroundColor: "white", 
    borderRadius: 8, 
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 5, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25, /
    shadowRadius: 4, 
  },
});

export default WelcomeScreen;
