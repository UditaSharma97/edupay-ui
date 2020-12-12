import React, {useEffect} from 'react';
import {withNavigation} from 'react-navigation';
import { AsyncStorage } from 'AsyncStorage';
//import {AsyncStorage} from 'react-native';
import {HOME_SCREEN,
        SIGN_IN_SCREEN,
      } from '../constants/StringConstants';

const ResolveNavigationScreen= ({navigation})=> {

  const resolveNavigationScreen= async()=> {
    const token= await AsyncStorage.getItem('TOKEN');
    if(token){
      navigation.navigate(HOME_SCREEN);
    }
    else{
      navigation.navigate(SIGN_IN_SCREEN);
    }
  }

  useEffect(()=> {
    resolveNavigationScreen();
  }, []);

  return null;
}

ResolveNavigationScreen.navigationOptions= ()=> {
  return {
    header: ()=> false
  };
};

export default withNavigation(ResolveNavigationScreen);
