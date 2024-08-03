import { useState } from "react";
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import { AuthContext } from "../../Authenticator/authenticator";
import { useContext } from "react";
import TextField from "@mui/material/TextField";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import "./auth.css";
import { Snackbar } from "@mui/material";
export default function Auth() {
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [formState, setFormState] = useState(0);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const { handleRegister, handleLogin } = useContext(AuthContext);
    const handleAuth = async () => {
        try {
            if (formState) {
                console.log(username, password);
                const result = await handleLogin(username, password);
                console.log("Logged in");
                setMessage("Logged in");
                setOpen(true);
            }
            else {
                const result = await handleRegister(name,  password,username);
                
                console.log(result);
                setMessage(result);
                setOpen(true);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    return (
        <div style={{
            position: "absolute",
            left: "0",
            right: "0",
            top: "0",
            backgroundImage: "url('computer.jpg')",
            backgroundSize: "cover",
            height: "100vh",
            width: "100%"
        }}>
            <div className="auth-body">
                <div className="register">
                    {formState ?
                        <form className="register-form" onSubmit={handleAuth}>
                            <h2 style={{ color: "rgb(92, 16, 125)" }}>Login</h2>
                            <TextField 
                             className="auth-field"
                            id="input-with-sx" 
                            label="Username"
                            value={username} 
                            onChange={(e)=>{setUsername(e.target.value)}}
                            variant="standard"
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <AccountCircle />
                                  </InputAdornment>
                                ),
                              }}
                             />
                            <TextField 
                            id="input-with-sx" 
                            className="auth-field"
                            label="password"
                            value={password} 
                            type="password"
                            onChange={(e)=>{setPassword(e.target.value)}}
                            variant="standard"
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LockOpenIcon/>
                                  </InputAdornment>
                                ),
                              }}
                               />
                             <Button sx={{ backgroundColor: "rgb(92, 16, 125)", color: "white", borderRadius: "8px" }} onClick={handleAuth}>Submit</Button>
                        </form>
                        :
                        <form className="register-form" onSubmit={handleAuth}>
                            <h2 style={{ color: "rgb(92, 16, 125)" }}>Sign Up</h2>
                            <TextField 
                            id="input-with-sx" 
                            className="auth-field"
                            label="Full Name"
                            value={name} 
                            onChange={(e)=>{setName(e.target.value)}}
                            variant="standard"
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <AccountCircle/>
                                  </InputAdornment>
                                ),
                              }}
                               />
                            <TextField 
                             className="auth-field"
                            id="input-with-sx" 
                            label="Username"
                            value={username} 
                            onChange={(e)=>{setUsername(e.target.value)}}
                            variant="standard"
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <AccountCircle />
                                  </InputAdornment>
                                ),
                              }}
                             />
                            <TextField 
                            id="input-with-sx" 
                            className="auth-field"
                            label="password"
                            type="password"
                            value={password} 
                            onChange={(e)=>{setPassword(e.target.value)}}
                            variant="standard"
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LockOpenIcon/>
                                  </InputAdornment>
                                ),
                              }}
                               />
                            
                            <Button sx={{ backgroundColor: "rgb(92, 16, 125)", color: "white", borderRadius: "8px" }} onClick={handleAuth}>Submit</Button>
                        </form>}
                    {formState ?
                        <div>Don't have an account ?
                            <a onClick={() => setFormState(0)} style={{ cursor: "pointer", color: "rgb(0,0,255)", textDecoration: "underline" }}>Sign up</a>
                        </div>
                        :
                        <div>
                            Already have an account ?
                            <a onClick={() => setFormState(1)} style={{ cursor: "pointer", color: "rgb(0,0,255)", textDecoration: "underline" }}>Login</a>
                        </div>}
                </div>

            <Snackbar
                open={open}
                autoHideDuration={4000}
                message={message}
                sx={{backgroungColor:"rgb(92, 16, 125)!important"}} />
            </div>
        </div>
    )
}