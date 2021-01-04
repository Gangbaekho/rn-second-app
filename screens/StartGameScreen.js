import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import Colors from "../constants/colors";

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");

  const numberInputHandler = (inputText) => {
    // 여기서 Regular expression을 썼는데,
    // 숫자가 아닌것은 ''로 바꾸겠다 뭐 그런 의미임.
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        // Keyboard라는 것은 react-native에서 가져오긴 했지만
        // 이건 Component라고 보기보다는 API를 가져온거라고 이해를 해야 한다.
        // 그러니까 바로 Object처럼 사용해서 method를 사용한거라고 이해를 하면 되겠음.
        // 결국에는 backdrop 같은 역할을 하는 것을 화면 전체에 깔아준거라고 생각을
        // 하면 될 것 같다. IOS의 키보드 문제떄문에 이것을 했다는 것을 알면 됨.
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            keyboardType="numeric"
            maxLength={2}
            // 오 이러한 것도 바로 적용이 된다.
            // 자 이렇게 까지 하면은, 숫자만 넣을 수 있는 TextInput이 완성된다.
            // blurOnSubmit을 통해서, 키보드가 넣어진다 안드로이드는
            // 근데 IOS는 확인 버튼이 존재하지 않는데, 다른 곳을 탭해도 키보드가 사라지지 않음.
            // 즉, 걍 키보드가 사라지지 않는 문제가 IOS에서는 발생하기 떄문에 이것을 처리 해줘야 함.
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="Reset" onPress={() => {}} color={Colors.accent} />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={() => {}}
                color={Colors.primary}
              />
            </View>
          </View>
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
