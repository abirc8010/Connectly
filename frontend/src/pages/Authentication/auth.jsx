import { useState } from "react";
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from "@mui/material/Button";
import "./auth.css";
export default function Auth() {
    const [formState, setFormState] = useState(0);
    return (
        <div style={{
            position:"absolute",
            left:"0",
            right:"0",
            top:"0",
            backgroundImage: "url('computer.jpg')",
            backgroundSize: "cover",
            height: "100vh",
            width: "100%" 
        }}>
            <div className="auth-body">
                <div className="register">
                    {formState ?
                        <form className="register-form">
                            <h2>Login</h2>
                            <input className="auth-field" placeholder="  username" />
                            <input className="auth-field" placeholder="  password" />
                            <Button sx={{ backgroundColor: "rgb(92, 16, 125)", color: "white", borderRadius: "8px" }}>Submit</Button>
                        </form>
                        :
                        <form className="register-form">
                            <h2>Sign Up</h2>
                            <input className="auth-field" placeholder="  username" />
                            <input className="auth-field" placeholder="  password" />
                            <input className="auth-field" placeholder="  email" />
                            <Button sx={{ backgroundColor: "rgb(92, 16, 125)", color: "white", borderRadius: "8px" }}>Submit</Button>
                        </form>}
                    {!formState ?
                        <div>Don't have an account ?
                            <a onClick={() => setFormState(1)} style={{ cursor: "pointer", color: "rgb(0,0,255)", textDecoration: "underline" }}>Sign up</a>
                        </div>
                        :
                        <div>
                            Already have an account ?
                            <a onClick={() => setFormState(0)} style={{ cursor: "pointer", color: "rgb(0,0,255)", textDecoration: "underline" }}>Login</a>
                        </div>}
                </div>
            </div>
        </div>
    )
}