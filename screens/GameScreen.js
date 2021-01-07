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
      <View style={styles.listContainer}>
        {/* 흠 ScrollView를 styling 하려면은 style이 아니라 이 attribute를 
        이용하라는 거다. 글쎄다 이렇게 해야지 정 가운데로 오긴 하는데,
        왜 그 상위에 View에다가 alignItems를 center로 하면 원하는 대로 나오지 않았을까.
        이건 좀 더 개인적으로 테스트를 해야 할 부분인 것 같다.
        */}
        <ScrollView contentContainerStyle={styles.list}>
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
  listContainer: {
    flex: 1,
    width: "80%",
  },
  list: {
    flexGrow: 1,
    alignItems: "center",
    // 흠 이렇게 하면은 ScrollView 에서
    // Item들이 밑에서 부터 생겨난다. 왜냐면
    // 수직 정렬을 통해서 flex-end로 했기 떄문에 그렇다.
    // 반대로 하면 위에서 부터 생기겠찌.
    // center로 하면 가운데에서부터 생기는건가 음 그렇네
    // 아이템이 생기는 위치를 이걸로 지정할 수 있겠다.
    // 뭐야 근데 스크롤이 안되잖아. flex:1을 적용하고 나니까.
    // 그러니까 flexGrow를 써야한다 뭐 그 말인데.. 잘 모르겠네
    // 자 다시 생각해 보면 flex:1이란 것은 가능한한 많은 공간을 차지해라 라는것이고
    // flexGrow도 같은 내용을 포함하고 있지만 ScrollView에서 사용하는 것이라고
    // 일단은 생각하고 넘어가자, 좀 더 flexible 한 방법이라고 생각하면 된다.
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    // 이걸 안하게 되면은 부모의 width:80%의 100%만큼 다 차게 된다 뭐
    // 이 말인 것 같은데 계속 헷갈리긴 하네.
    width: "60%",
  },
});

export default GameScreen;
