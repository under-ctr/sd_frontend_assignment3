import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router';
export default function UpdateDevice() {
    let navigate = useNavigate();
    const [id, setID] = useState(null);
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [maxHourConsumption, setMaxHourConsumption] = useState("");
    const [assigned, setAssigned] = useState(null);
    const [clientId, setClientId] = useState(null);
  
    const sendDataToAPI = () => {
        axios.post(`http://localhost:8080/device/add`, {
            id, address, description, maxHourConsumption, assigned
        }).then(() => {
            navigate('/readDevice')
        })
    }

    useEffect(() => {
    
        setID(localStorage.getItem('idDevice'));
        //setAddress(localStorage.getItem('addresDevice'));
       // setDescription(localStorage.getItem('description'));
       // setMaxHourConsumption(localStorage.getItem('maxHourConsumption'));
       // setAssigned(localStorage.getItem('assigned'));
       // setClientId(localStorage.getItem('clientId'))
      
    }, [])



       const setData = () => {
        localStorage.setItem('addresDevice', address)
        localStorage.setItem('description', description)
        localStorage.setItem('maxHourConsumption', maxHourConsumption)
        localStorage.setItem('assigned', assigned)
        localStorage.setItem('clientId', clientId)
       
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
            placeholder='MaxHourConsumption' />
          </Form.Field>
          <Form.Field>
           
            <input name="Assigned" 
            onChange={(e) => setAssigned(e.target.value)} 
            placeholder='assigned' />
          </Form.Field>
                <Button type='submit' onClick={sendDataToAPI}>Update</Button>
            </Form>
        </div>
    )
}
