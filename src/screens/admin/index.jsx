import React from "react";
import "../../App.css";
import loginImg from "../../login.svg";
import { INDEX_PATH } from "../../constants/pageNames";

export class AdminPage extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(

            <div className="admin-top-left-container">
                <div className="logo">
                    <img src={loginImg}/>
                </div>
                <div className="admin-top-middle-container">
                    Powered By EduPay
                </div>
                <div className="admin-top-right-container">
                    <button className="btn"  onClick={()=>{this.props.history.push(INDEX_PATH)}}>
                        Logout
                    </button>
                </div>

            </div>

        )
    }

}
export default AdminPage;