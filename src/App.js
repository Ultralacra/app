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
import LandingPage from './pages/LandingPage';
import CompletarRegistro from './pages/CompletarRegistro';
import ConsultarTransaccionesPage from './pages/ConsultarTransaccionesPage';
import RealizarTransaccionPage from './pages/RealizarTransaccionPage';
import CredencialesPage from './pages/CredencialesPage';


function App() {
  return (

    <div className="App">

 {/* rutas publicas  */}

<BrowserRouter>
    <Routes>
            <Route path="/" element={<LandingPage/>} /> 
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
            <Route exact path="/credenciales" element={<RouteController component={CredencialesPage}/>}/>
            <Route exact path="/realizar-transaccion" element={<RouteController component={RealizarTransaccionPage}/>}/>
            <Route exact path="/dashboard-users" element={<RouteController component={DashboardUsers}/>}/>
            <Route exact path="/consultar-transacciones" element={<RouteController component={ConsultarTransaccionesPage}/>}/>
            <Route exact path="/completar-registro" element={<RouteController component={CompletarRegistro}/>}/>
        </Routes>
        </BrowserRouter>

  </div>
  );
}
export default App;
