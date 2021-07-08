import React, { Component } from 'react';
import './ForgotPassword.scss';
import { withRouter } from "react-router-dom";
class VerifyCode extends Component {
    constructor(props) {
        super(props);
        this.onVerify=this.onVerify.bind(this); 
    }
    onVerify(event){
        event.preventDefault(); 
        let code = event.target['verify_code'].value;
        let email = localStorage.getItem('email');
        let post = {
            email:email,
            code:code
        }  
        let postInJson = JSON.stringify(post);
        fetch("http://whispering-hollows-85804.herokuapp.com/api/checkcode", {
            method: "post",
            body: postInJson
        }).then((response) => {
            return response.json(); 
        })
        .then((response)=>{
            if(response.token != null){
                localStorage.setItem('forgot_token', response.token);
                this.props.history.push("/reset-password");    
            }
            else{
                alert("Verify code is incorrect!");
            }
        }); 
    }
    render() {
        return (
            <div className="container">
                <h4>Please enter verify code to confirm your account before resetting your password.</h4>
                <br/>
                <form onSubmit={this.onVerify}>
                    <div className="form-group">
                        <input type="text" className="form-control" id="verify_code" name="verify_code" placeholder="Enter verify code" required/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}
export default withRouter(VerifyCode);