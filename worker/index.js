const keys=require("./keys");
const redis=require('redis');

const redisClient=redis.createClient({
    host:keys.redisHost,
    port:keys.redisPort,
    retry_strategy:()=>1000
});
const sub=redisClient.duplicate()

// function addTodo(todo){

// }

// sub.on("message",(channel,message)=>{
//     addTodo()
// });