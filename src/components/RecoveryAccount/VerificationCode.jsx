import * as React from "react";
import "./VerificationCode.css";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import Stack from "@mui/material/Stack";
import Item from "@mui/material/Grid";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import ModalRecoveryPassword from "../modals/ModalRecoveryPassword";
import validator from "validator";
import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { SecurityScanOutlined } from "@ant-design/icons";
import { MailOutlined } from "@ant-design/icons";
import { LockOutlined } from "@ant-design/icons";

const theme = createTheme();
const RecoveryAccount = () => {
  const [body, setBody] = useState({
    login: "",
    email: "",
    code: "",
    new_password: "",
  });
  /* const [loading, setLoading] = useState(false); */
  const [modal, setModal] = useState(false);

  const handleRecoveryPassword = (e) => {
    if (e.target.name === "login") {
    }
    if (e.target.name === "email") {
    }
    if (e.target.name === "code") {
    }
    if (e.target.name === "new_password") {
    }
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  };

  async function enviarCorreo() {
    if (
      body.login === "" ||
      body.email === "" ||
      body.new_password === "" ||
      body.code === ""
    ) {
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

    // validar correo electronico

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

    //Empty fields
    if (
      body.login === "" ||
      body.email === "" ||
      body.new_password === "" ||
      body.code === ""
    )
      console.warn(body);
    axios
      .post("https://valink-pay-api.vercel.app/pwd/verifyCode", {
        login: body.login,
        email: body.email,
        new_password: body.new_password,
        code: body.code,
      })
      .then((response) => {
        console.log(body);
        console.log(response);

        let icon = response.data.status === "fail" ? "error" : "success";

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: icon,
          text: response.data.message,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });

        if (response.data.status === "success") return setModal(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <ThemeProvider theme={theme}>
      {modal && <ModalRecoveryPassword />}
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url()",
            backgroundRepeat: "cover",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Grid
          bgcolor="#f3f4f6"
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={0}
          square
        >
          <Box
            borderColor="#fafafa"
            padding="10px"
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
              Recuperación de datos de acceso
            </Typography>
            <Typography
              component="p"
              mt={2}
              fontSize="1rem"
              variant="p"
              align="center"
              fontWeight="500"
              color="#006D8E"
            >
              Para iniciar sesión en tu cuenta, inserta tu nombre de usuario,
              correo electrónico y código de seguridad.
            </Typography>
            <Box component="form" sx={{ mt: 4 }}>
              <Stack direction="row" spacing={2}>
                <Item>
                  <Input
                    size="large"
                    onChange={(event) => {
                      handleRecoveryPassword(event);
                    }}
                    placeholder="Usuario"
                    label="Usuario"
                    name="login"
                    prefix={<UserOutlined />}
                  />
                </Item>
                <Item>
                  <Input
                    size="large"
                    onChange={(event) => {
                      handleRecoveryPassword(event);
                    }}
                    placeholder="Email"
                    label="Email"
                    name="email"
                    prefix={<MailOutlined />}
                  />
                </Item>
              </Stack>
              <br></br>
              <Stack direction="row" spacing={2}>
                <Item>
                  <Input
                    size="large"
                    onChange={(event) => {
                      handleRecoveryPassword(event);
                    }}
                    placeholder="Codigo de seguridad"
                    label="Codigo de seguridad"
                    name="code"
                    prefix={<SecurityScanOutlined />}
                  />
                </Item>
                <Item>
                  <Input
                    size="large"
                    type="password"
                    onChange={(event) => {
                      handleRecoveryPassword(event);
                    }}
                    placeholder="Nueva contraseña"
                    label="Contraseña"
                    name="new_password"
                    prefix={<LockOutlined />}
                  />
                </Item>
              </Stack>
              <LoadingButton
                className="btn-changepassoword"
                onClick={enviarCorreo}
                fullWidth
                endIcon={<SendIcon />}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loadingPosition="end"
              >
                Cambiar contraseña
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
                <Link
                  className="text-lost-password"
                  to="/register-page"
                  variant="body2"
                >
                  Crear una cuenta
                </Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default RecoveryAccount;
