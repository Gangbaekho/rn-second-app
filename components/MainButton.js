import React from "react";
import {
  View,
  Text,
  StyleSheet,
  // 이건 IOS에 적용해보고
  TouchableOpacity,
  // 이건 Android에 적용해보고 뭐 이런식으로 해보고 싶다 이거다.
  // 이건 그냥 물결 파동치는 그런 버튼을 의미하는거니까 뭐 크게 신경쓸 것은 아니다.
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Color from "../constants/colors";

const MainButton = (props) => {
  let ButtonComponent = TouchableOpacity;

  // 걍 물결버튼이 21버전 이상부터 되서 이렇게 한거임. 특별히 신경쓰지는 말자.
  if (Platform.OS === "android" && Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }
  return (
    // 원래 모습도 기억을 해주고..
    // let을 통해서 어떤게 들어가야 할지 정했으니까
    // ButtonComponent로 대체해주는 모습이다.
    // 사실 여기다가는 무엇을 써도 상관은 없을 것이다. 그냥 이름이니까.
    // 이런 트릭을 자주 쓴다는 것 정도 기억하고. 나도 사용할 수 있도록 하면 된다.
    // <TouchableOpacity onPress={props.onPress}>
    <View style={styles.buttonContainer}>
      <ButtonComponent onPress={props.onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{props.children}</Text>
        </View>
      </ButtonComponent>
    </View>
    // </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // 이 buttonContainer는 버튼 모양이 클릭할떄
  // 음 뭐랄까 outline이 생겨서 그거 없애려고 만든거라고
  // 생각을 하면 된다. 나중에 생각을 해보고 적용해보도록 하자.
  buttonContainer: {
    borderRadius: 25,
    overflow: "hidden",
  },
  button: {
    backgroundColor: Color.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 18,
  },
});

export default MainButton;
