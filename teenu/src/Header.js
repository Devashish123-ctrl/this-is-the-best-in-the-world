import React from 'react'
import './App.css';
import {BrowserRouter as Router , Switch, Route, link} from "react-router-dom";
import Login from './Login'
import Register from  "./Register"
import { useState } from 'react';
import img2 from "./images/cd.png"
import { Helmet } from 'react-helmet'
import "./App.css";
import "antd/dist/antd.css";
export default function Header(props) {

const handlesubmit = props.handlesubmit
const change = props.change
const componentDidMount = props.componentDidMount
const redirecting_Function = props.redirecting_Function

    return (
        <div id="login-page-bigger-div">
             <Helmet>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
</Helmet>
           <div id="logo-login"> 
          <img id ="logo-photo" src={img2} alt=""/>
        </div>
        
        <Router>
       <Switch>
        <Route path="/login"  render={()=> <Login change={change} func={redirecting_Function} handlesubmits={handlesubmit}/>} /> 
        <Route path="/register"  render={()=> <Register change ={change} func={redirecting_Function} handlesubmits={handlesubmit}/>}/> 
        </Switch> 
        </Router>
       
        </div>
       
    )
}
