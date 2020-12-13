import React from "react";
import '../../App.css';
import { Login } from './login';
import { Register } from './register';

class IndexPage extends React.Component {

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
    const {isLogginActive} = this.state;
    const current = isLogginActive ? "Register" : "Login";
    const currentAction = isLogginActive ? "login" : "register";
    return(
      <div className="App">
        <div className="login">
            <div className="container">
              {isLogginActive && <Login  history={this.props.history} containerRef={(ref) => this.current = ref}/>}
              {!isLogginActive && <Register history={this.props.history} containerRef={(ref) => this.current = ref}/>}
            </div>
            <RightSide current = {current} containerRef={(ref)=> this.rightSide = ref} onClick={this.changeState.bind(this)} />
        </div>
      </div>
    )
  }

}

const RightSide = (props) => {
  return (<div className="right-side" ref={props.containerRef} onClick={props.onClick}>
    <div className="inner-container">
      <div className="text">{props.current}</div>
    </div>

  </div>);
}

export default IndexPage;
