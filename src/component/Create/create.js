import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function Create() {
    let navigate = useNavigate();
    
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
  
    const sendDataToAPI = () => {
      axios.post('http://localhost:8080/client/add', {
        name, address, password, role
      }).then(() => {
        navigate('/read')
      })
    }
    return (
      <div>
        <Form>
          <Form.Field>
           
            <input name="name" 
            onChange={(e) => setName(e.target.value)} 
            placeholder='Name' />
          </Form.Field>
          <Form.Field>
            
            <input 
            name="addres" 
            placeholder='Adress' 
            onChange={(e) => setAddress(e.target.value)} 
            />
          </Form.Field>
          <Form.Field>
            
            <input name="password" 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder='Password' />
          </Form.Field>
          <Form.Field>
            
            <input name="role" 
            onChange={(e) => setRole(e.target.value)} 
            placeholder='Role' />
          </Form.Field>
          <Button type='submit' onClick={sendDataToAPI}>Submit</Button>
        </Form>
      </div>
    )
  }