import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

const StartGameScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Start a New Game!</Text>
      {/* 추가 팁은 View는 굉장히 스타일을 적용하는데 Flexible하다는 것이다.
      그래서 앞으로도 많이 묶어줄 예정이니까 익숙해지도록 하자.
      */}
      <View style={styles.inputContainer}>
        <Text>Select a Number</Text>
        <TextInput />
        <View style={styles.buttonContainer}>
          <Button title="Reset" onPress={() => {}} />
          <Button title="Confirm" onPress={() => {}} />
        </View>
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
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    // 여기서는 flexDirection이 default로 column이기 떄문에
    // 여기서는 이게 가로 정렬이라는 말이다.
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    // 이걸 하지 않으면 버튼의 길이 만큼만 생기게 되기 때문이다.
    // Web 이랑 특별히 차이가 나는 곳이니 익숙해지도록 하자.
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
});

export default StartGameScreen;
