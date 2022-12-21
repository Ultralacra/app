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
import ModalEmptyFields from "../modals/ModalEmptyFields";
import validator from "validator";
import swal from "sweetalert2";
import axios from "axios";
import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { PhoneOutlined } from "@ant-design/icons";
import { MailOutlined } from "@ant-design/icons";
import { LockOutlined } from "@ant-design/icons";

const theme = createTheme();

function Registro() {
  const [sFirstName, setsFirstname] = useState("");
  const [sLastName, setsLastname] = useState("");
  const [sEmail, setsEmail] = useState("");
  const [sPhone, setsPhone] = useState("");
  const [sPassword, setsPassword] = useState("");
  const [sLogin, setsLogin] = useState("");
  const [iProfileID] = useState("0");
  const [isEmpty, setIsEmpty] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalEmpty, setModalEmpty] = useState(false);


  // Limpia los campos del formulario

  async function registrar() {
    setModalEmpty(false);
    setModal(false);

    let items = {
      sFirstName,
      sEmail,
      sLastName,
      sPhone,
      sLogin,
      sPassword,
      iProfileID,
    };

    // Alert de campos vacios
    setIsEmpty(Object.values(items).map((x) => x === ""));

    if (Object.values(items).filter((x) => x === "").length > 0) {
      setModalEmpty(true);
      return;
    }

    if (!validator.isEmail(sEmail)) {
      swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        text: "Por favor ingrese un correo válido",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
      return;
    }

    axios
      .post("https://valink-pay-api.vercel.app/users", {
        sFirstName: sFirstName,
        sEmail: sEmail,
        sLastName: sLastName,
        sPhone: sPhone,
        sLogin: sLogin,
        sPassword: sPassword,
        iProfileID: iProfileID,
      })
      .then((response) => {
        console.warn(response.data.error);
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
        } else {
          setModal(true);
        }
      });
  }

  const changeEvent = (e, field) => {
    if (field === 1) setsFirstname(e.target.value);
    if (field === 2) setsLastname(e.target.value);
    if (field === 3) setsPhone(e.target.value);
    if (field === 4) setsEmail(e.target.value);
    if (field === 5) setsPassword(e.target.value);
    if (field === 6) setsLogin(e.target.value);
    if (modalEmpty) setModalEmpty(false);
    if (modal) setModal(false);
  };

  return (
    <ThemeProvider theme={theme}>
      {modal && <ModalRegistroExitoso />}
      {modalEmpty && <ModalEmptyFields />}
      <Box sx={{ display: "flex" }}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(http://valinkgroup.com/wp-content/uploads/2022/12/plantilla-pantallas-incorporacion-sitios-web-ganar-dinero-concepto-factura-factura_146120-246.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />

          <Grid
            bgcolor="#f3f4f6"
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 1,
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
                Completa los datos solicitados
              </Typography>
              <br></br>
              <Box>
                <Stack direction="row" spacing={2}>
                  <Item>
                    <Input
                      className="register-input inputClass"
                      size="large"
                      required
                      onChange={(e) => changeEvent(e, 1)}
                      name="sFirstName"
                      label="Nombre"
                      type="text"
                      placeholder="Nombre"
                      prefix={<UserOutlined />}

                    />

                  </Item>
                  <Item>
                    <Input
                      className="register-input"
                      size="large"
                      required
                      onChange={(e) => changeEvent(e, 2)}
                      name="sLastName"
                      label="Apellido"
                      type="text"
                      placeholder="Apellido"
                      prefix={<UserOutlined />}
                    />
                  </Item>
                </Stack>
                <br></br>
                <Stack direction="row" spacing={2}>
                  <Item>
                    <Input
                      className="register-input"
                      size="large"
                      required
                      onChange={(e) => changeEvent(e, 3)}
                      name="sPhone"
                      label="Teléfono"
                      type="tel"
                      placeholder="Teléfono"
                      prefix={<PhoneOutlined />}
                    />
                  </Item>
                  <Item>
                    <Input
                      className="register-input"
                      size="large"
                      required
                      onChange={(e) => changeEvent(e, 4)}
                      id="userEmail"
                      type="email"
                      label="Correo electrónico"
                      name="sEmail"
                      placeholder="Correo electrónico"
                      prefix={<MailOutlined />}
                    />
                  </Item>
                </Stack>
                <br></br>
                <Stack direction="row" spacing={2}>
                  <Item>
                    <Input
                      className="register-input"
                      size="large"
                      required
                      onChange={(e) => changeEvent(e, 5)}
                      name="sPassword"
                      label="Contraseña"
                      type="password"
                      placeholder="Contraseña"
                      prefix={<LockOutlined />}
                    />
                  </Item>
                  <Item>
                    <Input
                      className="register-input"
                      size="large"
                      required
                      onChange={(e) => changeEvent(e, 6)}
                      name="sLogin"
                      label="Usuario"
                      type="text"
                      placeholder="Nombre de usuario"
                      prefix={<UserOutlined />}
                    />
                  </Item>
                </Stack>
                <LoadingButton
                  endIcon={<SendIcon />}
                  onClick={registrar}
                  className="btn-create-account"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Crear cuenta
                </LoadingButton>

                <div className>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    align="center"
                    sx={{ mt: 1 }}
                    mt={1}
                    mb={1}
                  >
                    Al hacer click en Crear cuenta, declaras haber leído y{" "}
                    <br /> muestras tu conformidad con nuestros{" "}
                    <Link
                      className="text-lost-password"
                      href="#"
                      variant="body2"
                    >
                      Términos de Servicio
                    </Link>
                  </Typography>
                  <KeyboardArrowLeftIcon className="icons-back icons-form" />

                  <Link
                    className="text-lost-password"
                    to="/login"
                    variant="body2"
                  >
                    Atrás para iniciar sesión
                  </Link>
                </div>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default Registro;
