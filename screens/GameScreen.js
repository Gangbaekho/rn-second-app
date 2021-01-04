import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

// 자 이렇게 GameScreen의 props와 관련되 있지 않으면,
// 또는 GameScreen과 독립적으로 존재해도 될 것 같은 것은
// 이렇게 밖에다 넣어도 된다는 것이다.
const generateRandomBetween = (min, max, exclude) => {
  // 여기는 그냥 비지니스 로직이라서 신경 안써도 된다.
  // 나중에 내 비지니스 로직이나 잘 짜면 된다.
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

  return (
    <View>
      <Text>This is the GameScreen ~~</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Gamescreen;
