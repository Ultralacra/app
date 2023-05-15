import React, { useState } from "react";
import "./FormRegister.css";
import { Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Stack from "@mui/material/Stack";
import Item from "@mui/material/Stack";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import ModalRegistroExitoso from "../modals/ModalRegistroExitoso";
import swal from "sweetalert2";
import axios from "axios";
import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { PhoneOutlined } from "@ant-design/icons";
import { MailOutlined } from "@ant-design/icons";
import { LockOutlined } from "@ant-design/icons";
import { Formik } from "formik";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";

const theme = createTheme();

function Registro() {
  const [modal, setModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const linkStyles = {
    color: "#006D8E",
    textAlign: "left",
    fontSize: "13px",
    margin: "15px",
    /* Agrega otros estilos según tus necesidades */
  };

  return (
    <ThemeProvider theme={theme}>
      {modal && <ModalRegistroExitoso />}
      <Backdrop
        sx={{
          color: "#DFFEFF",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
      >
        Verificando por favor espere...
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ display: "flex" }}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            sm={false}
            md={5}
            sx={{
              backgroundImage:
                "url(http://valinkgroup.com/wp-content/uploads/2022/12/plantilla-pantallas-incorporacion-sitios-web-ganar-dinero-concepto-factura-factura_146120-246.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
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
                  Completa los datos solicitados
                </Typography>
                <Formik
                  initialValues={{
                    sFirstName: "",
                    sLastName: "",
                    sEmail: "",
                    sPhone: "",
                    sPassword: "",
                    sLogin: "",
                    iProfileID: 0,
                  }}
                  validate={(valores) => {
                    let errores = {};
                    //validacion de nombre
                    if (!valores.sFirstName) {
                      errores.sFirstName = "Campo obligatorio";
                    } else if (
                      !/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.sFirstName)
                    ) {
                      errores.sFirstName = "Solo letras y espacios";
                    }
                    //validacion de apellido
                    if (!valores.sLastName) {
                      errores.sLastName = "Campo obligatorio";
                    } else if (
                      !/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.sLastName)
                    ) {
                      errores.sLastName = "Solo letras y espacios";
                    }
                    //validacion de email
                    if (!valores.sEmail) {
                      errores.sEmail = "Campo obligatorio";
                    } else if (
                      !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                        valores.sEmail
                      )
                    ) {
                      errores.sEmail = "Email no válido";
                    }
                    //validacion de telefono
                    if (!valores.sPhone) {
                      errores.sPhone = "Campo obligatorio";
                    }
                    //validacion de contraseña
                    if (!valores.sPassword) {
                      errores.sPassword = "Campo obligatorio";
                    }
                    //validacion de login
                    if (!valores.sLogin) {
                      errores.sLogin = "Campo obligatorio";
                    }
                    // contraseña obligatoria
                    if (!valores.sPassword) {
                      errores.sPassword = "Campo obligatorio";
                    }

                    return errores;
                  }}
                  onSubmit={(values, { resetForm }) => {
                    setOpen(true);
                    setLoading(true);
                    axios
                      .post("https://valink-pay-api.vercel.app/users", {
                        sFirstName: values.sFirstName,
                        sLastName: values.sLastName,
                        sEmail: values.sEmail,
                        sPhone: values.sPhone,
                        sPassword: values.sPassword,
                        sLogin: values.sLogin,
                        iProfileID: 0,
                      })
                      .then((response) => {
                        if (response.data.status === "fail") {
                          swal.fire({
                            toast: true,
                            position: "top-end",
                            icon: "error",
                            text: "Correo electrónico o usuario ya registrado",
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true,
                          });
                          setOpen(false);
                          setLoading(false);
                        } else {
                          swal.fire({
                            toast: true,
                            position: "top-end",
                            icon: "success",
                            text: "Registro exitoso",
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true,
                          });
                          setLoading(false);
                          setOpen(false);
                          setModal(true);
                          resetForm();
                        }
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }}
                >
                  {({
                    touched,
                    errors,
                    values,
                    handleSubmit,
                    handleChange,
                    handleBlur,
                  }) => (
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
                            className="register-input inputClass"
                            size="large"
                            required
                            name="sFirstName"
                            label="Nombre"
                            type="text"
                            placeholder="Nombre"
                            prefix={<UserOutlined />}
                            value={values.sFirstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched.sFirstName}
                          />
                          {touched.sFirstName && errors.sFirstName && (
                            <Typography
                              variant="p"
                              color="error"
                              fontSize="0.8rem"
                              fontWeight="bold"
                              mt={1}
                              mb={1}
                              ml={1}
                              mr={1}
                              sx={{ textAlign: "left" }}
                            >
                              {errors.sFirstName}
                            </Typography>
                          )}
                        </Item>
                        <Item>
                          <Input
                            className="register-input"
                            size="large"
                            required
                            name="sLastName"
                            label="Apellido"
                            type="text"
                            placeholder="Apellido"
                            prefix={<UserOutlined />}
                            value={values.sLastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched.sLastName}
                          />
                          {touched.sLastName && errors.sLastName && (
                            <Typography
                              variant="p"
                              color="error"
                              fontSize="0.8rem"
                              fontWeight="bold"
                              mt={1}
                              mb={1}
                              ml={1}
                              mr={1}
                              sx={{ textAlign: "left" }}
                            >
                              {errors.sLastName}
                            </Typography>
                          )}
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
                            className="register-input"
                            size="large"
                            required
                            name="sPhone"
                            label="Teléfono"
                            type="tel"
                            placeholder="Teléfono"
                            prefix={<PhoneOutlined />}
                            value={values.sPhone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched.sPhone}
                          />
                          {touched.sPhone && errors.sPhone && (
                            <Typography
                              variant="p"
                              color="error"
                              fontSize="0.8rem"
                              fontWeight="bold"
                              mt={1}
                              mb={1}
                              ml={1}
                              mr={1}
                              sx={{ textAlign: "left" }}
                            >
                              {errors.sPhone}
                            </Typography>
                          )}
                        </Item>
                        <Item>
                          <Input
                            className="register-input"
                            size="large"
                            required
                            id="userEmail"
                            type="email"
                            label="Correo electrónico"
                            name="sEmail"
                            placeholder="Correo electrónico"
                            prefix={<MailOutlined />}
                            value={values.sEmail}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched.sEmail}
                          />
                          {touched.sEmail && errors.sEmail && (
                            <Typography
                              variant="p"
                              color="error"
                              fontSize="0.8rem"
                              fontWeight="bold"
                              mt={1}
                              mb={1}
                              ml={1}
                              mr={1}
                              sx={{ textAlign: "left" }}
                            >
                              {errors.sEmail}
                            </Typography>
                          )}
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
                            className="register-input"
                            size="large"
                            required
                            name="sPassword"
                            label="Contraseña"
                            type="password"
                            placeholder="Contraseña"
                            prefix={<LockOutlined />}
                            value={values.sPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched.sPassword}
                          />
                          {touched.sPassword && errors.sPassword && (
                            <Typography
                              variant="p"
                              color="error"
                              fontSize="0.8rem"
                              fontWeight="bold"
                              mt={1}
                              mb={1}
                              ml={1}
                              mr={1}
                              sx={{ textAlign: "left" }}
                            >
                              {errors.sPassword}
                            </Typography>
                          )}
                        </Item>
                        <Item>
                          <Input
                            className="register-input"
                            size="large"
                            required
                            name="sLogin"
                            label="Usuario"
                            type="text"
                            placeholder="Nombre de usuario"
                            prefix={<UserOutlined />}
                            value={values.sLogin}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched.sLogin}
                          />
                          {touched.sLogin && errors.sLogin && (
                            <Typography
                              variant="p"
                              color="error"
                              fontSize="0.8rem"
                              fontWeight="bold"
                              mt={1}
                              mb={1}
                              ml={1}
                              mr={1}
                              sx={{ textAlign: "left" }}
                            >
                              {errors.sLogin}
                            </Typography>
                          )}
                        </Item>
                      </Stack>
                      <LoadingButton
                        loading={loading}
                        type="submit"
                        endIcon={<SendIcon />}
                        className="btn-create-account"
                        fullWidth
                        variant="contained"
                        disableElevation
                        sx={{
                          backgroundColor: "#006d8e",
                          borderRadius: "8px",
                        }}
                      >
                        Crear cuenta
                      </LoadingButton>

                      <div className>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          textAlign="left"
                          sx={{ mt: 1 }}
                          mt={1}
                          mb={1}
                        >
                          Al hacer click en Crear cuenta, declaras haber leído y
                          muestras tu conformidad con nuestros
                          <Link
                            style={linkStyles}
                            className="text-lost-password"
                            href="#"
                            variant="body2"
                          >
                            Términos de Servicio
                          </Link>
                        </Typography>
                        <KeyboardArrowLeftIcon className="icons-back icons-form" />

                        <Link
                          style={linkStyles}
                          className="text-lost-password"
                          to="/login"
                          variant="body2"
                        >
                          Atrás para iniciar sesión
                        </Link>
                      </div>
                    </form>
                  )}
                </Formik>
              </Box>
            </Container>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default Registro;
