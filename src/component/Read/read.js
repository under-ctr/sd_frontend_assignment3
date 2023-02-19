import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

export default function Read() {
    let navigate = useNavigate();
    const [apiData, setApiData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/client/all')
            .then((getData) => {
                setApiData(getData.data);
            })
    }, [])

 
    const setData = (id, name, address, password, role) => {
        localStorage.setItem('IdUpdate', id)
       // localStorage.setItem('name', name)
      //  localStorage.setItem('addres', address)
      //  localStorage.setItem('password', password)
      //  localStorage.setItem('role', role)
        console.log(id);
    }

    const getData = () => {
        axios.get('http://localhost:8080/client/all')
            .then((getData) => {
                setApiData(getData.data);
            })
    }

    const onDelete = (id) => {
        axios.delete(`http://localhost:8080/client/${id}/`)
        .then(() => {
            getData();
        })
    }
    const navDevice = () => {
  
        navigate('/readDevice')
   
    }

    const navCreateClients = () => {
  
        navigate('/create')
   
    }

    return (
        <div>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                        <Table.HeaderCell>Password</Table.HeaderCell>
                        <Table.HeaderCell>Role</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {apiData.map((data) => {
                        return (
                            <Table.Row>
                                <Table.Cell>{data.id}</Table.Cell>
                                <Table.Cell>{data.name}</Table.Cell>
                                <Table.Cell>{data.address}</Table.Cell>
                                <Table.Cell>{data.password}</Table.Cell>
                                <Table.Cell>{data.role}</Table.Cell>
                                <Table.Cell>
                                    <Link to='/update'>
                                        <Button
                                            color="green"
                                            onClick={() => setData(data.id, data.name, data.address, data.password, data.role)}>
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
            <button type="button" onClick={navDevice}>ManageDevices</button>
            <button type="button" onClick={navCreateClients}>AddClient</button>
        </div>
    )
}