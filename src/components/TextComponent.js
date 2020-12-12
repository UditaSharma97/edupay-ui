import React from 'react';

//import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const TextComponent = (props) =>{

  return (
      <div style= {viewStyle}>
        <h1 style= {commonStyle}>
          {props.displayText}
        </h1>
        //TouchableOpacity
        <div
          style= {commonStyle}
          onPress= {props.onPress}
        >
          <h1 style= {textStyle}>
            {props.navigationText}
          </h1>
        </div> //TouchableOpacity
      </div>
  )
}

const viewStyle = {
  flexDirection: 'row',
  justifyContent: 'flex-end'
}
const commonStyle = {
  alignSelf: 'flex-end',
  padding: 3,
  fontSize: 15,
  fontWeight: 'bold'
}
const textStyle = {
  fontSize: 15,
  fontWeight: 'bold',
  color: 'rgb(77, 121, 255)'
}

export default TextComponent;
