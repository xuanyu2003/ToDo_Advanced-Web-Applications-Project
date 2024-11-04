import { useState } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

const url = "http://localhost:3001";



export default function UserProvider({ children }) {

    const userFromSessionStorage = sessionStorage.getItem('user');
    const [user, setUser] = useState(userFromSessionStorage ? JSON.parse(userFromSessionStorage) : { email: "", token: "", password: "" });


    const signUp = async () => {
        const json = JSON.stringify(user);
        const headers = { headers: { 'Content-Type': 'application/json' } };
        try {
            await axios.post(`${url}/user/register`, json, headers);
            setUser({ email: "", password: "" });
        } catch(error) {
            throw error;
        }
    }
    const signIn = async () => {
        const json = JSON.stringify(user);
        const headers = { headers: { 'Content-Type': 'application/json' } };
        try {
            const response = await axios.post(`${url}/user/login`, json, headers);
            const { id, email, token } = response.data;
            const userData = { id, email, token };
            setUser(userData);
            sessionStorage.setItem('user', JSON.stringify(userData)); // Save in sessionStorage
        } catch(error) {
            setUser({ email: "", password: "" });
            throw error;
        }
    };
    

  return (

    <UserContext.Provider value={{ user, setUser, signUp, signIn }}>
        {children}
    </UserContext.Provider>

  )
}