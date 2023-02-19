
import { Routes,Router, Route, Link, HashRouter } from "react-router-dom";

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
                <Link to={'http://localhost:8080/client/${client.id}'}>Edit</Link>
                <button onClick={() => deleteClient(client.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;