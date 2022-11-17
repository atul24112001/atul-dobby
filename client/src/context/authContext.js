import React, { useEffect, useState } from "react";
import axios from 'axios';
import { message } from 'antd'


export const AuthContext = React.createContext({
    isAuthenticated: false,
    logIn: async (emailId, password) => { },
    singUp: async (name, emailId, password) => { },
    userDetails: {} || null,
    loading: false,
    logout: () => { }
})

const AuthContextProvider = ({ children }) => {
    const URL = process.env.REACT_APP_API_URL;
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const cached = window.localStorage.getItem("cookies-atul-dobby");
        if (cached) {
            setUserDetails(JSON.parse(cached))
            setIsAuthenticated(true);
        }
    }, [])

    const logout = () => {
        setIsAuthenticated(false);
        setUserDetails(null)
        window.localStorage.removeItem("cookies-atul-dobby");
    }

    const logIn = async (emailId, password) => {
        if (!emailId || !password || !emailId.trim() || !password.trim()) {
            message.warning("Please Enter all details")
            return;
        }
        setLoading(true)
        try {
            const { data } = await axios.post(`${URL}/api/auth/login`, {
                emailId,
                password
            })
            window.localStorage.setItem("cookies-atul-dobby", JSON.stringify(data.data))
            message.success(data.message)
            setIsAuthenticated(true)
            setUserDetails(data.data)
        } catch (error) {
            console.log(error.message)
            message.error(error.response.data.message)
        }
        setLoading(false)
    }

    const singUp = async (name, emailId, password) => {
        if (!name || !emailId || !password || !emailId.trim() || !password.trim() || !name.trim()) {
            message.warning("Please Enter all details")
            return;
        }
        setLoading(true)
        try {
            const { data } = await axios.post(`${URL}/api/auth/singup`, {
                name,
                emailId,
                password
            })
            window.localStorage.setItem("cookies-atul-dobby", JSON.stringify(data.data))
            setUserDetails(data.data)
            message.success(data.message)
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error.message)
            message.error(error.response.data.message)
        }
        setLoading(false)
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            logIn,
            singUp,
            userDetails,
            loading,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;