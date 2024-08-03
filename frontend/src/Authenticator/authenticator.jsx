import axios from 'axios';
import { createContext, useContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';

import httpStatus from "http-status";
export const AuthContext = createContext({});
const client = axios.create({
    baseURL: "http://localhost:8000/api/v1/users",
})
export const AuthProvider = ({ children }) => {
    const authContext = useContext(AuthContext);
    const [userData, setUserData] = useState(authContext);

    const router = useNavigate();
    const handleRegister = async (name, password, username) => {
        try {
            const request = await client.post("/register", {
                name,
                password,
                username
            })
            if (request.status === httpStatus.CREATED) {
                return request.data.message;
            }
        } catch (error) {
            throw error;
        }
    }
    const handleLogin = async (username, password) => {
            try{
                const response = await client.post("/login", {
                    username,
                    password
                })
                if(response.status === httpStatus.OK){
                    localStorage.setItem("token", response.data.token);
                    return response.data.message;
                }
            }
            catch(error){
                throw error;
            }
    }

    const data = {
        userData, setUserData, handleRegister,handleLogin
    }
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )

}