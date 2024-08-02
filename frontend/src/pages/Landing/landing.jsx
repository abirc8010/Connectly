import React from "react";
import "./landing.css";
import Button from '@mui/material/Button';
export default function Landing() {
    return (
        <div className="landing-page">
            <div className="navbar">
                <div className="main-header">  <img src="logo.svg" style={{width:"50px",height:"50px"}}></img> Connectly </div>
                <div className="actions">
                    <div>
                        <Button variant="contained" size="medium" sx={{ backgroundColor: "rgb(92, 16, 125)" }}> Join as Guest</Button>
                    </div>
                    <div>
                        <Button variant="contained" size="medium" sx={{ backgroundColor: "rgb(92, 16, 125)" }}> <a href="/auth" style={{textDecoration:"none",color:"#ffffff"}}>Register</a></Button>
                    </div>                    
                </div>
            </div>
            <img src="computer.jpg" className="main-background"></img>
             
            <div className="main-body">
            <div>
            Transform your virtual meetings with our intuitive, feature-rich video conferencing website.
            </div>
               <Button sx={{width:"130px",backgroundColor:"rgb(92, 16, 125)",color:"white"}}>Get Started</Button>
               </div>
               
        </div>
    );
}       