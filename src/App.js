import React from 'react'
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteController from './components/RouteController/RouteController';
import HomePage from './pages/HomePage';
import { DashboardUsers } from './pages/DashboardUsers';


function App() {
  return (

    <div className="App">

 {/* rutas publicas  */}

 <BrowserRouter>
       <Routes>
            <Route path="/" element={<HomePage/>} /> 
            <Route path="/recovery-password" element={""}/>
            <Route path="/register" element={""}/>
            <Route path="*" element={""}/> 
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
