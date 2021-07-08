import React, { Component } from 'react';
import './Login.scss';
import { withRouter } from "react-router-dom";
class Login extends Component {
    constructor(props){
        super(props);
        this.onLogin=this.onLogin.bind(this);
    }
    onLogin(event){
        event.preventDefault();
        let email = (event.target['email'].value).toLowerCase();
        let password = event.target['password'].value;
        let post = {
            email:email,
            password:password,
        }
        let postInJson = JSON.stringify(post);
        fetch("https://whispering-hollows-85804.herokuapp.com/api/admin/login", {
            method: "post",
            headers: {
                "Content-Type":"application/json"
            },
            body: postInJson
        })
        .then((response) => {
            return response.json(); 
        }).then((response)=>{
            if(response.id==null){
                alert("Username or Password is incorrect!")
                this.props.history.push("/");
                window.location.reload();
            }
            else{
                localStorage.setItem("id",response.id);
                localStorage.setItem("token",response.access_token);
                this.props.history.push("/admin/dashboard");
            }
        }); 
    }
    render() {
        return (
            <div className="formLogin">
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <div className="fadeIn first">
                            <img src="./images/logo.png" id="icon" alt="" />
                        </div>
                        <form onSubmit={this.onLogin} method="post">
                            <input type="email" name="email" placeholder="Enter email" className="fadeIn second" required />
                            <input type="password" name="password" placeholder="Enter password" className="fadeIn third" required />
                            <br/>
                            <button className="btn-login">Log In</button>
                        </form>
                        <div id="formFooter">
                            <a className="underlineHover" href="/forgot-password">Forgot Password?</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }           
}
export default withRouter(Login);