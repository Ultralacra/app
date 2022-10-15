import React, { useState } from "react";
import { Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Item from "@mui/material/Stack";import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LoadingButton } from '@mui/lab';
import Axios from 'axios';
import LoginIcon from '@mui/icons-material/Login';
import { Typography } from "@mui/material";


export default function SignInSide() {




  
  const theme = createTheme();
  const [loading, setLoading] = useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
    
    Axios.post('https://valink-pay-api.vercel.app/login', {
        
        login: data.get("username"),
        password: data.get("password"),
    })
    .then(function (response) {
      console.warn(response);
      if(response.data.status !== 'success') return alert(response.data.message.message);
      alert('Datos Correctos');
        localStorage.setItem("auth", JSON.stringify("yes"));
        window.location.href = "/dashboard-users";  
    })
    .catch(function (error) {
      console.warn(error);
    })
    .then(function () { 
      setLoading(false);
    });
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(http://valinkgroup.com/wp-content/uploads/2022/06/Valinkgroup.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "50%",
            backgroundPosition: "center",
            backgroundColor: "Grey",
          }}
        />
        <Grid item xs={12} sm={10} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img width="45%" src="http://valinkgroup.com/wp-content/uploads/2022/05/Gris.png"
            alt="logo"
            />
        
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
            >
              <Stack spacing={2}
              className="box-login-form"
              >
              <Item>
              <Typography component="p" variant="p"
              align="center"
              fontWeight="bold"
              color="#006D8E">
              INGRESAR
            </Typography>
              <TextField
              className="input-forms"
                margin="normal"
                size="small"
                required
                id="username"
                label="Email"
                name="username"
                autoComplete="username"
                autoFocus
              />
              </Item>
              <Item>
              <TextField
              className="input-forms"
                margin="normal"
                size="small"
                required
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              </Item>
              <Item>
              <LoadingButton
                className="btn-login"
                endIcon={<LoginIcon />}
                loading={loading}
                type="submit"
                fullWidth
                size="small"
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
              >Iniciar Sesión
              </LoadingButton>
              </Item>
              </Stack>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recordar contraseña"
              />
              <Link to="/"
              className="text-lost-password">
                    ¿Olvidaste tu contraseña?
                  </Link>
              <hr />
              <Stack>
                <Item>
                <Link
                className="btn-register"
                type="submit"
                fullWidth
                size="small"
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
                to="/register-page"
              >REGISTRARME
              </Link>
              </Item>
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}