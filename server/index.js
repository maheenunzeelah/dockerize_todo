const keys = require("./keys");
const redis=require('redis');
//Express APP Setup
const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const app= express();
app.use(cors());
app.use(bodyParser.json());
const client=redis.createClient({
    host:keys.redisHost || "127.0.0.1",
    port:keys.redisPort || 6379,
    retry_strategy:()=>1000
})

client.on('connect', function () {
    console.log('redis connected');
    console.log(`connected ${client.connected}`);
}).on('error', function (error) {
    console.log(error);
});
client.set("todos",JSON.stringify([]))

//Express route handler
app.get('/get-todos',(req,res)=>{
  client.get('todos',(err,todos)=>{

    res.send(JSON.parse(todos))

  })
});
app.post('/post-todos',(req,res)=>{
    try{
      
        client.get('todos',(err,todos)=>{
            if(err){
                console.log(err)
            }
      
            res.send([...JSON.parse(todos),req.body])
          client.set("todos",JSON.stringify([...JSON.parse(todos),req.body]))
         })
     
    }
 catch(err){
     console.log(err)
 }
    
  });
app.delete('/delete-todos/:id',(req,res)=>{

  const id=req.params.id
  client.get('todos',(err,todos)=>{
    if(err)
     console.log(err,"errr")
   
    const filteredTodos=JSON.parse(todos).filter(todo=>{

      return todo.id!=id;
    })
    res.send(filteredTodos)
   
    client.set("todos",JSON.stringify(filteredTodos))
  })
 
})
const port=keys.nodePort || 5000
app.listen(port,()=>console.log(`listening to port ${port}`))
