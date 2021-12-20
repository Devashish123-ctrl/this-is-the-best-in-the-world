import React from 'react'
import './Room.css';
import { useEffect } from 'react';
import { useState } from 'react';
import Chat from './Chat';
import Music from  "./Music";
import dot from  "./images/dot.png";
import cross from "./images/cross.png"
import bluetick from "./images/bluetick.png" 
function Room(props){
const [response, Setresponse] =useState([""]);
const[owner_name ,Setowner_name] = useState([""])
const[Musics,SetMusics]  = useState([false])
const[Username, SetUsername] = useState([false])
const[SongName, SetSongName] = useState([""])
const[MusicSocket, SetMusicSocket] = useState("")
 useEffect(() => {       
    const status =  RoomInformation()
    if(status==404){
        props.func("login")
     }
     else{
         console.log("hello world")
     }   
    }, [props])

const RoomInformation=()=>{
    const xhr  = new XMLHttpRequest()
    const url = "http://127.0.0.1:8000/api/room-detail/";
    const method = "GET"
    xhr.open(method,url)
    xhr.onload=()=>{
     const response = JSON.parse(xhr.response)
     Setresponse(response)
     Setowner_name(response.owner)
     const socket = new WebSocket('ws://127.0.0.1:8000'
    + '/ws/chat/'
    + response?.name
    + '/')
    SetMusicSocket(socket)
     return xhr.status 
    }
    xhr.send()
}
const Songsetter=(event)=>{
event.preventDefault();
const formdata = new FormData(event.target);
const ufc = (formdata.get('room-changer').replace(/ /g, ""))
    MusicSocket.send(JSON.stringify({
        'message': ufc
    }));
}
if (MusicSocket) {
MusicSocket.onmessage = function(e) {
   SetSongName("")
    const data = JSON.parse(e.data);
   SetSongName(data.message)
   console.log(data)
   
    ;}}

async function UsernameChanger(event){
    event.preventDefault();
    document.getElementById("Warning").setAttribute("class","loader")
    const formdata = new FormData(event.target)
    const xhr  = new XMLHttpRequest()
    const url = `${window.location.origin}/api/username-changer/`;
    const method = "POST"
    xhr.open(method,url)
    xhr.onload=()=>{
        document.getElementById("Warning").removeAttribute("class","loader")
        xhr.status ==200? console.log("username-change-successfully"):
        document.getElementById("Warning").innerText ="Username too long"
    }
xhr.send(formdata)
}


    return (
    <div className="room-outer-div">
        <div className="room-navbar">
           <h3>{response?.name}</h3>
            <img id="bluetick" src={bluetick} />
            <div className="dropdown">
               <img id ="hamburger" src={dot} />
               <div className="dropdown-content">
                 <p onClick={()=>SetUsername(true)}>Change your name</p>
                 <hr/>
                 {owner_name===response?.your_username  && <p onClick={()=>SetMusics(true)}>start music</p> }
                </div>
            </div>
           
        </div>
        {(Musics==true)?
        <div id="asking-id">  
         <img src={cross} onClick={()=>SetMusics(false)}/>
         <form onSubmit={(e)=>Songsetter(e)}>
             <input type="text" value={this} name="room-changer" placeholder="Type Music Name" />
             <button type="submit" >submit</button>
         </form> 
     </div>:<div>
         </div>
        }
{(Username==true)?
 <div id="Music-id">  
 <img src={cross} onClick={()=>SetUsername(false)} />
 <form onSubmit={(e)=> UsernameChanger(e)}>
     <input type="text" name="new-username" placeholder="New username" />
     <button type="submit" >submit</button>
 </form> 
 <span id="Warning"></span>
</div>:<div>
 </div>}
        <Chat />
        <Music  Song={SongName}/>
    </div>
    )
}

export default Room
