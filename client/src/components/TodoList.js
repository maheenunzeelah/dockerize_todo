export const TodoList=({todos,deleteTodo})=>{
    const todoList=todos.length?(todos.map(todo=>{
        return(
        <div className="todos" key={todo.id}>
        <center>
        <div onClick={()=>deleteTodo(todo.id)}>{todo.val}</div>
        </center>
        </div>
    )
})
    ): (<center><div>No todo left</div></center>)
    return(
     <div >{todoList}</div>
    );
} 
