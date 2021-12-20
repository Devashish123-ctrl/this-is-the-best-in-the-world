import React from 'react'
import './App.css';
import img from './images/google.png'
import axios from 'axios';
export default function Login(props){
    function login_statusloader(response, status){
       if (status==400) {
           props.change("Warning" ,"Username , Password does not match")   
       }
       else if(status ==406){
           props.change("Warning", "You are already login ")      
        }
        else if (status ==202){
            props.func("")
        }
        else {
            props.change("Warning", "Something went wrong")      
        } 
    }
    
    
    return(
<div id="login-credential" className="login-credential">
     <span id="heading-of-status"> Sign In With</span>
    <div className="login-container">
        <form onSubmit={(e)=> props.handlesubmits(e,login_statusloader,"login")}>
            <input type="text" name ="username" className="username-form" placeholder= "Username:" required />
            <input type="password" name="password" className="username-form" placeholder="Password:" required />
            <button type="submit"  id="login-submit-button" > Submit</button>
        </form>
    </div>
        <hr/>

     
    <div className="register-button">
        <a className="register-buttons" onClick={()=>props.func("register")}>New User?</a><a className="register-buttons">/Forgot password</a>
    </div>
    <span id="Warning"></span>
    <div id ="loader"></div>
</div>


    )
}
