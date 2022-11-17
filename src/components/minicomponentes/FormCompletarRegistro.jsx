import React, {useState, useEffect} from 'react'
import "./FormCompletarRegistro.css"  
import Form from 'react-bootstrap/Form';
import { Typography } from '@mui/material';
import axios from 'axios';

const FormCompletarRegistro = () => {

  //consultar api para traer los estados de un endpoint y mostrarlos en el select
 const [estados, setEstados] = useState([]);

  useEffect(() => {
    axios
      .get("https://valink-pay-api.vercel.app/formulario/lista/estados",)
      .then((response) => {
        console.log(response.data);
        setEstados(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  return (
    <div className="form-completar-registro">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Nombre" />
        </Form.Group>

      </Form>
    </div>
  )
}

export default FormCompletarRegistro
