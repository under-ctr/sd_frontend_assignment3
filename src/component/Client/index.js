import React, { useState } from 'react';
import axios from 'axios';
import { Routes,Router, Route, Link, HashRouter } from "react-router-dom";


function Client() {
  const [clients, setClients] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  // Fetch clients from the API
  const fetchClients = async () => {
    const res = await axios.get('http://localhost:8080/client/all');
    setClients(res.data);
  }

  
  // Create a new client
  const createClient = async (e) => {
    e.preventDefault();
    const newClient = { name, address, password, role };
    await axios.post('http://localhost:8080/client/add', newClient);
    fetchClients();
  }

  // Update a client
  const updateClient = async (id) => {
    const updatedClient = { name, address, password, role };
    await axios.post('http://localhost:8080/client/${id}', updatedClient);
    fetchClients();
  }

  // Delete a client
  const deleteClient = async (id) => {
    await axios.delete('http://localhost:8080/client/${id}/');
    fetchClients();
  }


  return (
    <HashRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create">Create</Link>
            </li>
          </ul>
        </nav>
      
       <Routes> 
        <Route path="/" element={<Home clients={clients} deleteClient={deleteClient}/>}/>
        <Route path="/create" element={<Create onEnter={createClient} clients={clients} deleteClient={deleteClient}  setAddress={setAddress} setName={setName}/>} />
       <Route path="/update/:id" element={<Update onEnter={updateClient} clients={clients} deleteClient={deleteClient}/>} />
       </Routes>
      </div>
    </HashRouter>
  );
}

const Home = (props) => {
    const { clients, deleteClient } = props;
    
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Password</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.address}</td>
              <td>{client.password}</td>
              <td>{client.role}</td>
              <td>
                <Link to={`/update/${client.id}`}>Edit</Link>
                <button onClick={() => deleteClient(client.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Create = (props) => {
    const { setAddress, setName,setPassword, setRole } = props;
  return (
    <form onSubmit={props.onEnter}>
      <input 
        type="text" 
        placeholder="Name" 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Address" 
        onChange={(e) => setAddress(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Role" 
          onChange={(e) => setRole(e.target.value)} 
        />
        <button type="submit">Create</button>
      </form>
    );
  }
  
  const Update = (props) => {
    const { setAddress, setName,setPassword, setRole } = props;
    return (
      <form onSubmit={(e) => props.onEnter(e.target.id.value)}>
        <input 
          type="hidden" 
          id="id"
          value={props.params.id}
        />
        <input 
          type="text" 
          placeholder="Name" 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Address" 
          onChange={(e) => setAddress(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Role" 
          onChange={(e) => setRole(e.target.value)} 
        />
        <button type="submit">Update</button>
      </form>
    );
  }

export default Client;