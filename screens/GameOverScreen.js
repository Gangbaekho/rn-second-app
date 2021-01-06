import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";

import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <TitleText>The Game is over!</TitleText>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          // 이건 local image를 사용할 떄 쓰는 방법이다.
          // source={require("../assets/success.png")}
          // Network를 통해서 가져온 이미지는 항상 Width랑 Height를 꼭 적어줘야 한다는 것을
          // 조심해야 한다. Local image는 꼭 그래야 할 필요는 없다고 하는 것에 반해서
          // Network를 통해서 가져온 이미지는 번거롭지만 정해줘야 한다는 것 같네
          // 아 그리고 또 하나 알아야 할 것은 Network로 가져오는 거기 때문에 아무래도 시간이
          // 조금 걸리게 된다. 그렇기 떄문에 React native에서는 자동으로 fadeDuration={300}을 적용해 놓는다
          // 뭐 이걸 조작하고 싶으면은 다른 숫자로 바꾸면 된다.
          source={{
            uri:
              "https://image.shutterstock.com/image-photo/evening-view-ama-dablam-on-260nw-258841592.jpg",
          }}
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
});

export default GameOverScreen;
