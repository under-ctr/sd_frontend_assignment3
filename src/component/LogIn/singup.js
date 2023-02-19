import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
    let navigate = useNavigate();
    
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Client");
  
    const sendDataToAPI = async () => {
        try {
          const response = await axios.post('http://localhost:8080/client/add', {
            name, address, password, role
          });
      
          localStorage.setItem('id', response.data.id);
          localStorage.setItem('username', response.data.name);
          localStorage.setItem('Role', role);
          navigate('/singlePage');
        } catch (error) {
         
          console.error(error);
          toast.error('Error singing in!');
        }
      }
    return (
      <div>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input name="name" 
            onChange={(e) => setName(e.target.value)} 
            placeholder='Name' />
          </Form.Field>
          <Form.Field>
            <label>Address</label>
            <input 
            name="addres" 
            placeholder='Adress' 
            onChange={(e) => setAddress(e.target.value)} 
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input name="password" 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder='password' />
          </Form.Field>
          
          <Button type='submit' onClick={sendDataToAPI}>Submit</Button>
        </Form>
      </div>
    )
  }