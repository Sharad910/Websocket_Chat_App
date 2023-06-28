const WebSocket=require('ws');

const wss= new WebSocket.Server({
    port:8080
},()=>{
    console.log('websocket server initialized')
});
let msgCount=0;
wss.on('connection',function (ws){
    console.log("a user connected");
    ws.on('message',function(data){
        msgCount++;
        let values=JSON.parse(data);
        values={...values,count:msgCount}
        values=JSON.stringify(values);
        wss.clients.forEach(function each(client){
            if(client.readyState=WebSocket.OPEN){
                client.send(values.toString());
            }
        })
    })
    ws.on('close',function(e,m){
        console.log(e);
        console.log(m.toString());
        console.log("user disconnected");
    })
    ws.on('error',function(e){
        console.log(e);
    })
})