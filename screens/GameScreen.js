import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNumber;
  }
};

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  );

  // GameScreen 이 rerendering 될떄도 useRef를 사용한건
  // 살아 남는다? 이것에 대해서는 다시 찾아보고 공부를 해보자
  // currentLow가 바뀐다고 해도. GameScreen은 Rerendering되지 않는다.
  // 하지만 이걸 useState로 하면은 currentLow가 바뀌면 Rerendering 된다.
  // 그런 차이점이 있다는 것 같은데 자세하게는 다시 알아봐야 할 듯.
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that htis is wrong....", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }

    // 로직을 위한 것이지
    // 이걸 바꾼다고 Rendering 되게 하고 싶지 않으니까.
    // 이걸 useState로 했다면은 로직 과정에서 화면이 Rerendering이 되는거니까
    // 그걸 피하기 위해서 useRef를 쓴 것이라고 생각하면 된다.
    // 쉽게 말하면 로직용이다. Rendering 용이 아니라.

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
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        {/*
        사실 이거랑 같은건데, bind를 통해서 할 수도 있다 정도 알면 되겠다.
        <Button title="LOWER" onPress={()=>nextGuessHandler('lower')} />
        */}
        <Button title="LOWER" onPress={nextGuessHandler.bind(this, "lower")} />
        <Button
          title="GREATER"
          onPress={nextGuessHandler.bind(this, "greater")}
        />
      </Card>
    </View>
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
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});

export default GameScreen;
