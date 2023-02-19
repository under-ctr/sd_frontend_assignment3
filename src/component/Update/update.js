import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router';
export default function Update() {
    let navigate = useNavigate();
   
    const [id, setID] = useState(null);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
  
    const sendDataToAPI = () => {
        axios.post(`http://localhost:8080/client/${id}`, {
            id,name, address, password, role
        }).then(() => {
            navigate('/read')
        })
    }

    useEffect(() => {
    
        setID(localStorage.getItem('IdUpdate'));
        //setAddress(localStorage.getItem('addres'));
       // setPassword(localStorage.getItem('password'));
       // setName(localStorage.getItem('name'));
      //  setRole(localStorage.getItem('role'))
       // localStorage.setItem('name', name)
        //localStorage.setItem('addres', address)
       // localStorage.setItem('password', password)
       // localStorage.setItem('role', role)
    }, [])



       const setData = () => {
        localStorage.setItem('name', name)
        localStorage.setItem('addres', address)
        localStorage.setItem('password', password)
        localStorage.setItem('role', role)
       
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
           
            <input name="addres" 
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
                <Button type='submit' onClick={sendDataToAPI}>Update</Button>
            </Form>
        </div>
    )
}
