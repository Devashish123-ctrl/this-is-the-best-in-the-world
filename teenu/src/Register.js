import React from 'react'
import img from './images/google.png'
import  './App.css';
import {BrowserRouter as Router , Switch, Route, link, Link} from "react-router-dom";
export default function Register(props){
function RegisterStatusLoader(response,status){
if (status ==400){
    if (response["password2"]){
        props.change("Warning" ,(response["password2"][0])) 
    }
    else if(response["username"]){
        props.change("Warning" ,(response["username"][0]))
    }
    else if (response["email"]){
        props.change("Warning" ,(response["email"][0]))
    }
    else{
        props.change("Warning", "Something went wrong")
    }
}
else if (status ==406) {
    props.change("Warning" ,"You are already login ")
}
else if (status ==201){
    props.func("")
    console.log("hello world")
}
}
    return (
        <>
        <div id="login-credential" className="login-credential">
     <span id="heading-of-status"> Create Account</span>
              <div className="login-container">
        <form onSubmit={(e)=> props.handlesubmits(e,RegisterStatusLoader,"register")}>
            <input type="text" className="username-form" Name= "username" placeholder="Username" required />
            <input type="email" className="username-form" Name= "Email" placeholder= "Email" required />
            <input type="password"  className="username-form" Name ="password1" placeholder="Create-Password" required />
            <input type="password"  className="username-form" Name ="password2" placeholder="Confirm-Password" required />
            <button type="submit" id="login-submit-button" > Submit</button>
        </form>
    </div>
        <hr/>
    <div className="register-button">
        <a className="register-buttons" id="change" onClick={()=>props.func("login")}>Already have account?</a>
    </div>
</div>
<span id="Warning"></span>
<div id ="loader"></div>
      </>
    )
}
