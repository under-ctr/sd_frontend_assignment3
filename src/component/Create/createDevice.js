import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function CreateDevice() {
    let navigate = useNavigate();
    
    const [id, setID] = useState(null);
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [maxHourConsumption, setMaxHourConsumption] = useState("");
    const [assigned, setAssigned] = useState(null);
    const [clientId, setClientId] = useState(null);
  
    const sendDataToAPI = () => {
        axios.post(`http://localhost:8080/device/${id}`, {
             address, description, maxHourConsumption, assigned
        }).then(() => {
            navigate('/readDevice')
        })
    }
    return (
        <div>
            
        <Form>
        <Form.Field>
        
        <input name="description" 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder='Description' />
      </Form.Field>
      <Form.Field>
        
        <input 
        name="addres" 
        placeholder='Adress' 
        onChange={(e) => setAddress(e.target.value)} 
        />
      </Form.Field>
      <Form.Field>
        
        <input name="maxHourConsumption" 
        onChange={(e) => setMaxHourConsumption(e.target.value)} 
        placeholder='maxHourConsumption' />
      </Form.Field>
      <Form.Field>
        
        <input name="assigned" 
        onChange={(e) => setAssigned(e.target.value)} 
        placeholder='assigned' />
      </Form.Field>
            <Button type='submit' onClick={sendDataToAPI}>Submit</Button>
        </Form>
    </div>
    )
  }