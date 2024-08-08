import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing/landing'
import Auth from './pages/Authentication/auth'
import Meet from './pages/Meet/meet'
import { AuthProvider } from './Authenticator/authenticator'
import Waitingroom from './pages/WaitingRoom/waitingroom.jsx'
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path='/join' s element={<Waitingroom />} />
            <Route path="/:url" element={<Meet />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
