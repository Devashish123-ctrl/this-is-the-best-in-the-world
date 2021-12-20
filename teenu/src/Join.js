import React from 'react'
import './App.css';
import img from './images/logo2.jpeg';
import {Helmet} from "react-helmet";
function Join(props){
function join_statusloader(response,status){
  if (status==404){
   props.change("Warning","Room not found ")
  }
  else if (status==401){
    props.func("login")
  }
  else if (status== 200){
    props.func("join-room")
  }
}



    return (
    <div className="join-room-div">
      
     <div className="joining-room-box">
         <form onSubmit={(e)=> props.handlesubmits(e,join_statusloader,"room-checker")}>
      <input type="text" name="room-value" class="room-clas" placeholder="Enter room name" />
      <input type="password" name='password'  class="room-clas" placeholder="Room-password" />
      <div>
      <button id="join-room-button">Join </button><span id="room-create-button"> /Create Room</span>
      </div>
        </form>
      <span id="Warning"></span>
      <div id ="loader"></div>
      </div>
      <div id="img-logo">
          <img id="logo" src={img} alt="tinu"/>
      </div>
    </div>
    
    )
}

export default Join
