import React from "react";
import { View, StyleSheet } from "react-native";

const Card = (props) => {
  return (
    //   이렇게 만든 이유를 잘 생각해봐라.
    //   Card라는 것의 스타일을 미리 지정해놓고, 자식들을 거기다가
    //   떄려박는 스타일로 Component를 만든 것이다.
    //   deafult로 적용되는 스타일이 존재하는 것이고, 추가로 client에서
    //   추가되는 스타일을 전달받을 수 있도록 만든 것이 포인트이다.
    //   앞으로 많이 사용할 기술 같으니 잘 알아두도록 하자. 뭐 이해는 갔다
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: "white",
    elevation: 8,
    padding: 20,
    borderRadius: 10,
  },
});

export default Card;
