import { useState, useEffect } from 'react'
// import './App.css'
import Navbar from './component/Navbar'
import Footer from './component/Footer';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
uuidv4();


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handelCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(i => {
      return i.id === id
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    if (todo.length !== 0) {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
      setTodo("")
    }
    else {
      alert("Enter some content to add tasks")
    }
    saveToLS()
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(item => item.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    // let id = e.target.name
    // console.log(id)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const toggleFinished = (params) => {
    setshowFinished(!showFinished)
  }
  

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-orange-300 min-h-[85vh] my-4 rounded-lg ">

        <div className="todo p-4 text-sm font-medium">
          <h2 className='font-bold'>Add a Task</h2>
          <div className="add flex justify-between flex-col gap-2">
            <input type="text" onChange={handleChange} value={todo} className='text-sm font-medium py-1 px-2 border-[1px] border-orange-500 rounded-[5px] outline-none w-full' />
            <button onClick={handleAdd} className='bg-orange-500 p-3 py-1 rounded-[5px] hover:bg-orange-700 transition-all ease-in duration-150'>Save</button>
          </div>
          <div className='flex gap-2 mt-4 justify-center items-center'>
            <input onChange={toggleFinished} type="checkbox" checked={showFinished} />Show Finished
          </div>
          <h2 className='my-2 font-extrabold text-xl'>Your Todos</h2>
          {todos.length === 0 && <div className='font-bold'>No Tasks Available /..\</div>}
          {todos.map(item => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todos flex items-center justify-between my-3">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handelCheckbox} type="checkbox" checked={item.isCompleted} className='checked:bg-orange-500' />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="flex items-center p-0"> 
                <button name={item.id} onClick={(e) => handleEdit(e, item.id)} className='flex items-center bg-orange-500 p-2 py-1 mx-2 rounded-[5px] min-w-fit hover:bg-orange-700 transition-all ease-in duration-150'><FaEdit/>Edit</button>
                <button name={item.id} onClick={(e) => handleDelete(e, item.id)} className='flex items-center bg-orange-500 p-2 py-1 mx-2 rounded-[5px] min-w-fit hover:bg-orange-700 transition-all ease-in duration-150'><MdDelete/>Delete</button>
              </div>
            </div>
          })}

        </div>
      </div>
      <Footer/>
    </>
  )
}

export default App
