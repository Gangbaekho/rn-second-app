import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

// 뭐 font 사용하려면은 이걸 import 해야 한다는 것 같다.
import * as Font from "expo-font";
// 뭐 AppLoading 화면을 보여주는 거겠지. 그리고 Async를 도와주는
// 역할을 하는 Component라고 생각을 하면 될 듯.
// 아 이거 하기전에 무조건 expo install expo-app-loading 깔아줘야 함.
// 안그러면 에러남.
import AppLoading from "expo-app-loading";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

// 이건 App이 Reload 되는것과는 상관 없으니까 밖에다 해서 하는게
// 바람직하다고 할 수 있음.

const fetchFonts = () => {
  // Font.loadAsync 라는 것은 Promise를 return 한다.
  // 뭐 이걸 가져오는데 바로 가져오지는 못하니까
  // async 적인 것을 이용하기 위해서 Promise를 이용하는거임.
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  // 이런식으로 state를 사용해서 하게 하는거구나.
  // React에서도 비슷하게 사용하면 좋을 것 같긴 하다.

  if (!dataLoaded) {
    return (
      <AppLoading
        // 뭐 밑에있는 것은 말 그대로니까 굳이 설명 안하겠다.
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(error) => console.log(error)}
      />
    );
  }

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverHandler = (numberOfRounds) => {
    setGuessRounds(numberOfRounds);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onRestart={configureNewGameHandler}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
