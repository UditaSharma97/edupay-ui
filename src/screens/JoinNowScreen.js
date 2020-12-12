import React, {useState} from 'react';
import {withNavigation} from 'react-navigation';
//import Toast from 'react-native-simple-toast';
import { AsyncStorage } from 'AsyncStorage';
//import {View, Text, Image, StyleSheet, AsyncStorage} from 'react-native';
import InputComponent from '../components/InputComponent';
import ButtonActionComponent from '../components/ButtonActionComponent';
import TextComponent from '../components/TextComponent';
import ApiConnect from '../connections/ApiConnect';
import {FULLNAME_REQUIRED_TEXT, USERNAME_REQUIRED_TEXT,
        PASSWORD_REQUIRED_TEXT, HOME_SCREEN,
        FULL_NAME_PLACEHOLDER_TEXT, USERNAME_PLACEHOLDER_TEXT,
        PASSWORD_PLACEHOLDER_TEXT, SIGN_IN_TEXT,
        JOIN_NOW_TEXT, SIGN_IN_SCREEN,
        OLD_PROFILE_TEXT, SOME_ERROR_OCCURED_TEXT
      } from '../constants/StringConstants';
import styles from '../appStyles.module.css';
const JoinNowScreen= ({navigation})=> {

  const [fullName, setFullName]= useState('');
  const [userName, setUserName]= useState('');
  const [password, setPassword]= useState('');
  const [fullNameError, setFullNameError]= useState('');
  const [userNameError, setUserNameError]= useState('');
  const [passwordError, setPasswordError]= useState('');
  const [responseError, setResponseError]= useState('');

  ///////////////////////////////////////////////////// Validation Logic Start
  validateCredentials = async() => {
    setUserNameError('');
    setPasswordError('');
    setFullNameError('');
    setResponseError('');

    if(!fullName){
      setFullNameError(FULLNAME_REQUIRED_TEXT);
    }
    else if(!userName){
      setUserNameError(USERNAME_REQUIRED_TEXT);
    }
    else if(!password){
      setPasswordError(PASSWORD_REQUIRED_TEXT);
    }
    else if(userName && password && fullName){
      await ApiConnect.post('/joinNow', {fullName, userName, password})
                      .then(async(result)=> {
                            const response= result.data;
                            console.log(response);
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
          className = {styles.imageStyle}
          source = {require('../resources/AppLogo.png')}
        />
        <InputComponent
          placeholderText= {`${FULL_NAME_PLACEHOLDER_TEXT}`}
          padding= {10}
          borderWidth= {3}
          borderColor= 'black'
          fontSize= {20}
          onChangeText= {(fullName)=> {
                          setResponseError('');
                          setFullName(fullName);
                        }}
        />
        {fullNameError && !fullName ?
          <h1 className= {styles.errorTextStyle}>
            {fullNameError}
          </h1>
            : null
        }
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
          buttonTitle= {`${JOIN_NOW_TEXT}`}
          onPress= {validateCredentials}
          buttonColor= 'rgb(204, 204, 255)'
          marginTop= {30}
          marginLeft= {50}
          marginRight= {50}
          marginBottom= {20}
        />
        {responseError ?
          <h1 className= {styles.errorTextStyle} style= {{alignSelf: 'center', marginLeft: '15%', marginBottom: '5%'}}>
            {responseError}
          </h1>
            : null
        }
        <TextComponent
          displayText= {`${OLD_PROFILE_TEXT}`}
          navigationText= {`${SIGN_IN_TEXT}`}
          onPress= {()=> navigation.navigate(SIGN_IN_SCREEN)}
        />
      </div>
  )
}

export default withNavigation(JoinNowScreen);
