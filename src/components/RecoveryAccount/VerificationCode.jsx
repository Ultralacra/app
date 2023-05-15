import * as React from "react";
import "./VerificationCode.css";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useState } from "react";
import Swal from "sweetalert2";
import Stack from "@mui/material/Stack";
import Item from "@mui/material/Grid";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import ModalRecoveryPassword from "../modals/ModalRecoveryPassword";
import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { SecurityScanOutlined } from "@ant-design/icons";
import { MailOutlined } from "@ant-design/icons";
import { LockOutlined } from "@ant-design/icons";
import { Formik } from "formik";
import Container from "@mui/material/Container";
import { LoadingButton } from "@mui/lab";

const theme = createTheme();
const RecoveryAccount = () => {
  const [body, setBody] = useState({
    login: "",
    email: "",
    code: "",
    new_password: "",
  });

  const [loading, setLoading] = useState(false);

  const linkStyles = {
    color: "#006D8E",
    textAlign: "left",
    fontSize: "13px",
    margin: "15px",
    /* Agrega otros estilos según tus necesidades */
  };

  const [modal, setModal] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      {modal && <ModalRecoveryPassword />}
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          sm={false}
          md={5}
          sx={{
            backgroundImage:
              "url(http://valinkgroup.com/wp-content/uploads/2022/12/Paso-1-1.webp)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "500px auto",
            backgroundPosition: "center",
          }}
        />

        <Grid
          item
          xs={12}
          md={7}
          elevation={6}
          square
          bgcolor="#EBEBEB"
          display="flex"
          alignItems="center"
          textAlign={"left"}
        >
          <Container maxWidth="xs">
            <Box sx={{ justifyContent: "" }}>
              <Typography
                fontSize="35px"
                variant="p"
                fontWeight="bold"
                color="#2d3338"
                lineHeight="initial"
                textAlign="left"
              >
                Recuperación de datos de acceso
              </Typography>
              <Typography
                sx={{
                  marginTop: "20px",
                }}
                fontSize="16px"
                align="center"
                fontWeight="500"
                textAlign="left"
                color="#4f4f4f"
                mt={4}
              >
                Para iniciar sesión en tu cuenta, inserta tu nombre de usuario,
                correo electrónico y código de seguridad.
              </Typography>
              <Formik
                initialValues={{
                  login: "",
                  email: "",
                  code: "",
                  new_password: "",
                }}
                onSubmit={(values, { resetForm }) => {
                  setLoading(true);
                  axios
                    .post("https://valink-pay-api.vercel.app/pwd/verifyCode", {
                      login: values.login,
                      email: values.email,
                      new_password: values.new_password,
                      code: values.code,
                    })
                    .then((response) => {
                      if (
                        response.data.message ===
                        "Usuario y/o email no registrado"
                      ) {
                        Swal.fire({
                          toast: true,
                          position: "top-end",
                          icon: "error",
                          title: "Usuario y/o email no registrado",
                          showConfirmButton: false,
                          timer: 3000,
                        });
                        setLoading(false);
                      } else if (
                        response.data.message ===
                        "Código de verificación invalido"
                      ) {
                        Swal.fire({
                          toast: true,
                          position: "top-end",
                          icon: "error",
                          title: "Código de verificación invalido",
                          showConfirmButton: false,
                          timer: 3000,
                        });
                        setLoading(false);
                      } else if (
                        response.data.message ===
                        "Su Contraseña a sido Cambiada con Exito"
                      ) {
                        setModal(true);
                        resetForm();
                        setLoading(false);
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
              >
                {({ values, handleChange, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        mb: 2,
                        mt: 2,
                      }}
                    >
                      <Item>
                        <Input
                          size="large"
                          placeholder="Usuario"
                          label="Usuario"
                          name="login"
                          prefix={<UserOutlined />}
                          onChange={handleChange}
                          value={values.login}
                        />
                      </Item>
                      <Item>
                        <Input
                          size="large"
                          placeholder="Email"
                          label="Email"
                          name="email"
                          prefix={<MailOutlined />}
                          onChange={handleChange}
                          value={values.email}
                        />
                      </Item>
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        mb: 2,
                        mt: 2,
                      }}
                    >
                      <Item>
                        <Input
                          size="large"
                          placeholder="Codigo de seguridad"
                          label="Codigo de seguridad"
                          name="code"
                          prefix={<SecurityScanOutlined />}
                          onChange={handleChange}
                          value={values.code}
                        />
                      </Item>
                      <Item>
                        <Input
                          size="large"
                          type="password"
                          placeholder="Nueva contraseña"
                          label="Contraseña"
                          name="new_password"
                          prefix={<LockOutlined />}
                          onChange={handleChange}
                          value={values.new_password}
                        />
                      </Item>
                    </Stack>
                    <LoadingButton
                      loading={loading}
                      type="submit"
                      disabled={
                        values.login === "" ||
                        values.email === "" ||
                        values.code === "" ||
                        values.new_password === ""
                      }
                      fullWidth
                      endIcon={<SendIcon />}
                      variant="contained"
                      sx={{
                        mt: 1,
                        mb: 1,
                        borderRadius: "8px",
                        backgroundColor: "#006d8e",
                      }}
                    >
                      Cambiar contraseña
                    </LoadingButton>
                    <Link
                      style={linkStyles}
                      className="text-lost-password"
                      to="/login"
                      variant="body2"
                    >
                      <KeyboardArrowLeftIcon className="icons-back icons-form" />{" "}
                      Atrás para iniciar sesión
                    </Link>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      align="center"
                      fontSize={13}
                    >
                      ¿Nuevo en nuestra plataforma?{" "}
                      <Link
                        style={{
                          fontWeight: "bold",
                          color: "#006D8E",
                        }}
                        className="text-lost-password"
                        to="/register-page"
                        variant="body2"
                      >
                        Crear una cuenta
                      </Link>
                    </Typography>
                  </form>
                )}
              </Formik>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default RecoveryAccount;
