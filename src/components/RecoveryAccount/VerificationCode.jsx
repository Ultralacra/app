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
import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { SecurityScanOutlined } from "@ant-design/icons";
import { MailOutlined } from "@ant-design/icons";
import { LockOutlined } from "@ant-design/icons";
import { Formik } from "formik";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

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
            backgroundImage:
              "url(http://valinkgroup.com/wp-content/uploads/2022/12/Paso-1-1.webp)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "500px auto",
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
            <img
              width="45%"
              src="http://valinkgroup.com/wp-content/uploads/2022/05/Gris.png"
              alt="logo"
            />
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
              mb={4}
              fontSize="1rem"
              variant="p"
              align="center"
              fontWeight="500"
              color="#006D8E"
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
              onSubmit={(values, {resetForm}) => {
                axios
                  .post("https://valink-pay-api.vercel.app/pwd/verifyCode", {
                    login: values.login,
                    email: values.email,
                    new_password: values.new_password,
                    code: values.code,
                  })
                  .then((response) => {
                  if (response.data.message === "Usuario y/o email no registrado") {
                    Swal.fire({
                      toast: true,
                      position: "top-end",
                      icon: "error",
                      title: "Usuario y/o email no registrado",
                      showConfirmButton: false,
                      timer: 3000,

                 });
                  } else if (response.data.message === "Código de verificación invalido") {
                    Swal.fire({
                      toast: true,
                      position: "top-end",
                      icon: "error",
                      title: "Código de verificación invalido",
                      showConfirmButton: false,
                      timer: 3000,
                    });

                  } else if (response.data.message === "Su Contraseña a sido Cambiada con Exito") {
                 setModal(true);
                  resetForm();

                  }
                  })
                  .catch((error) => {
                    console.log(error);
                  }
                  );


                  
              }}



            >
              {({ values, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Stack direction="row" spacing={2}>
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
                  <br></br>
                  <Stack direction="row" spacing={2}>
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
                    sx={{ mt: 3, mb: 2 }}

                  >
                    Cambiar contraseña
                  </LoadingButton>
                  <Link
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
                </form>
              )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default RecoveryAccount;
