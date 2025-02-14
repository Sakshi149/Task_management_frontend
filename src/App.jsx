import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Tasks from './tasks'
import Header from './Header'
import Register from './Register'
import Login from './login'
import Logout from './logout'
import MyInfo from './MyInfo'

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
