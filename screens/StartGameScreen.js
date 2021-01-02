import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

const StartGameScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Start a New Game!</Text>
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
    alignItems: "center",
    // 'rgba(0,0,0,0.5)' 이것도 쓸 수 있다. 헥사코드도.
    shadowColor: "black",
    // React Native 공식 홈페이지에 가서
    // View component에 styling 할 수 있는 목록을 나중에 확인해봐라
    // 개 많으니까.
    // 뭐야 이거 거의 그냥 box-shadow랑 비슷하잖아
    // 근데 이 shadow propeties는 ios에만 적용이 된다. 개떡같네
    shadowOffset: { width: 0, height: 2 },
    // 그리고 이렇게 6으로 하면은 원래 그림자가 밑에만 생겨야 하는데
    // 왼쪽, 오른쪽, 위에 다 생긴다. 진짜 offset에 설정한 곳에만 그림자가 나타나게 하려면
    // Radius를 0으로 setting을 해줘야 한다는 것이다.
    shadowRadius: 6,
    shadowOpacity: 0.26,
    // 기본이 white인 것 처럼 보이지만 원래는
    // transparent가 default라는 것을 알면 된다.
    // 그래서 굳이 여기에다가 white라고 적어준 것이다.
    backgroundColor: "white",
    // shadow~~는 ios를 위한 styling이다.
    // android는 elevation을 사용해야 한다는 것을 기억해두자.
    elevation: 8,
    padding: 20,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
});

export default StartGameScreen;
