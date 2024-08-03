import React from "react";
import {useRef,useState} from "react";
import  TextField  from "@mui/material/TextField";
import "./meet.css"
const server_url="http://localhost:8000";
var connections={};
const peerConnections={
    "iceServers":[
        {
            "urls":"stun:stun.l.google.com:19302"
        }
    ]

};
export default  function Meet(){
    var socketRef= useRef();
    let localVideoRef=useRef();
    const [videoAvailable,setVideoAvailable]=useState(true);
    const [audioAvailable,setAudioAvailable]=useState(true);
    const [video,setVideo]=useState();
    const [audio,setAudio]=useState();
    const [screenShare,setScreenShare]=useState();
    const [showModal,setShowModal]=useState();
    const [screenAvailable,setScreenAvailable]=useState();
    const [messages,setMessages]=useState([]);
    const [message,setMessage]=useState("");
    const [newMessages,setNewMessages]=useState(0);
    const [askForUsername,setAskForUsername]=useState(true);
    const [username,setUsername]=useState("");
    const [videos,setVideos]=useState([]);
    const videoRef=useRef([]);

    return (
        <div>
            {askForUsername?(
                <div>
                    
                    <h1>Join Meeting</h1>
                    <TextField onChange={(e)=>setUsername(e.target.value    )}/>
                    
                    </div>
            ):(<></>)}
        </div>
    )
}