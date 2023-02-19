import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import axios from 'axios';

export default function SinglePage() {
    const [apiData, setApiData] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8080/device/client/${localStorage.getItem('id')}/`)
            .then((getData) => {
                setApiData(getData.data);
            })
    }, [])


  

    return (
        <div>
            <Table celled style={{ border: '1px solid #ccc' }}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell style={{ backgroundColor: '#eee', fontWeight: 'bold' }}>Id</Table.HeaderCell>
                        <Table.HeaderCell style={{ backgroundColor: '#eee', fontWeight: 'bold' }}>Description</Table.HeaderCell>
                        <Table.HeaderCell style={{ backgroundColor: '#eee', fontWeight: 'bold' }}>Address</Table.HeaderCell>
                        <Table.HeaderCell style={{ backgroundColor: '#eee', fontWeight: 'bold' }}>maxHourConsumption</Table.HeaderCell>
                       
                       
                    </Table.Row>
                </Table.Header>

                <Table.Body >
                    {apiData.map((data) => {
                        return (
                            <Table.Row  >
                                <Table.Cell style={{ borderRight: '1px solid #ccc' }}>{data.id}</Table.Cell>
                                <Table.Cell style={{ borderRight: '1px solid #ccc' }}>{data.description}</Table.Cell>
                                <Table.Cell style={{ borderRight: '1px solid #ccc' }}>{data.address}</Table.Cell>
                                <Table.Cell >{data.maxHourConsumption}</Table.Cell>
                            </Table.Row>
                        )
                    })}

                </Table.Body>
            </Table>
        </div>
    )
}