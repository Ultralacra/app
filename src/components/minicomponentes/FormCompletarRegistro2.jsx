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

const FormCompletarRegistro = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));



  
  //consultar api para traer los estados de un endpoint y mostrarlos en el select

  const [estados, setEstados] = useState([]);

  useEffect(() => {
    const fetchEstados = async () => {
      const response = await axios.get(
        "https://valink-pay-api.vercel.app/formulario/lista/estados"
      );
      const newData = await response.data;
      setEstados(newData);
      console.warn(response.data);
    };
    fetchEstados();
  }, []);

    const [usuario, setUsuario] = useState([]);
  
    useEffect(() => {
      const id = JSON.parse(localStorage.getItem("id"));
      axios
        .get(`https://valink-pay-api.vercel.app/users/${id}`, {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")),
          },
        })
        .then((response) => {
          console.log(response.data);
          setUsuario(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

  return (
    <div className="form-completar-registro">
       <Typography
                variant="p"
                fontWeight="bold"
                color="#006d8e"
                fontFamily=""
                align="left"
                fontSize="1rem"
              >
                Datos Publicos
              </Typography>
              <div className="espaciador-amarillo"></div>
              <br />
        <Alert icon={false} severity="info">
        Indícanos el nombre de fantasía. Corresponde al nombre de tu comercio que verán tus clientes.

        </Alert>
        <Stack
        >
          <Item elevation={0}>
            <TextField
              id="outlined-basic"
              label="Nombre de Fantasía"
              placeholder="Ej: Zapateria Pérez"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Item>

        </Stack>

              <Alert icon={false} severity="info">
        Datos de contacto
        Indícanos con quien ValinkPay debe contactarse en caso que sea necesario.
        <br></br>
- Estos son los datos de la persona que administra la cuenta ValinkPay.
<br></br>
- Esta persona puede ser distinta al representante legal.
<br></br>
- Debes ingresar el nombre tal como aparece en el documento de identificación.

        </Alert>
        <Stack
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
      </Stack>
      <Alert icon={false} severity="info">
      Publica el logo de tu comercio o una imagen que lo represente.


        </Alert>
        <Stack
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
      </Stack>
      <Alert icon={false} severity="info">
      Datos Bancarios


        </Alert>
        <Stack
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
      </Stack>
    </div>
  );
};

export default FormCompletarRegistro;
