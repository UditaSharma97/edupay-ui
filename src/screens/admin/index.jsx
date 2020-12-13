import React from "react";
import "../../App.css";
import loginImg from "../../logoImg.png";
import { INDEX_PATH } from "../../constants/pageNames";
export class AdminPage extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
        <div>
                <div className="admin-top-container" style={{ display: "flex",flexDirection: "rows" }}>
                    <div className="logo" style={{width: "10%",height: "10%",objectFit: "contain"}}>
                        <img src={loginImg}  
                        style={{width: "100%",height: "100%",objectFit: "contain",paddingLeft: "15%",paddingRight:"15%" }}
                        />
                    </div>
                    <div className="admin-top-middle-container"
                        style={{ width:"80%",textAlign:"center",paddingTop:"20px" }}
                        >
                        Powered By EduPay
                    </div>
                    
                    <div className="admin-top-right-container"
                    style={{paddingTop:"7px",paddingLeft: "2px",paddingRight:"2px" }}
                        
                    >
                        <button className="btn"  onClick={()=>{this.props.history.push(INDEX_PATH)}}>
                            Logout
                        </button>
                    </div>
                </div>
          </div> 
        )
    }

}
export default AdminPage;