import React from 'react'
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import RouteController from './components/RouteController/RouteController';
import HomePage from './pages/HomePage';

function App() {
  return (

    <div className="App">



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
            <Route exact path="dashboard-users" element={<RouteController component={""}/>}/>
        </Routes>
        </BrowserRouter>

     </div>
  );
}
export default App;
