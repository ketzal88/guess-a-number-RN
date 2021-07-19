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

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>The Game is Over!</Text>
      <Text>Number of Rounds: {props.roundsNumber}</Text>
      <Text>Number was: {props.userNumber}</Text>
      <Button title={"New Game"} onPress={props.onRestart} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});

export default GameOverScreen;
