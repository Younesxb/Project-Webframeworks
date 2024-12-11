import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const QuizScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

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
  ];

  const handleAnswer = (answer: string) => {
    if (answer === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(`Quiz beëindigd! Je score is: ${score}/${questions.length}`);
      setScore(0);
      setCurrentQuestionIndex(0);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        Vraag {currentQuestionIndex + 1}: {questions[currentQuestionIndex].question}
      </Text>
      {questions[currentQuestionIndex].options.map((option, index) => (
        <Button
          key={index}
          title={option}
          onPress={() => handleAnswer(option)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default QuizScreen;
