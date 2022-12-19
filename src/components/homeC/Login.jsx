import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Item from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import Axios from "axios";
import LoginIcon from "@mui/icons-material/Login";
import { Typography } from "@mui/material";
import Swal from "sweetalert2";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

export default function SignInSide() {
  const theme = createTheme();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(""); //para asignar el valor al estado y poder acceder
  const [password, setPassword] = useState(""); //para asignar el valor al estado y poder acceder

  // Muestra/oculta la contraseña cada vez que se haga clic en el botón

  //funcion para ver el campo esta vacio o no
  const isFormComplete = () => username.length > 0 && password.length > 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);

    Axios.post("https://valink-pay-api.vercel.app/login", {
      //capos vacios

      login: data.get("username"),
      password: data.get("password"),
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    })
      .then(function (response) {
        console.warn(response);
        if (response.data.status !== "success")
          return Swal.fire({
            toast: true,
            position: "top-end",
            showCloseButton: true,
            icon: "error",
            text: "Usuario o contraseña incorrectos",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
          });

        localStorage.setItem("auth", JSON.stringify("yes"));
        localStorage.setItem(
          "id",
          JSON.stringify(response.data.message.userId)
        );
        localStorage.setItem(
          "token",
          JSON.stringify(response.data.message.Authorization)
        );
        localStorage.setItem(
          "profile",
          JSON.stringify(response.data.message.data.profile)
        );

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
        <Grid
          item
          xs={12}
          sm={10}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              width="45%"
              src="http://valinkgroup.com/wp-content/uploads/2022/05/Gris.png"
              alt="logo"
            />

            <Box component="form" noValidate onSubmit={handleSubmit}>
              <Stack spacing={2} className>
                <Item>
                  <Typography
                    component="p"
                    mt={2}
                    mb={2}
                    fontSize="1.5rem"
                    variant="p"
                    fontFamily={""}
                    align="center"
                    fontWeight="bold"
                    color="#006D8E"
                  >
                    ingresar
                  </Typography>
                  <Input
                    placeholder="nombre de usuario"
                    className="login-inputs"
                    onChange={(event) => setUsername(event.target.value)}
                    required
                    id="username"
                    label="Usuario"
                    name="username"
                    size="large"
                  />
                </Item>
                <Item>
                  <Input
                    placeholder="contraseña"
                    onChange={(event) => setPassword(event.target.value)}
                    className="login-inputs"
                    required
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    size="large"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Item>
                <Item>
                  <LoadingButton
                    endIcon={<LoginIcon />}
                    disabled={!isFormComplete()}
                    className={isFormComplete() ? "enabled" : "disabled"}
                    loading={loading}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 1 }}
                  >
                    Iniciar Sesión
                  </LoadingButton>
                </Item>
              </Stack>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recordar contraseña"
              />
              <Link to="/recovery-account" className="text-lost-password">
                ¿Olvidaste tu contraseña?
              </Link>
              <hr />
              <Stack>
                <Item>
                  <Link className="btn-register" to="/register-page">
                    registrarme
                  </Link>
                </Item>
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Stack></Stack>
    </ThemeProvider>
  );
}
