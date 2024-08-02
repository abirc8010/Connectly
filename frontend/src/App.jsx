import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing/landing'
import Auth from './pages/Authentication/auth'
function App() {
  return (
    <>
      <Router>
          <Routes>
             <Route path="/" element={<Landing/>} />  
               <Route path="/auth" element={<Auth/>} /> 
          </Routes>        
      </Router>
    </>
  )
}

export default App
