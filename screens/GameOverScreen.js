import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";

import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <TitleText>The Game is over!</TitleText>
      {/* 특이한 것은 그냥 Image를 첨부하는 것인데도 불구하고
      View로 감싸고 있다. Styling을 하는데 이것이 더 효율적인 방법이라고
      소개를 하는 듯 하다. 이런식으로 짜는게 Best practice 인가보다.
      */}
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/success.png")}
          // 뭐 이게 background-size 를 의미하는 듯 하다
          // 여기에도 contain 이랑 cover랑 이런게 있으니까
          // CSS적으로 이해해도 될 것 같다. 아무튼 굳.
          // cover이 default니까 뭐 굳이 안써도둬 되는거구나.
          // contain일 떄 정도만 적어주면 될 것 같다.
          // 그냥 Image를 첨부하는 거지만 약간 Background Image를 하는거랑
          // 비슷하게 적용되는 것 같다.
          resizeMode="cover"
        />
      </View>
      <BodyText>Number of rounds: {props.roundsNumber}</BodyText>
      <BodyText>Number was : {props.userNumber}</BodyText>
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
  // imageContainer를 따로 만들어서 거기에다가
  // 대부분의 Styling을 하고 있다.
  // 여기서 참고해야 할 것은 overflow인데 저것을 하지 않으면은
  // 이미지가 튀어나가게 된다. CSS랑 같은 원리로 동작한다고 생각하면 된다.
  imageContainer: {
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "black",
    width: 300,
    height: 300,
    overflow: "hidden",
    marginVertical: 30,
  },
  // image의 크기는 Container의 100%를 잡게 하는 방식으로
  // 되어 있다.
  image: {
    width: "100%",
    height: "100%",
  },
});

export default GameOverScreen;
