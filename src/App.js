
import ChatRoom from './component/ChatRoom';

import Create from './component/Create/create';
import './App.css';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import { Navigate } from 'react-router';
import Read from './component/Read/read';
import Update from './component/Update/update';
import Login from './component/LogIn/login';
import SinglePage from './component/SingleClientPage/singlepage';
import ReadDevice from './component/ReadDevice/readDevice';
import UpdateDevice from './component/Update/updateDevice';
import CreateDevice from './component/Create/createDevice';
import SignUp from './component/LogIn/singup';
import { ToastContainer } from 'react-toastify';



function App() {
  //let navigate = useNavigate();
  return (
 /*
 <Router>
          <Routes>
            <Route path='/signin' exact={true} element={<SignInForm updateUserData={this.updateUserData}/>}/>
            <Route path='/signup' exact={true} element={<SignUpForm/>}/>
            <Route path='/' exact={true} element={<Home token={this.state.token} role={this.state.role} user={this.state.user}/>}/>
            <Route path='/clients' exact={true} element={localStorage.getItem('role') === 'ROLE_ADMIN' ? <ClientList/> : <div>Unauthorized</div>}/>
            <Route path='/clients/:id' element={localStorage.getItem('role') === 'ROLE_ADMIN' ? <ClientEdit/> : <div>Unauthorized</div>}/>
            <Route path='/devices' exact={true} element={localStorage.getItem('role') === 'ROLE_ADMIN' ? <DeviceList/> : <div>Unauthorized</div>}/>
            <Route path='/devices/:id' element={localStorage.getItem('role') === 'ROLE_ADMIN' ? <DeviceEdit/> : <div>Unauthorized</div>}/>
            <Route path='/my-devices/:user' element={localStorage.getItem('role') === 'ROLE_USER' ? <UserDevices/> : <div>Unauthorized</div>}/>
            {/* <Route path='/chart/:description' element={localStorage.getItem('role') === 'ROLE_USER' ? <UserChart/> : <div>Unauthorized</div>}/> }
            </Routes>
            </Router>
 */
 
 <Router>
   <ToastContainer />
   <Routes>
   <Route path='/create' element={localStorage.getItem('Role') === 'Admin' ? <Create/> :<Navigate to="/singlePage" />}/>
   <Route path='/read'  element={ localStorage.getItem('Role') === 'Admin' ? <Read/ > :<Navigate to="/singlePage" />} />
   <Route exact path='/'  element={ <Login/ >} />
   <Route exact path='/chat'  element={ <ChatRoom/ >} />
   <Route exact path='/signUp'  element={ <SignUp/ >} />
   <Route exact path='/update' element={ <Update/ >} />
   <Route exact path='/updateDevice' element={ localStorage.getItem('Role') === 'Admin' ?  <UpdateDevice/> :<Navigate to="/singlePage" />} />
   <Route exact path='/singlePage' element={ <SinglePage/ >} />
   <Route exact path='/readDevice' element={ localStorage.getItem('Role') === 'Admin' ? <ReadDevice/ > :<Navigate to="/singlePage" />} />
   <Route exact path='/createDevice'  element={ localStorage.getItem('Role') === 'Admin' ? <CreateDevice/ > :<Navigate to="/singlePage" />} />
   </Routes>
  </Router>
  );
}

export default App;
