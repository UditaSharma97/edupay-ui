import React, {useState} from 'react';
import {withNavigation} from 'react-navigation';
//import Toast from 'react-native-simple-toast';
import { AsyncStorage } from 'AsyncStorage';
//import {Text, View, Image, StyleSheet, AsyncStorage} from 'react-native';
import InputComponent from '../components/InputComponent';
import ButtonActionComponent from '../components/ButtonActionComponent';
import TextComponent from '../components/TextComponent';
import ApiConnect from '../connections/ApiConnect';
import styles from '../appStyles.module.css';
import {USERNAME_REQUIRED_TEXT, PASSWORD_REQUIRED_TEXT,
        HOME_SCREEN, USERNAME_PLACEHOLDER_TEXT,
        PASSWORD_PLACEHOLDER_TEXT, SIGN_IN_TEXT,
        NEW_PROFILE_TEXT, JOIN_NOW_TEXT,
        JOIN_NOW_SCREEN, SOME_ERROR_OCCURED_TEXT
      } from '../constants/StringConstants';
import {APP_LOGO_PATH} from '../constants/ResourceConstants';

const SignInScreen= ({navigation})=> {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [responseError, setResponseError]= useState('');

  ///////////////////////////////////////////////////// Validation Logic Start
  validateCredentials= async()=> {
    setUserNameError('');
    setPasswordError('');
    setResponseError('');

    if(!userName){
      setUserNameError(USERNAME_REQUIRED_TEXT);
    }
    else if(!password){
      setPasswordError(PASSWORD_REQUIRED_TEXT);
    }
    else if(userName && password){
      await ApiConnect.post('/signIn', {userName, password})
                      .then(async(result)=> {
                            const response= result.data;
                                           //console.log(response);
                            if(response.token){
                               await AsyncStorage.setItem('TOKEN', response.token);
                               //Toast.show(response.message, Toast.SHORT);
                               navigation.navigate(HOME_SCREEN);
                            }
                            else{
                               setResponseError(response.message);
                            }
                       })
                      .catch((error)=> setResponseError(SOME_ERROR_OCCURED_TEXT));
    }
  }
  ///////////////////////////////////////////////////// Validation Logic End
  return (
    <div className= {styles.viewStyle}>
      <img
        className= {styles.imageStyle}
        source= {require('../resources/AppLogo.png')}
      />
      <InputComponent
        placeholderText= {`${USERNAME_PLACEHOLDER_TEXT}`}
        padding= {10}
        borderWidth= {3}
        borderColor= 'black'
        fontSize= {20}
        onChangeText= {(userName)=> {
                        setResponseError('');
                        setUserName(userName);
                      }}
      />
      {userNameError && !userName ?
        <h1 className= {styles.errorTextStyle}>
          {userNameError}
        </h1>
          : null
      }
      <InputComponent
        placeholderText= {`${PASSWORD_PLACEHOLDER_TEXT}`}
        padding= {10}
        borderWidth= {3}
        borderColor= 'black'
        fontSize= {20}
        isHiddenText
        onChangeText= {(password)=> {
                        setResponseError('');
                        setPassword(password);
                      }}
      />
      {passwordError && !password ?
        <h1 className= {styles.errorTextStyle}>
          {passwordError}
        </h1>
          : null
      }
      <ButtonActionComponent
        buttonTitle= {`${SIGN_IN_TEXT}`}
        onPress= {validateCredentials}
        buttonColor= 'rgb(204, 204, 255)'
        marginTop= {30}
        marginLeft= {50}
        marginRight= {50}
        marginBottom= {20}
      />
      {responseError ?
        <h1 classsname={styles.errorTextStyle} style= {{alignSelf: 'center', marginLeft: '15%', marginBottom: '5%'}}>
          {responseError}
        </h1>
          : null
      }
      <TextComponent
        displayText= {`${NEW_PROFILE_TEXT}`}
        navigationText= {`${JOIN_NOW_TEXT}`}
        onPress= {()=> navigation.navigate(JOIN_NOW_SCREEN)}
      />
    </div>
  )
}
SignInScreen.navigationOptions= ()=> {
  return {
    title: SIGN_IN_TEXT,
    header: ()=> false
  };
};

export default withNavigation(SignInScreen);
