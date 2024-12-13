import { Route, Routes } from 'react-router-dom'
import './App.css'
import Todolist from './pages/todolistpage/todolist'
import Addtodo from './pages/addTodolist/addtodo'
import Edittodo from './pages/editTodolist/edittodo'
import { TaskProvider } from './context/context'

function App() {

  return (
    <>
    <TaskProvider>
     <Routes>
      <Route path='/' element={<Todolist/>}/>
      <Route path='/addtask' element={<Addtodo/>}/>
      <Route path='/edit/:taskId' element={<Edittodo/>}/>
     </Routes>
     </TaskProvider>
    </>
  )
}

export default App
