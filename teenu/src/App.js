import React from 'react';
import './App.css';
import {BrowserRouter as Router , Switch, Route, link} from "react-router-dom";
import Header from './Header';
import Login from './Login';
import Join from './Join';
import Room from './Room'
function App(){
  
function redirecting_Function(data){
  window.location = `http://localhost:3000/${data}`
}

function componentDidMount(data_send,link,funcs) {
  const spinner  = document.getElementById("loader");
  spinner.style.visibility ="visible";

  const xhr = new XMLHttpRequest()
  const method= "POST"
  const url = `http://localhost:8000/api/${link}/`
  xhr.open(method,url)
  xhr.onload=()=>{
    document.getElementById("loader").style.visibility ="hidden";
   const response  = JSON.parse(xhr.response)
   console.log(response)
    funcs(response,xhr.status)
  }
    xhr.send(data_send)
}

function handlesubmit(event ,func ,url){
  event.preventDefault();
  const myform = event.target;
  const data_send = new FormData(myform);
  componentDidMount(data_send ,url,func)
}


function change(id , what_to_Change){
const wwe = document.getElementById(id)
wwe.innerText = what_to_Change
}
  return (
    <>
   
    <Router>
       <Switch>
         <Route exact path="/" render={()=><Join change={change} func={redirecting_Function} handlesubmits={handlesubmit} />}/>
        <Route path="/login"  render={()=> <Header change={change} redirecting_Function={redirecting_Function} componentDidMount={componentDidMount} func={redirecting_Function} handlesubmit={handlesubmit} />} /> 
        <Route path="/register"  render={()=> <Header change={change} redirecting_Function={redirecting_Function} componentDidMount={componentDidMount} func={redirecting_Function} handlesubmit={handlesubmit} />} /> 
        <Route path="/join-room" render={()=><Room  func={redirecting_Function} />} />
      
        </Switch> 
    </Router>
    </>
  );
}

export default App;
