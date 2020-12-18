import React from 'react'

class SubmitButtonComponent extends React.Component{

    render(){
        return(
            <div className="submitButton">
                <button
                className='btn'
                disabled={this.props.disabled}
                onClick={()=>this.props.onClick()}
                >
                    {this.props.text}
                </button>
            </div>


        );
    }

}
export default SubmitButtonComponent;