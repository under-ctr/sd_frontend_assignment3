import React, { useState } from 'react';
import axios from 'axios';
import { Popup } from 'semantic-ui-react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setUser }) => {
    let navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/client/login/${username}/${password}/`);
            const user = response.data;
        
            //setUser(user);
            setPassword(password);
            setUsername(user.name);
            localStorage.setItem('id', user.id)
            localStorage.setItem('username', user.name)
            localStorage.setItem('Role', user.role)
            //localStorage.setItem('role', user.role), trebuie doar ca nu primes rolul, sa modific in backend 
            ///pune un redirect aici 
            if(user.role === 'Client'){
                navigate('/singlePage');
            }else{
            navigate('/read');
            }
            console.log(response);
        } catch (error) {
           
            console.error(error);
            toast.error('Error logging in!');
            
           
        }
    }

    const navSingUp = () => {
  
          navigate('/signUp')
     
      }

    return (
      
        <form onSubmit={handleSubmit}>
            {errorMessage && <Popup content={errorMessage} />}
            <label>
                Username:
                <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </label>
            <button type="submit">Login</button>
            <button type="button" onClick={navSingUp}>SingUp</button>
            
        </form>
        
      
    );

};

export default Login;