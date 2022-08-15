import { useState } from "react";
import Chatpage from "./components/chatroom";
const ws=new WebSocket('ws://localhost:8080');
function App() {
const [username,setUsername]=useState("");
const [Chat,setChat]=useState(false);

  function handlesubmit(event){
    event.preventDefault();

  }
  function user(event){
    setUsername(event.target.value);
  }
  function enableChat(event){
    event.preventDefault();
    if(username===""){
      alert("username cannot be empty");
      setChat(false);
    }
    else{
      setChat(true);
    }
  }
  return (
    !Chat?
    <div id="loginContainer">
        <img id="profileImg" src={require('./profile.png')} alt="Profile Avatar"/>
        <form action="#" onSubmit={handlesubmit} autoComplete="off" id="loginForm"> 
            <input type="text" placeholder="enter username" name="username" 
            onChange={user} id="loginInput"></input>
            <button id="loginButton" type="submit" onClick={enableChat}>login</button>
        </form>
    </div>:
    <Chatpage ws={ws} username={username}/>
  );
}

export default App;
