import React, { Component }  from 'react';
import {withRouter } from "react-router-dom";
import axios from 'axios';
import './ResetPassword.scss';
class ResetPassword extends Component{
    constructor(props) {
        super(props);
        this.onReturn = this.onReturn.bind(this);
        this.onChangePass = this.onChangePass.bind(this);
    }
    onReturn() {
        this.props.history.push("/");
    }
    onChangePass(event){
        event.preventDefault();
        let password = event.target['password'].value;
        let confirm_password = event.target['confirm_password'].value;
        let token = localStorage.getItem("forgot_token");
        if(confirm_password!=password){
            alert("The Password confirmation does not match")
        }
        else{
            axios({
                method: 'post',
                url :'https://whispering-hollows-85804.herokuapp.com/api/set-password',
                    data : {
                        token : token,
                        password : password,
                    }
            }) .then((response)=>{
                if(response.status === 200){
                    alert("Change password successfully!")
                    this.props.history.push("/");    
                }
                else{
                    alert("Something is wrong! Try again...");
                    window.location.reload();
                }
            }); 
        }
    }
    render() {
        return (
            <div className="container">
                <h2>RESET YOUR PASSWORD</h2>
                <hr/>
                <form id="register-form" role="form" autocomplete="off" className="form" onSubmit={this.onChangePass} method="post">
                    <div className="form-group">
                        <input type="password" name="password" placeholder="New password" className="fadeIn third" required />
                    </div>
                    <div className="form-group">
                        <input type="password" name="confirm_password" placeholder="Confirm password" className="fadeIn third" required />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Change</button>
                    </div>
                </form>
            </div>
        );
    }
};
export default withRouter(ResetPassword);