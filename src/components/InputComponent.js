import React from 'react';

//import {TextInput, StyleSheet} from 'react-native';

const InputComponent = (props) => {

    return (
    <input style= {[textInputStyle,
                       {padding: props.padding,
                        borderWidth: props.borderWidth,
                        borderColor: props.borderColor,
                        fontSize: props.fontSize}]}
       placeholder= {props.placeholderText}
       placeholderTextColor= 'rgb(179, 179, 179)'
       multiline= {props.allowMultiline}
       autoCapitalize= 'none'
       autoCorrect= {false}
       autoComplete= {false}
       secureTextEntry= {props.isHiddenText}
       onChangeText= {props.onChangeText}
    />
  );
}

const textInputStyle= {
    alignSelf: 'stretch',
    margin: 15,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    fontWeight: 'bold'
  }

export default InputComponent;
