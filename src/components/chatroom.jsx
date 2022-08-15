import {React,useEffect, useState,useRef} from "react";

function Chat({ws,username}){


    const SendMessage=async()=>{
        ws.onopen=(data)=>{
            ws.send(data);
        }
        let date=new Date();
        if(message===""){
            alert("cannot send empty message");
        }
        else{
        const userData={user:username,message:message,key:count,time:date.toLocaleTimeString()};
        setCount(count+1);
        setMessage("");
        await ws.onopen(JSON.stringify(userData));
        }
    }
    const [message,setMessage]=useState("")
    const [count,setCount]=useState(1);
    const [messageList,setMessageList]=useState([]);
    const bottomRef =useRef(null);
    useEffect(()=>{
        ws.onmessage=function(event){
        const obj=JSON.parse(event.data);
        console.log(obj);
        setMessageList((list)=>[...list,obj]);
    }
    },[]);
    useEffect(()=>{
        bottomRef.current?.scrollIntoView({behavior:'smooth'});
    },[messageList]);

    const handleSubmit=(event)=>{
        event.preventDefault();
    }
    function usersMessage(event){
        setMessage(event.target.value);
    }
    return(<div>
        
        <div id="container"> 
        <div id="msgContainer">
            {messageList.map((messContent)=>{
                return(<div key={messContent.key} className="msg"><b> {messContent.user}</b><span> on {messContent.time}</span><hr></hr><p>{messContent.message}</p></div>);
            })}
        <div ref={bottomRef}/>
        </div>
        </div>
        <form action="#" onSubmit={handleSubmit} autoComplete="off" id="chatForm">
            <span id="userName">{username} : </span>
            <input id="chatInput" type="text" placeholder="type your message here" name="msg" onChange={usersMessage} value={message}/>
            <button id="chatButton" type="submit" onClick={SendMessage}>Send</button>
        </form>
        </div>);
}

export default Chat;