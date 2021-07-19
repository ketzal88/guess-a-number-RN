import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import Colors from "../constants/colors";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNumber = Math.random() * (max - min) + min;
  if (rndNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return parseInt(rndNumber);
  }
};

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, userChoise)
  );
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const [rounds, setRounds] = useState(0);
  const {userChoise, onGameOver} = props;

  useEffect(() => {
    if (currentGuess === userChoise) {
      onGameOver(rounds);
    }
  }, [currentGuess, userChoise]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userChoise) ||
      (direction === "greater" && currentGuess > userChoise)
    ) {
      Alert.alert("Dont lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setRounds(curRounds => curRounds + 1);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text>Opponent's Guess</Text>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card style={styles.buttonContainer}>
          <Button
            title="Lower"
            onPress={nextGuessHandler.bind(this, "lower")}
          />
          <Button
            title="Greater"
            onPress={nextGuessHandler.bind(this, "greater")}
          />
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});

export default GameScreen;
