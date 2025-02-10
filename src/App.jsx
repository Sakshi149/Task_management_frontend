import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Tasks from './tasks'
import Header from './Header'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='' element={<Tasks/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
