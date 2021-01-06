import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import Color from "../constants/colors";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <TitleText>The Game is over!</TitleText>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/success.png")}
          resizeMode="cover"
        />
      </View>
      {/* 자자 여기서 알아야 할 것은 Text component 안에다가
      Text를 중첩할 수 있다는 개념이다. 별표~ 
      아 그리고 엄청 중요한게, 저번에 View라는 component에다가
      FontFamily를 넣어서 그 밑에있는거에다가 상속하려고 했는데,
      그건 CSS에서나 먹히는거지 여기서는 불가능 했었다.
      하지만 Text안에 Text component가 있을경우
      부모의 Text에다가 Styling을 하게 되면은 자식도 그것을 물려받는
      상속의 개념이 여기는 동작한다는 것이다.
      뭐 이런건 그려려니 하고 필요할떄 쓰면 되는거겠지.
      거의 유일한 예외상황이라고 생각하면 된다.
      */}
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Your phone needed{" "}
          <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
          guess the number
          <Text style={styles.highlight}>{props.userNumber}</Text>
        </BodyText>
      </View>
      <Button title="NEW GAME" onPress={props.onRestart} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "black",
    width: 300,
    height: 300,
    overflow: "hidden",
    marginVertical: 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: 15,
  },
  // 희한한것은 text에다가 가운데 정렬을 쓰게 되는것이다.
  // CSS 같으면은 Container에다가 쓸 것 같은데
  // 하긴 여기는 상속이 개념이 안먹히기 떄문에 그렇게 하는게 당연한 것 같다 생각해보니까.
  resultText: {
    textAlign: "center",
    fontSize: 20,
  },
  highlight: {
    color: Color.primary,
    fontFamily: "open-sans-bold",
  },
});

export default GameOverScreen;
