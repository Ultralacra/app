import * as React from "react";
import "./RecoverPassword.css";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import { useState } from "react";
import { LoadingButton } from '@mui/lab';
import Swal from "sweetalert2";
import validator from "validator";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import { Input } from "antd";


const theme = createTheme();
const RecoveryAccount = () => {
    const [body, setBody] = useState({ login: '', email: '' });
    const [loading, setLoading] = useState(false);



const handleRecoveryPassword = e => {

    if (e.target.name === "login") {
    }
    if (e.target.name === "email") {
    }
		setBody({
			...body,
			[e.target.name]: e.target.value

		})
	}

  async function enviarCorreo() {


  //campos vacios empty fields
    if (body.login === "" || body.email === "") {
        Swal.fire({
            toast: true,
            position: "top-end",
            icon: "info",
            text: "Todos los campos son obligatorios",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });
        return;
    }


    if (!validator.isEmail(body.email)) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
        text: "Por favor ingrese un correo válido",
      });
      return;
    }

    setLoading(true);
    if (body.login === '' || body.password === '')
    console.warn(body);
    axios.post ("https://valink-pay-api.vercel.app/pwd/reset",{

          login: body.login,
          email: body.email,

    }).then((response) => {
      if (response.data.status === "fail") {
        Swal.fire({
            toast: true,
            position: 'top-end',
            text: 'Usuario y/o email no registrado',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,    
            })  
            setLoading(false);

        } else {
            Swal.fire({
                toast: true,
                position: 'top-end',
                text: 'Correo enviado con éxito',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
            })
            setLoading(false);
            window.location.href = "/complete-recovery-password";

        }
    }).catch((error) => {
        console.warn(error);
        setLoading(false);
    })
}


  return (
    <ThemeProvider theme={theme}>
      {/* {modal && <ModalRecuperarContraseña/>} */}
            <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url()",
            backgroundRepeat: "cover",

            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square
        
        >

          <Box
          className
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
        
           
            <Typography
              component="p"
              mt={4}
              fontSize="1.5rem"
              variant="p"
              align="center"
              fontWeight="bold"
              color="#006D8E"
            >
              Reestablece tu contraseña

            </Typography>

            <Typography className="texto-recuperar" sx={{ mt: 4 }}>
              Ingresa tu dirección de correo electrónico y te enviamos un código
              para reestablecer tu contraseña
            </Typography>

            <Box
              component="form"
              sx={{ mt: 4 }}
            >
              <Input  
                className="input-recovery-password"
                size="large"
                onChange={handleRecoveryPassword}
                placeholder="usuario"
                label="usuario"
                name="login"
              />
              <br></br>
              <br></br>
              <Input
                className="input-recovery-password"
                size="large"
                onChange={handleRecoveryPassword}
                placeholder="email"
                label="Email"
                name="email"
              />
              <LoadingButton
                onClick={enviarCorreo}	
                className="btn-login"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={loading}
                endIcon={<SendIcon />}
                loadingPosition="end"
              >
                Enviar
              </LoadingButton>
              <Link className="text-lost-password" to="/login" variant="body2">
                <KeyboardArrowLeftIcon className="icons-back icons-form" />{" "}
                Atrás para iniciar sesión
              </Link>
              <Typography
                variant="body2"
                color="textSecondary"
                align="center"
                sx={{ mt: 4 }}
              >
                ¿Nuevo en nuestra plataforma?{" "}
                <Link className="text-lost-password" to="/register-page" variant="body2">
                  Crear una cuenta
                </Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default RecoveryAccount;