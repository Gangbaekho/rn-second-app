import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import Colors from "../constants/colors";

const StartGameScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Start a New Game!</Text>
      <Card style={styles.inputContainer}>
        <Text>Select a Number</Text>
        {/* 자자 다시 이해 하고 넘어가자면 당연히
        Input은 내가 만든 Custom component이기 떄문에 
        blurOnSubmit autoCapitalize 이런거 당연히 안먹힌다. 그거에 대한
        설정을 내가 Input component에다가 하지 않았기 떄문이다.
        하지만 이러한 설정을 그대로 TextInput에다가 넘길 수 있다면
        이미 정의된 TextInput의 기능에 따라 저러한 property를 이용할 수 있다는 것이다.
        특이한건 blurOnSubmit이 Enter를 칠 수 있도록 Option이라고 설명하는데 잘 모르곘네.
        */}
        <Input
          style={styles.input}
          blurOnSubmit
          autoCapitalize="none"
          keyboardType="numeric"
          maxLength={2}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Reset" onPress={() => {}} color={Colors.accent} />
          </View>
          <View style={styles.button}>
            <Button title="Confirm" onPress={() => {}} color={Colors.primary} />
          </View>
        </View>
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
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  button: {
    width: "40%",
  },
  // width 같은것은 Input Component를 사용하는
  // Client에서 직접 줄 수 있도록 하는게 바람직하다라는 설계이다.
  input: {
    width: 50,
    textAlign: "center",
  },
});

export default StartGameScreen;
