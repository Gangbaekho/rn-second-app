import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import Color from "../constants/colors";
import MainButton from "../components/MainButton";

const GameOverScreen = (props) => {
  return (
    // 화면의 height가 엄청 작을 경우에는
    // 화면의 크기를 넘어서서 content가 나타날 수 있다.
    // 그렇기 때문에 ScrollView를 넣는 것이라고 하는건데
    // 그렇게 따지면 언제 넘칠지 모르니까 View가 아니라
    // ScrollView로 항상 감싸줘야 하는거 아닌가. 아무튼 뭐 그렇다네.
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The Game is over!</TitleText>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../assets/success.png")}
            resizeMode="cover"
          />
        </View>
        <View style={styles.resultContainer}>
          <BodyText style={styles.resultText}>
            Your phone needed{" "}
            <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
            guess the number
            <Text style={styles.highlight}>{props.userNumber}</Text>
          </BodyText>
        </View>
        <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    borderRadius: Dimensions.get("window").width * 0.7 * 0.5,
    borderWidth: 3,
    borderColor: "black",
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get("window").height / 60,
  },
  resultText: {
    textAlign: "center",
    fontSize: Dimensions.get("window").height < 400 ? 16 : 20,
  },
  highlight: {
    color: Color.primary,
    fontFamily: "open-sans-bold",
  },
});

export default GameOverScreen;
