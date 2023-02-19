import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

export default function ReadDevice() {
    let navigate = useNavigate();
    const [apiData, setApiData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/device/all')
            .then((getData) => {
                setApiData(getData.data);
            })
    }, [])

 
    const setData = (id, name, address, maxHourConsumption, assigned, clientId) => {
        localStorage.setItem('idDevice', id)
        //localStorage.setItem('description', name)
        //localStorage.setItem('addresDevice', address)
       // localStorage.setItem('maxHourConsumption', maxHourConsumption)
       // localStorage.setItem('assigned', assigned)
       // localStorage.setItem('clientId', clientId)
        console.log(id);
    }

    const getData = () => {
        axios.get('http://localhost:8080/device/all')
            .then((getData) => {
                setApiData(getData.data);
            })
    }

    const onDelete = (id) => {
        axios.delete(`http://localhost:8080/device/${id}/`)
        .then(() => {
            getData();
        })
    }
    const navClients = () => {
  
        navigate('/read')
   
    }
    const navCreateClients = () => {
  
        navigate('/createDevice')
   
    }

    return (
        <div>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                        <Table.HeaderCell>maxHourConsumption</Table.HeaderCell>
                        <Table.HeaderCell>assigned</Table.HeaderCell>
                        <Table.HeaderCell>clientId</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {apiData.map((data) => {
                        return (
                            <Table.Row>
                                <Table.Cell>{data.id}</Table.Cell>
                                <Table.Cell>{data.description}</Table.Cell>
                                <Table.Cell>{data.address}</Table.Cell>
                                <Table.Cell>{data.maxHourConsumption}</Table.Cell>
                                <Table.Cell>{data.assigned ? 'da' : 'nu' }</Table.Cell>
                                <Table.Cell>{data.clientId}</Table.Cell>
                                <Table.Cell>
                                    <Link to='/updateDevice'>
                                        <Button
                                            color="green"
                                            onClick={() => setData(data.id, data.description, data.address, data.maxHourConsumption, data.assigned, data.clientId)}>
                                            Update
                                        </Button>
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button color="red" onClick={() => onDelete(data.id)}>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}

                </Table.Body>
            </Table>
            <button type="button"  onClick={navClients}> ManageClients </button>
            <button type="button" onClick={navCreateClients}>AddDevice</button>
        </div>
    )
}