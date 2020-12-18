import React from "react";
import '../../App.css';
import UserStore from "../../stores/userStore";
import { observer }  from 'mobx-react';
import LoginFormComponent from '../../components/loginFormComponent';
import SubmitButtonComponent from '../../components/submitButton';
import RegisterFormComponent from '../../components/registerFormComponent';

class IndexPage extends React.Component {

  async componentDidMount(){
    try{
      let res = await fetch('/isLoggedIn',{
        method: 'post',
        headers:{
          'Accept': 'application/json',
          'Content-Type':'application.json'
        }
      });
      let result = await res.json();
      if(result && result.success){

        UserStore.loading=false;
        UserStore.isLoggedIn=true;
        UserStore.username=result.username;

      }else{
        UserStore.loading=false;
        UserStore.isLogginActive=false;
      }
    }catch(e){
      UserStore.loading=false;
      UserStore.isLoggedIn=false;
    }
  }

  async doLogout(){
    try{
      let res = await fetch('/logout',{
        method: 'post',
        headers:{
          'Accept': 'application/json',
          'Content-Type':'application.json'
        }
      });
      let result = await res.json();
      if(result && result.success){
        UserStore.isLoggedIn=false;
        UserStore.username='';

      }
    }catch(e){
        console.log(e);
    }
  }
  
  constructor(props){
    super(props);
    this.state = {
      isLogginActive: true,
      current: "Register"
    }
  }

  changeState(){
    
    const { isLogginActive } = this.state;

    if (isLogginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }
    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));

  }

  render(){
    if(UserStore.loading){

      return (
        <div className='App'>
          <div classname='container'>
            Loading, please wait...
          </div>
        </div>
      );

    }else{

      if(UserStore.isLoggedIn){
        return(
          //render home screen
          <div classname='App'>
            <div classname='container'>
              Welcome {UserStore.username}

              <SubmitButtonComponent
              text={'Log out'}
              disabled={false}
              onClick={()=>this.doLogout()}
              />
            </div>
          </div>


        );
      }

      const { isLogginActive } = this.state;
      const current = isLogginActive ? "Register" : "Login";
      const currentAction = isLogginActive ? "login" : "register";
      return(
        <div className="App">
          <div className="login">
              <div className="container">
                {isLogginActive && <LoginFormComponent  history={this.props.history} containerRef={(ref) => this.current = ref}/>}
                {!isLogginActive && <RegisterFormComponent history={this.props.history} containerRef={(ref) => this.current = ref}/>}
              </div>
              <RightSide current = {current} containerRef={(ref)=> this.rightSide = ref} onClick={this.changeState.bind(this)} />
          </div>
        </div>
      );
    }
  }
}

const RightSide=(props)=>{
  return (
  <div className="right-side" ref={props.containerRef} onClick={props.onClick}>
    <div className="inner-container">
      <div className="text">
        {props.current}
      </div>
    </div>
  </div>
  );
}

export default observer(IndexPage);
