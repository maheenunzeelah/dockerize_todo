import { useState,useEffect } from 'react';
import {Todo} from './components/Todo';
import axios from "./utils/auth-header";
function App() {
  const [todos,setTodos]=useState([]);
  const [value,setValue]=useState({})
  const deleteTodo=async (id)=>{
    const filteredTodos= await axios.delete(`todos/delete/${id}`)
   
  
    setTodos(filteredTodos)
   
  }
  const add= async (todo)=>{
  try{
   const result= await axios.post("todos",todo)
  setValue({...value,val:'',id:''})
   setTodos(result.data)
  }
  catch(err){
    console.log(err)
  }
  }
  useEffect(()=>{
    const fetchData=async()=>{
      try{
      
        const initial=await axios.get("todos");
        setTodos(initial.data)
      }
  catch(err){
    console.log(err)
  }
    }
 fetchData()
  },[])
  const styles={
    background:"bg-info",
    height:""
  }
  return (
    <div className="App container mt-5">
      <div className='jumbotron d-flex justify-content-center  align-items-center'>
      <Todo todos={todos} deleteTodo={deleteTodo} value={value} setValue={setValue} add={add}/>
      </div>
    </div>
  );
}

export default App;
