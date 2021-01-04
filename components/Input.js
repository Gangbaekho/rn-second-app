import React from "react";
import { TextInput, StyleSheet } from "react-native";

//  이렇게 기본적인 Input의 style을 미리 정해놓고
//  추가 style을 할 수 있도록 고안한 것이다. 이전에 했으니까 어려운건 아니다.
//  ...props.style은 직관적으로 이해가 가지만.
// Input에서 받은 props를 바로 그냥 TextInput에 적용하는 방법으로써
// ...props 라는 것을 썼다. 알아서 매핑시켜주는 그런 역할을 하는 것이라고
// 이해를 하면 될 듯 하다.

// 그러니까 즉 나의 Custom Component에서 설정한 props의 값을
// 그대로 TextInput에다가 전달하는 행위로 받아드리면되고,
// 당연히 TextInput에 적용 될 수 있는 props를 전달하는게 맞겠지.
// 이건 상식적인거니까 뭐 그려려니 하고 넘어가면 될 듯 하다.

const Input = (props) => {
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

export default Input;
