import React from 'react';
import InputFieldComponent from './inputFieldComponent';
import SubmitButtonComponent from './submitButton'
import UserStore from '../stores/userStore';
import { ADMIN_HOME } from "../constants/pageNames";
import loginImg from "../money.svg"
import "../screens/login/style.css";

class LoginFormComponent extends React.Component{

    constructor(props){
         super(props);
         this.state={
             username: "",
             password: "",
             buttonDisabled: false
         }
    }
    setInputValue(property,val){
        val=val.trim();
        this.setState({
            [property]:val
        })
    }
    resetForm(){
        this.setState({
            username: '',
            password: '',
            buttonDisabled: false
        })
    }

    async doLogin(){

        if(!this.state.username || !this.state.password){
            return;
        }
        this.setState({
            buttonDisabled: true
        })

        try{
            let res = await fetch('/login',{
                method: 'post',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            });

            let result = await res.json();
            if(result&& result.success){
                UserStore.isLoggedIn=true;
                UserStore.username=result.username;
            }else if(result && result.success == false){
                this.resetForm();
                alert(result.msg);
            }
        }catch(e){
            console.log(e);
            this.resetForm();
        }

    }

    render(){
        return(
                <div className="base-container" ref={this.props.containerRef}>
                    <div className="header">
                        Login
                    </div>
                    <div className="content">
                        <div className="image">
                            <img src={loginImg} />
                        </div>
                        <div className="form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <InputFieldComponent
                                type='text'
                                placeholder='Username'
                                value={this.state.username ? this.state.username : '' }
                                onChange={ (val) => this.setInputValue('username',val)}
                            />
                            {/* <input type="text" name="username" placeholder="username" /> */}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <InputFieldComponent
                                type='password'
                                placeholder='Password'
                                value={this.state.password ? this.state.password : '' }
                                onChange={ (val) => this.setInputValue('password',val)}
                            />
                            {/* <input type="password" name="password" placeholder="password" /> */}
                        </div>
                        </div>
                    </div>
                    <div className="footer">
                        <SubmitButtonComponent
                            text='Login'
                            disabled={this.state.buttonDisabled}
                            onClick={ () => this.doLogin() }
                        />
                        {/* <button type="button" className="btn" onClick={()=>{this.props.history.push(ADMIN_HOME)}}>
                        Login
                        </button> */}
                    </div>
                </div>
        );
    }

}

export default LoginFormComponent;