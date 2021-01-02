import React from "react";
import { View, Text, StyleSheet } from "react-native";

const StartGameScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>The Game Screen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    //   모든 space를 get 할 수 있는게 이 방법이라는 것 같다.
    //  전체를 잡는다? 뭐 그런 의미인듯. 나중에 자세히 알아봐야지 뭐.
    //  근데 이건 Header 밑에 적용되는거기 때문에 Header를 제외한 모든 영역을 잡는다.
    //  뭐 이렇게 생각하면 된다는 것 같은데?
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
});

export default StartGameScreen;
