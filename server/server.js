const WebSocket=require('ws');

const wss= new WebSocket.Server({
    port:8080
},()=>{
    console.log('websocket server initialized')
});

wss.on('connection',function (ws){
    console.log("a user connected");
    ws.on('message',function(data){
        console.log(data.toString());
        wss.clients.forEach(function each(client){
            if(client.readyState=WebSocket.OPEN){
                client.send(data.toString());
            }
        })
    })
    ws.on('sent',function(mess){
        console.log(mess);
    })
    ws.on('close',function(){
        console.log("client disconnected");
    })
})