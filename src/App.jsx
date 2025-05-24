import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Tasks from './pages/Tasks/tasks'
import Header from './components/Header'
import Register from './pages/Register'
import Login from './pages/Login'
import Logout from './pages/logout'
import MyInfo from './pages/MyInfo'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/tasks' element={<Tasks/>}></Route>
          <Route path='/logout' element={<Logout/>}></Route>
          <Route path='/myinfo' element={<MyInfo/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
