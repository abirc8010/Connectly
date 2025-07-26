import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/landing";
import Auth from "./pages/Authentication/auth";
import Meet from "./pages/Meet/meet";
import { AuthProvider } from "./Authenticator/authenticator";
import Waitingroom from "./pages/WaitingRoom/waitingroom.jsx";
import DashboardLayout from "./pages/Dashboard/dashboard.jsx";
import UsernameInput from "./components/Usernameinput.jsx";
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/join" s element={<Waitingroom />} />
            <Route path="/dashboard/*" element={<DashboardLayout />} />
            <Route path="/:url/setup" element={<UsernameInput />} />
            <Route path="/:url" element={<Meet />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
