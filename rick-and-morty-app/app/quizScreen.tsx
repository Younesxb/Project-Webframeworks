import React, { useState, useEffect } from "react"; 
import { FlatList, StyleSheet, View, Text, Button, ImageBackground, Alert, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

const QuizScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0); 

  const questions = [
    {
      question: "Wie is de gekke wetenschapper in Rick and Morty?",
      options: ["Rick", "Morty", "Beth", "Jerry"],
      answer: "Rick",
    },
    {
      question: "Wat is de naam van Morty's vader?",
      options: ["Rick", "Jerry", "Beth", "Summer"],
      answer: "Jerry",
    },
    {
      question: "Wat is de favoriete drank van Rick?",
      options: ["Rum", "Wodka", "Mead", "Sherry"],
      answer: "Wodka",
    },
    {
      question: "Wat is de naam van Morty's zus?",
      options: ["Summer", "Beth", "Jessica", "Annie"],
      answer: "Summer",
    },
    {
      question: "Wie is de beste vriend van Morty?",
      options: ["Rick", "Jerry", "Balthazar", "Noob Noob"],
      answer: "Rick",
    },
    {
      question: "Hoe heet de planeet waar Rick en Morty vaak naartoe reizen?",
      options: ["Zorblax", "Dimension C-137", "Earth", "Plumbus"],
      answer: "Dimension C-137",
    },
    {
      question: "Wie is de eigenaar van de garage die Rick en Morty bezoeken?",
      options: ["Mr. Poopybutthole", "Birdperson", "Squanchy", "Evil Morty"],
      answer: "Birdperson",
    },
    {
      question: "Wat is de naam van de galactische autoriteit in de show?",
      options: [
        "Citadel of Ricks",
        "The Galactic Federation",
        "The Federation",
        "The Galactic Council",
      ],
      answer: "Citadel of Ricks",
    },
    {
      question: "Wie is de leider van de Morty-rebellie?",
      options: ["Evil Morty", "Beth", "Summer", "Noob Noob"],
      answer: "Evil Morty",
    },
    {
      question: "Wat is de naam van Ricks favoriete drank?",
      options: ["Vodka", "Szechuan Sauce", "Rum", "Lime Juice"],
      answer: "Szechuan Sauce",
    },
    {
      question: "Wat voor soort wezen is Mr. Poopybutthole?",
      options: [
        "Een menselijke Poopybutthole",
        "Een onsterfelijk wezen",
        "Een robot",
        "Een alien",
      ],
      answer: "Een menselijke Poopybutthole",
    },
    {
      question: "Wat is Ricks favoriete hobby?",
      options: ["Reizen door universa", "Onderzoek doen", "Koken", "Wiskunde"],
      answer: "Reizen door universa",
    },
    {
      question:
        "Wat is de naam van de ruimte- en tijdreizen voertuig van Rick?",
      options: ["Spaceship", "Rickmobile", "Hoverboard", "Space Cruiser"],
      answer: "Spaceship",
    },
    {
      question: "Wat is de naam van Ricks dochter?",
      options: ["Summer", "Beth", "Jerrica", "Morticia"],
      answer: "Beth",
    },
    {
      question: "Wie is de ex-vrouw van Jerry?",
      options: ["Beth", "Jessica", "Marty", "The Meeseeks"],
      answer: "Beth",
    },
    {
      question: "Wie is de president van de Galactic Federation?",
      options: ["Birdperson", "King Morty", "The President", "Zorblax"],
      answer: "The President",
    },
    {
      question: "Wie heeft Rick geholpen om een universum te verlaten?",
      options: ["Jerry", "Summer", "Beth", "Jessica"],
      answer: "Summer",
    },
    {
      question: "Wie verandert in de monsterlijke versie van zichzelf?",
      options: ["Beth", "Rick", "Summer", "Jerry"],
      answer: "Beth",
    },
    {
      question: "Wat is Ricks grootste angst?",
      options: ["Te sterven", "Alleen zijn", "Verlies van Morty", "Verveling"],
      answer: "Verlies van Morty",
    },
    {
      question: "Wat is het doel van Evil Morty?",
      options: [
        "De Citadel van Ricks te vernietigen",
        "Een andere Rick te vinden",
        "Hersenspoelen van de universa",
        "Universele overheersing",
      ],
      answer: "De Citadel van Ricks te vernietigen",
    },
    {
      question: "Wie is Summer's vriend?",
      options: ["Rick", "Balthazar", "Kyle", "Beth"],
      answer: "Kyle",
    },
    {
      question: "Wie is de leider van de Reptilians in de show?",
      options: ["Rick", "Summer", "Squanchy", "Crocodile Morty"],
      answer: "Squanchy",
    },
    {
      question:
        "Wat is de naam van het ruimteschip van de Galactic Federation?",
      options: [
        "The Death Star",
        "The Federator",
        "The Overlord",
        "The Galactic Ship",
      ],
      answer: "The Federator",
    },
    {
      question: "Wat is de naam van Ricks moeder?",
      options: ["Birdperson", "Hilda", "Marlene", "Noob Noob"],
      answer: "Hilda",
    },
    {
      question: "Wat doet Rick als hij onder druk staat?",
      options: [
        "Het opgeven",
        "Zichzelf verbeteren",
        "Rennen naar zijn lab",
        "Wodka drinken",
      ],
      answer: "Wodka drinken",
    },
  ];

  useEffect(() => {
    const loadHighScore = async () => {
      const storedHighScore = await AsyncStorage.getItem("highScore");
      if (storedHighScore) {
        setHighScore(parseInt(storedHighScore)); 
      }
    };

    loadHighScore();
  }, []);


  const handleAnswer = (answer: string) => {
    if (answer === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
  
      alert(`Quiz beëindigd! Je score is: ${score}/${questions.length}`);

 
      if (score > highScore) {
        setHighScore(score);
        AsyncStorage.setItem("highScore", score.toString()); 
        alert("Gefeliciteerd! Je hebt een nieuwe topscore!");
      }

   
      setScore(0);
      setCurrentQuestionIndex(0);
    }
  };

  const answerColors = [
    { backgroundColor: "#ffcccb", color: "#000" }, // Lichtrood
    { backgroundColor: "#d4edda", color: "#000" }, // Lichtgroen
    { backgroundColor: "#cce5ff", color: "#000" }, // Lichtblauw
    { backgroundColor: "#fff3cd", color: "#000" }, // Lichtgeel
  ];

  return (
    <ImageBackground
      source={require("./assets/images/rickandmortylaadexpo.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.quizBox}>
          <Text style={styles.question}>
            Vraag {currentQuestionIndex + 1}:{" "}
            {questions[currentQuestionIndex].question}
          </Text>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.answerButton,
                {
                  backgroundColor: answerColors[index % answerColors.length].backgroundColor,
                },
              ]}
              onPress={() => handleAnswer(option)}
            >
              <Text
                style={[
                  styles.answerText,
                  {
                    color: answerColors[index % answerColors.length].color,
                  },
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
          <Text style={styles.score}>Huidige Score: {score}</Text>
        </View>

        <View style={styles.highScoreBox}>
          <Text style={styles.highScoreText}>Topscore: {highScore}</Text>
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
    padding: 16,
  },
  quizBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: "center",
    width: "90%", 
    height: 300, 
    justifyContent: "space-evenly", 
  },
  question: {
    fontSize: 18,
    color: "black",
    textAlign: "center", // Zorg dat tekst gecentreerd is
    flexWrap: "wrap", // Tekst wordt naar een nieuwe regel verplaatst indien nodig
  },
  answerButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
    width: "100%", // Laat de knoppen de volledige breedte gebruiken
    alignItems: "center",
  },
  answerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  score: {
    fontSize: 16,
    color: "green",
    marginBottom: 10,
    fontWeight:"bold",
  },
  highScoreBox: {
    marginTop: 20, // Zorg ervoor dat er wat ruimte is tussen de quiz en de topscore
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    width: "90%",
    alignItems: "center",
  },
  highScoreText: {
    fontSize: 18,
    color: "blue",
    fontWeight: "bold",
  },
});

export default QuizScreen;