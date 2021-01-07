import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import DefaultStyles from "../constants/default-style";
import MainButton from "../components/MainButton";
import { render } from "react-dom";
import BodyText from "../components/BodyText";

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

// map에다가 직접 이런걸 설정 할 수 있찌만,
// 조금 더 분리 하고 싶었다 뭐 그 말인 것 같다
// 물론 component에서 만들 수 도 있겠찌만
// 이건 여기서만 쓸꺼니까 여기다가 따로 뺴서 하는 방법을
// 쓴 것이라고 생각된다.
const renderListItem = (value, numOfRound) => (
  <View key={value} style={styles.listItem}>
    <BodyText>#{numOfRound}</BodyText>
    <BodyText>{value}</BodyText>
  </View>
);

const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that htis is wrong....", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );

    setCurrentGuess(nextNumber);
    setPastGuesses((currentPastGuesses) => [nextNumber, ...currentPastGuesses]);
  };

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.bodyText}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      {/* 흠 좀 헷갈리긴 하는데, View라는 것으로 ScrollView를 감싸야지
      width나 height 뭐 이런것을 컨트롤 할 수 있는 것 같다.
      아직까지 어떤 component가 inline인지 block element인지 파악이 잘 안되는 것 같다.
      정리를 해주면 좋으려만.. */}
      <View style={styles.list}>
        {/* IOS에서는 되는데 Android 에서는 이게 scroll이 안되는 문제가 발생한다.
        왜냐하면 View로 감쌌기 떄문에 android에서는 문제가 되는 것인데 이것은
        view의 style에서 flex:1을 해주면은 해결되는 문제이다.
        조금 까다로우니까 이걸 잘 봐둬야 한다. 뭐 이러한 문제는
        IOS가 default로 좀 더 잘 잡아뒀다 뭐 그렇게 생각해주고 android에서는
        이러한 것들을 직접 추가해야 한다 정도 느낌을 가지고 가면 되겠다.*/}
        <ScrollView>
          {pastGuesses.map((guess, index) => renderListItem(guess, index + 1))}
        </ScrollView>
      </View>
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
    width: 400,
    maxWidth: "90%",
  },
  list: {
    flex: 1,
    width: "80%",
  },

  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    // 자 여기서 알 수 있는 것은
    // View라는 것은 기본적으로 flexDirection이 column으로 되어 있기 떄문에
    // 여기서는 row로 바꿔주자.
    // 또한 반복이긴 한데, Mobile에서는 모든게 이미 flex가 이루어져 있다고
    // 생각을 하면 된다. 그래서 CSS로 따지면은 굳이 display:flex를 해주지 않아도
    // 그게 default 값으로 적용되어 있다고 생각을 하면 된다.
    flexDirection: "row",
    // 이걸 왜 여기다 두었는지 잘 생각해두자.
    justifyContent: "space-around",
  },
});

export default GameScreen;
