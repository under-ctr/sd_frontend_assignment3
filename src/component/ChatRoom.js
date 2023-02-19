
import React, {  useState, useEffect  } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';

var stompClient =null;
const ChatRoom = () => {
    const [privateChats, setPrivateChats] = useState(new Map());     
    const [publicChats, setPublicChats] = useState([]); 
    const [tab,setTab] =useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: ''
      });

      useEffect(() => {
        setUserData({ ...userData, username: localStorage.getItem('username') || '' });
      }, []);

    const handleUsername=(event)=>{
        const {value}=event.target;
        setUserData({...userData,"username": value});
    }  
    const registerUser=()=>{
        connect();
    }
    const connect =()=>{
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({},onConnected, onError);
    }


    const onConnected = () => {
        setUserData({...userData,"connected": true});
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
        Join();
    }

    const onError = (err) => {
        console.log(err);
        
    }

    const onMessageReceived = (payload)=>{
        var Data = JSON.parse(payload.body);
        
        if((Data.status === "JOIN") && (!privateChats.get(Data.senderName)) ){
            privateChats.set(Data.senderName,[]);
            setPrivateChats(new Map(privateChats));
        }
        if(Data.status === "MESSAGE"){
            publicChats.push(Data);
            setPublicChats([...publicChats]);
        }
    }
    
    const onPrivateMessage = (payload)=>{
        console.log(payload);
        var Data = JSON.parse(payload.body);
        if(!privateChats.get(Data.senderName)){
            let list =[];
            list.push(Data);
            privateChats.set(Data.senderName,list);
            setPrivateChats(new Map(privateChats));
        }
        else{
            privateChats.get(Data.senderName).push(Data);
            setPrivateChats(new Map(privateChats));   
        }
    }

    const Join=()=>{

        var Message ={
            senderName: userData.username,
            receiverName:"",
            status:"JOIN",
            message:"bine ai venit "+userData.username
        }
        stompClient.send("/app/message", {}, JSON.stringify(Message));
      
        publicChats.push(Message);
        setPublicChats([...publicChats]);
    }


/*
    const leave=()=>{

        var Message ={
            senderName: userData.username,
            receiverName:"",
            status:"LEAVE",
            message:"bye "+userData.username,
            connected: false
        }
        stompClient.send("/app/message", {}, JSON.stringify(Message));
        stompClient.disconnect();
      
        publicChats.push(Message);
        setPublicChats([...publicChats]);
        
    }
    */

    const sendValue=()=>{
            if (stompClient) {
              var Message = {
                senderName: userData.username,
                message: userData.message,
                status:"MESSAGE"
              };
              console.log(Message);
              stompClient.send("/app/message", {}, JSON.stringify(Message));
              setUserData({...userData,"message": ""});
            }
    }

    const sendPrivateValue=()=>{
        if (stompClient) {
          var Message = {
            senderName: userData.username,
            receiverName: tab,
            message: userData.message,
            status:"MESSAGE"
          };
          
          if(userData.username !== tab){
            privateChats.get(tab).push(Message);
            setPrivateChats(new Map(privateChats));
          }
          stompClient.send("/app/private-message", {}, JSON.stringify(Message));
          setUserData({...userData,"message": ""});
        }
    }

    const handleMessage =(event)=>{
        const {value}=event.target;
        setUserData({...userData,"message": value});
    }

    return (
       
    <div >
        
        {userData.connected?
        
        <div className="chat-box">
            <div className=''>{userData.username}
                </div>
            <div >
                
                <ul >
                    <li onClick={()=>{setTab("CHATROOM")}} className={`member ${tab==="CHATROOM" && "active"}`}>Chatroom</li>
                    {[...privateChats.keys()].map((name,index)=>(
                        <li onClick={()=>{setTab(name)}} className={`member ${tab===name && "active"}`} key={index}>{name}</li>
                    ))}</ul>
            </div>
            {tab==="CHATROOM" && <div >
                <ul >
                    {publicChats.map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div >{chat.message}</div></li>
                    ))}</ul>
                <div >
                    <input type="text" placeholder="place message" value={userData.message} onChange={handleMessage} /> 
                    <button type="button"  onClick={sendValue}>send</button>
                </div>
            </div>}
            {tab!=="CHATROOM" && <div>
                <ul >
                    {[...privateChats.get(tab)].map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar"> { chat.senderName}</div>}
                            <div >{chat.message}</div>
                            
                        </li>
                    ))}
                </ul>

                <div >
                    <input type="text" placeholder="place message" value={userData.message} onChange={handleMessage} /> 
                    <button type="button"  onClick={sendPrivateValue}>send</button>
                </div>
            </div>}
        </div>
        :
        <div className="register">
            <input
                readOnly
                id="user-name"
                placeholder="Enter your name"
                name="userName"
                value={localStorage.getItem('username')}
                onChange={handleUsername}
                
              />
              <button type="button" onClick={registerUser}>
                    connect
              </button> 
        </div>}
    </div>
    )
}

export default ChatRoom
