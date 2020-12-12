import React from 'react';
//import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const ButtonActionComponent = (props) => {

  return (
    <div
    //<TouchableOpacity
      style= {{touchableOpacityStyle,
              backgroundColor: props.buttonColor,
              marginTop: props.marginTop,
              marginLeft: props.marginLeft,
              marginRight: props.marginRight,
              marginBottom: props.marginBottom
      }}
      onPress= {props.onPress}
     >
        <h1 style= {textStyle}>
          {props.buttonTitle}
        </h1>
    </div>
    //</TouchableOpacity>
  );
}

const touchableOpacityStyle = {
      justifyContent: 'center',
      marginTop: 15,
      marginLeft: 20,
      marginRight: 20,
      padding: 10,
      alignSelf: 'stretch',
      alignItems: 'center',
      borderWidth: 3,
      borderRadius: 8
  }
const textStyle = {
    fontSize: 18,
    fontWeight: 'bold'
  }

export default ButtonActionComponent;
