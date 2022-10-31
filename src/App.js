import React from 'react'
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteController from './components/RouteController/RouteController';
import HomePage from './pages/HomePage';
import { DashboardUsers } from './pages/DashboardUsers';
import RegisterPage from './pages/RegisterPage';
import RecoveryPasswordPage from './pages/RecoveryPasswordPage';
import NotFoundPage from './pages/NotFoundPage';
import VerificationCodePage from './pages/VerificationCodePage';
import Home from './pages/Home';

function App() {
  return (

    <div className="App">

 {/* rutas publicas  */}

<BrowserRouter>
    <Routes>
            <Route path="/" element={<Home/>} /> 
            <Route path="/recovery-account" element={<RecoveryPasswordPage/>} /> 
            <Route path="/complete-recovery-password" element={<VerificationCodePage/>} /> 
            <Route path="/register-page" element={<RegisterPage/>}/>
            <Route path="/Login" element={<HomePage/>}/>
            <Route path="*" element={<NotFoundPage/>}/> 
        </Routes> 
    </BrowserRouter>  

  {/* rutas privadas  */}
          
        <BrowserRouter>
        <Routes>
            <Route exact path="/dashboard-users" element={<RouteController component={DashboardUsers}/>}/>
        </Routes>
        </BrowserRouter>

  </div>
  );
}
export default App;
