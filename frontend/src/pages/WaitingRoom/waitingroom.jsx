import React, { useContext, useState } from 'react'
import withAuth from '../../utils/withAuth.jsx'
import { useNavigate } from 'react-router-dom'
import "../WaitingRoom/waitingroom.css";
import { Button, IconButton, TextField } from '@mui/material';
function WaitingRoom() {


    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");

    let handleJoinVideoCall = async () => {
        navigate(`/${meetingCode}`)
    }

    return (
        <>

            <div className="navBar">

                <div style={{ display: "flex", alignItems: "center" }}>

                    <div className='main-header'> <img src="logo.svg" style={{width:"50px",height:"50px"}}></img> Connectly</div>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                   
                    <Button onClick={() => {
                        localStorage.removeItem("token")
                        navigate("/auth")
                    }}>
                        Logout
                    </Button>
                </div>


            </div>


            <div className="meetContainer">
                <div className="leftPanel">
                    <div>
                        <h2 style={{color:"rgb(92, 16, 125)"}} >Enjoy high-quality video calls effortlessly on our site.</h2>

                        <div style={{ display: 'flex', gap: "10px" }}>

                            <TextField onChange={e => setMeetingCode(e.target.value)} id="outlined-basic" label="Enter Meeting Code" variant="outlined" />
                            <Button onClick={handleJoinVideoCall} variant='contained' style={{backgroundColor:"rgb(92, 16, 125)"}}>Join</Button>

                        </div>
                    </div>
                </div>
                <div className='rightPanel'>
                    <img srcSet='logo3.png' alt="" />
                </div>
            </div>
        </>
    )
}


export default withAuth(WaitingRoom)