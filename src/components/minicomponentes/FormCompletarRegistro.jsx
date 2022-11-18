import React, { useState, useEffect } from "react";
import "./FormCompletarRegistro.css";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";
import Select from "react-select";

const FormCompletarRegistro = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const handleSelectChange = (event) => {
    console.log(event);
  };

  //consultar api para traer los estados de un endpoint y mostrarlos en el select

//cambiar el id del estado segun el estado seleccionado


  const [estados, setEstados] = useState([]);

  // Consulta Estados y guardar el id del estado seleccionado
  useEffect(() => {
    const consultarAPI = async () => {
      const url = "https://valink-pay-api.vercel.app/formulario/lista/estados";
      const resultado = await axios.get(url);
      setEstados(resultado.data);

    };
    consultarAPI();
    console.log(estados);
  }, []);






  return (
    <div className="form-completar-registro">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FormControl>
            <Typography
              variant="p"
              fontWeight="bold"
              color="#006d8e"
              fontFamily=""
              align="left"
              fontSize="1rem"
            >
              Completar registro
            </Typography>
            <div className="espaciador-amarillo"></div>
            <br />
            <Alert icon={false} severity="info">
              ¿Utilizarás ValinkPay como persona natural o como persona jurídica
              (empresa)?
            </Alert>
            <RadioGroup name="radio-buttons-group">
              <FormControlLabel
                value="persona-natural"
                control={<Radio />}
                label="Persona natural"
              />
              <FormControlLabel
                value="persona-juridica"
                control={<Radio />}
                label="Persona jurídica (empresa)"
              />
            </RadioGroup>
          </FormControl>
        </Form.Group>
        <Alert icon={false} severity="info">
          Datos de comercio<br></br>
          -Debes ingresar el nombre o razón social tal como aparece en el
          documento de identificación.
        </Alert>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Item elevation={0}>
            <TextField
              id="outlined-basic"
              label="Cédula"
              placeholder="V-12345678"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Item>
          <Item elevation={0}>
            <TextField
              id="outlined-basic"
              label="Razón social"
              placeholder="Ej: ValinkPay S.A."
              variant="outlined"
              size="small"
              fullWidth
            />
          </Item>
        </Stack>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Item elevation={0}>
            <TextField
              id="outlined-basic"
              label="Sitio web o red social asociada"
              placeholder="Ej: www.valinkpay.com"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Item>
          <Item elevation={0}>
            <TextField
              id="outlined-basic"
              label="Teléfono de contacto asociado"
              placeholder="Ej: 0414-1234567"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Item>
        </Stack>
        <Stack>
          <Item elevation={0}>
            <TextField
              id="outlined-basic"
              label="Categoria de rubro"
              placeholder="Seleccione una categoria"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Item>
          <Item elevation={0}>
            <TextField
              id=""
              label="Rubro"
              placeholder="Seleccione un rubro"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Item>
        </Stack>
        <Alert icon={false} severity="info">
          Indícanos la dirección de tu comercio.
        </Alert>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Item elevation={0}>
            <Select
              options={estados.map((estados) => ({
                label: estados.estado,
                value: estados.id_estado,}))}
              onChange={handleSelectChange}
              placeholder="Seleccione un estado"
              
    
            />
          </Item>
          <Item elevation={0}>
                



          </Item>
        </Stack>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Item elevation={0}>
            <TextField
              id="outlined-basic"
              label="Municipio"
              placeholder="Seleccione un municipio"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Item>
          <Item elevation={0}>
            <TextField
              id="outlined-basic"
              label="dirección"
              placeholder="Ej: Av. Los Ruices, Edificio ValinkPay, Piso 1, Oficina 1"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Item>
        </Stack>
        <Alert icon={false} severity="info">
          Datos del representante legal
        </Alert>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Item elevation={0}>
            <TextField
              id="outlined-basic"
              label="Nombre del Representante
              Lega"
              placeholder="Ej: José Pérez"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Item>
          <Item elevation={0}>
            <TextField
              id="outlined-basic"
              label="Cedula del Represéntate Legal"
              placeholder="Ej: V-12345678"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Item>
        </Stack>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Item elevation={0}>
            <TextField
              id="outlined-basic"
              label="Email del Representante Legal"
              placeholder="Ej: contacto@contacto.com"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Item>
          <Item elevation={0}>
            <TextField
              id="outlined-basic"
              label="Teléfono del Representante
              Legal"
              placeholder="Ej: 0414-1234567"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Item>
        </Stack>
        <Alert icon={false} severity="info">
          Datos de contacto Indícanos con quien ValinkPay debe contactarse en
          caso que sea necesario.
          <br></br>- Estos son los datos de la persona que administra la cuenta
          ValinkPay.
          <br></br>- Esta persona puede ser distinta al representante legal.
          <br></br>- Debes ingresar el nombre tal como aparece en el documento
          de identificación.
        </Alert>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Item elevation={0}>
            <TextField
              id="outlined-basic"
              label="Nombre del Contacto"
              placeholder="Ej: José Pérez"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Item>
          <Item elevation={0}>
            <TextField
              id="outlined-basic"
              label="Teléfono de Contacto "
              placeholder="Ej: 0414-1234567"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Item>
        </Stack>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Item elevation={0}>
            <TextField
              id="outlined-basic"
              label="Email de Contacto"
              placeholder="Ej: contacto@contacto.com"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Item>
          <Item elevation={0}></Item>
        </Stack>
      </Form>
    </div>
  );
};

export default FormCompletarRegistro;
