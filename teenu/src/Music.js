import React from 'react'
import "./Music.css";
import music from "./images/music.png"
import img from  "./images/music.png";
import { useEffect } from 'react';
import { useState } from 'react';
import YouTube from 'react-youtube'
function Music(props){
const[SongId, SetSongId] = useState('')

useEffect(()=>{
SetSongId(props?.Song)
},[props]);

const makeClick=(event)=>{
    document.getElementById('wwe').click();
    console.log("my")
   
}

    return (
       <div>
                {SongId =="" ? <span></span>: <object style="height: 200px; width: 200x" ><param name="movie" value="http://www.youtube.com/v/v1gTI4BOPUw?version=3" /><param  value="true"/><param name="allowScriptAccess" value="always"/><embed src="http://www.youtube.com/v/v1gTI4BOPUw?version=3" type="application/x-shockwave-flash"  allowScriptAccess="always" width="200" height="200" /></object> }
        </div>
    )
}

export default Music
