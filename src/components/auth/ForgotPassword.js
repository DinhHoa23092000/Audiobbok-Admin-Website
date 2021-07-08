import React, { Component } from 'react';
import './ForgotPassword.scss';
import { withRouter } from "react-router-dom";
class ForgotPass extends Component {
    constructor(props) {
        super(props);
        this.onSendCode=this.onSendCode.bind(this); 
    }
    onSendCode(event){
        event.preventDefault(); 
        let email = event.target['email'].value;
        let post = {
            email:email
        }  
        let postInJson = JSON.stringify(post);
        fetch("http://whispering-hollows-85804.herokuapp.com/api/check_mail", {
            method: "post",
            headers: {
                "Content-Type":"application/json"
            },
            body: postInJson
        })
        .then((response)=>{
            if(response.status === 200){
                localStorage.setItem("email",email);
                this.props.history.push("/verify-code");
            }
            else{
                alert("Something wrong... Try again!");
                this.props.history.push("/forgot-password");
            }
        }); 
    }
    render() {
        return (
            <div className="container">
                <h4>Please enter your email address. You will receive a verify code.</h4>
                <br/>
                <form onSubmit={this.onSendCode} method="post">
                    <div className="form-group">
                        <input id="email" name="email" placeholder="Email address" className="form-control"  type="email" required/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" >Get Verify Code</button>
                    </div>
                </form>
            </div>
        );
    }
 }
 export default withRouter(ForgotPass);