// import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'

function App() {

  return (
     <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={ <LoginPage/>}></Route>
          <Route path="/signup" element={<SignupPage/>}></Route>
        </Routes>
        </div>
     </Router>
  )
}

export default App
