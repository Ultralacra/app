import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import "./CompletarRegistroComponente.css";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Form from "react-bootstrap/Form";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { ConstructionOutlined } from "@mui/icons-material";

const CompletarRegistroComponente = () => {
  const drawerWidth = 240;

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  //Llamar info usuario
  const [usuario, setUsuario] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const id = JSON.parse(localStorage.getItem("id"));
      const response = await axios.get(
        `https://valink-pay-api.vercel.app/users/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      setUsuario(response.data);
    }
    fetchData();
  }, []);

  //LLamar lista de bancos
  const [bancos, setBancos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `https://valink-pay-api.vercel.app/formulario/lista/bancos`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      setBancos(response.data);
    }
    fetchData();
  }, []);

  //select de tipo de persona
  const [sUserId, setsUserId] = useState(localStorage.getItem("id"));
  const [sTipoPersona, setsTipoPersona] = useState("");
  const [sCedula, setsCedula] = useState("");
  const [sRazonSocial, setsRazonSocial] = useState("");
  const [sSitioWeb, setsSitioWeb] = useState("");
  const [sTelefonoAsociado, setsTelefonoAsociado] = useState("");
  const [sCategoriaRubro, setsCategoriaRubro] = useState("");
  const [sRubro, setsRubro] = useState("");
  const [sEstado, setsEstado] = useState("");
  const [sCiudad, setsCiudad] = useState("");
  const [sMunicipio, setsMunicipio] = useState("");
  const [sDireccion, setsDireccion] = useState("");
  const [sActividadEcon, setsActividadEcon] = useState("");
  const [sNombreReprLegal, setsNombreReprLegal] = useState("");
  const [sCedulaReprLegal, setsCedulaReprLegal] = useState("");
  const [sTelefonoReprLegal, setsTelefonoReprLegal] = useState("");
  const [sEmailReprLegal, setsEmailReprLegal] = useState("");
  const [sNombreContacto, setsNombreContacto] = useState("");
  const [sTelefonoContacto, setsTelefonoContacto] = useState("");
  const [sEmailContacto, setsEmailContacto] = useState("");
  const [sNombrePublico, setsNombrePublico] = useState("");
  const [sEmailPublico, setsEmailPublico] = useState("");
  const [sUrlLogo, setsUrlLogo] = useState("");
  const [sTipoCuenta, setsTipoCuenta] = useState("");
  const [sBanco, setsBanco] = useState("");
  const [sCedulaRif, setsCedulaRif] = useState("");
  const [sNroCuentaBanco, setsNroCuentaBanco] = useState("");
  const [sConfirmarCuentaBan, setsConfirmarCuentaBan] = useState("");
  const [sMedioPago, setsMedioPago] = useState("");

  async function finalizarRegistro(e) {
    e.preventDefault();
    const response = await axios.post(
      `https://valink-pay-api.vercel.app/clientes/completarregistro`,
      {
        sUserId: localStorage.getItem("id"),
        sTipoPersona: sTipoPersona,
        sCedula,
        sRazonSocial: sRazonSocial,
        sSitioWeb: sSitioWeb,
        sTelefonoAsociado: sTelefonoAsociado,
        sCategoriaRubro: sCategoriaRubro,
        sRubro: sRubro,
        sEstado: sEstado,
        sCiudad: sCiudad,

        sMunicipio: sMunicipio,
        sDireccion: sDireccion,
        sActividadEcon: sActividadEcon,
        sNombreReprLegal: sNombreReprLegal,
        sCedulaReprLegal: sCedulaReprLegal,
        sTelefonoReprLegal: sTelefonoReprLegal,
        sEmailReprLegal: sEmailReprLegal,
        sNombreContacto: sNombreContacto,
        sTelefonoContacto: sTelefonoContacto,
        sEmailContacto: sEmailContacto,
        sNombrePublico: sNombrePublico,
        sEmailPublico: sEmailPublico,
        sUrlLogo: sUrlLogo,
        sTipoCuenta: sTipoCuenta,
        sBanco: sBanco,
        sCedulaRif: sCedulaRif,
        sNroCuentaBanco: sNroCuentaBanco,
        sConfirmarCuentaBan: sConfirmarCuentaBan,
        sMedioPago: sMedioPago
      }
    );
    if (response.data.status === "fail") {
      alert("Este usuario ya se encuentra registrado");
    } else {
      alert("Error al completar el registro");
    }
  }


  //Capturar datos de los inputs
  const changeEvent = (e, field) => {
    if (field === 1) setsTipoPersona(e.target.value);
    if (field === 2) setsCedula(e.target.value);
    if (field === 3) setsRazonSocial(e.target.value);
    if (field === 4) setsSitioWeb(e.target.value);
    if (field === 5) setsTelefonoAsociado(e.target.value);
    if (field === 6) setsCategoriaRubro(e.target.value);
    if (field === 7) setsRubro(e.target.value);
    if (field === 8) setsEstado(e.target.value);
    if (field === 9) setsCiudad(e.target.value);
    if (field === 10) setsMunicipio(e.target.value);
    if (field === 11) setsDireccion(e.target.value);
    if (field === 12) setsActividadEcon(e.target.value);
    if (field === 13) setsNombreReprLegal(e.target.value);
    if (field === 14) setsCedulaReprLegal(e.target.value);
    if (field === 15) setsTelefonoReprLegal(e.target.value);
    if (field === 16) setsEmailReprLegal(e.target.value);
    if (field === 17) setsNombreContacto(e.target.value);
    if (field === 18) setsTelefonoContacto(e.target.value);
    if (field === 19) setsEmailContacto(e.target.value);
    if (field === 20) setsNombrePublico(e.target.value);
    if (field === 21) setsEmailPublico(e.target.value);
    if (field === 22) setsUrlLogo(e.target.value);
    if (field === 23) setsTipoCuenta(e.target.value);
    if (field === 24) setsBanco(e.target.value);
    if (field === 25) setsCedulaRif(e.target.value);
    if (field === 26) setsNroCuentaBanco(e.target.value);
    if (field === 27) setsConfirmarCuentaBan(e.target.value);
    if (field === 28) setsMedioPago(e.target.value);

    console.log(e.target.value);
  };





  return (
    <div>
      <Box
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Container className="container">
          <Typography
            variant="h4"
            textAlign="left"
            color="#262626"
            fontWeight="bold"
            fontFamily=""
            mb={2}
          >
            TUS DATOS
          </Typography>

          <Divider
            sx={{
              backgroundColor: "#006d8e",
              height: "2px",
              width: "100%",
              mb: 2,
              borderRadius: "10px",
            }}
          />

          <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={8} md={4}>
              <Item className="item-1-registro">
                <Typography
                  variant="p"
                  fontWeight="bold"
                  color="#006d8e"
                  fontFamily=""
                  align="left"
                  fontSize="1rem"
                >
                  Tu información personal
                </Typography>
                <div className="espaciador-amarillo"></div>
                <br></br>
                <Typography
                  variant="p"
                  textAlign="left"
                  fontWeight="bold"
                  color="black"
                  fontSize="1rem"
                >
                  Nombre:
                </Typography>
                <br></br>
                <Typography
                  variant="p"
                  textAlign="left"
                  fontWeight="100"
                  color="black"
                  fontSize="1rem"
                >
                  {usuario.sFirstName}
                </Typography>
                <br></br>
                <Typography
                  variant="p"
                  textAlign="left"
                  fontWeight="bold"
                  color="black"
                  fontSize="1rem"
                >
                  Apellido:
                </Typography>
                <br></br>
                <Typography
                  variant="p"
                  textAlign="left"
                  fontWeight="100"
                  color="black"
                  fontSize="1rem"
                >
                  {usuario.sLastName}
                </Typography>
                <br></br>
                <Typography
                  variant="p"
                  textAlign="left"
                  fontWeight="bold"
                  color="black"
                  fontSize="1rem"
                >
                  Numero de teléfono:
                </Typography>
                <br></br>
                <Typography
                  variant="p"
                  textAlign="left"
                  fontWeight="100"
                  color="black"
                  fontSize="1rem"
                >
                  {usuario.sPhone}
                </Typography>
                <br></br>
                <Typography
                  variant="p"
                  textAlign="left"
                  fontWeight="bold"
                  color="black"
                  fontSize="1rem"
                >
                  Email:
                </Typography>
                <br></br>
                <Typography
                  variant="p"
                  textAlign="left"
                  fontWeight="100"
                  color="black"
                  fontSize="1rem"
                >
                  {usuario.sEmail}
                </Typography>
                <br></br>
                <Typography
                  variant="p"
                  textAlign="left"
                  fontWeight="bold"
                  color="black"
                  fontSize="1rem"
                >
                  Usuario de acceso:
                </Typography>

                <br></br>
                <Typography
                  variant="p"
                  textAlign="left"
                  fontWeight="100"
                  color="black"
                  fontSize="1rem"
                >
                  {usuario.sLogin}
                </Typography>
              </Item>
            </Grid>
            <Grid item xs={6} md={8}>
              <Item className="item-1-registro">
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={6}>
                    <Item elevation={0}>
                      <div className="espaciador-amarillo"></div>
                      <br />
                      <Alert icon={false} severity="info">
                        ¿Utilizarás ValinkPay como persona natural o como
                        persona jurídica (empresa)?
                      </Alert>
                      <br />

                      <Alert icon={false} severity="info">
                        Datos de comercio<br></br>- Debes ingresar el nombre o
                        razón social tal como aparece en el documento de
                        identificación.
                      </Alert>
                      <Grid container columnSpacing={{ xs: 0.5, sm: 4, md: 1 }}>
                        <Grid item xs={6}>
                          <Item elevation={0}>
                            <TextField
                              onChange={(e) => changeEvent(e, 2)}
                              name="sCedula"
                              required
                              type="text"
                              label="Cédula o rif"
                              placeholder="Cédula o rif"
                              variant="outlined"
                              size="small"
                            />
                          </Item>
                        </Grid>
                        <Grid item xs={6}>
                          <Item elevation={0}>
                            <TextField
                            onChange={(e) => changeEvent(e, 3)}
                              name="sRazonSocial"
                              required
                              type="text"
                              label="Razón Social"
                              placeholder="Ejemplo: ValinkGroup C.A"
                              variant="outlined"
                              size="small"
                            />
                          </Item>
                        </Grid>
                        <Grid item xs={6}>
                          <Item elevation={0}>
                            <TextField
                            onChange={(e) => changeEvent(e, 4)}
                              name="sSitioWeb"
                              required
                              type="text"
                              label="Sitio web"
                              placeholder="Ejem: www.valinkgroup.com"
                              variant="outlined"
                              size="small"
                            />
                          </Item>
                        </Grid>
                        <Grid item xs={6}>
                          <Item elevation={0}>
                            <TextField
                            onChange={(e) => changeEvent(e, 5)}
                              name="sTelefonoAsociado"
                              required
                              type="tel"
                              label="Teléfono Asociado "
                              placeholder="Ejem: 0414-1234567"
                              variant="outlined"
                              size="small"
                            />
                          </Item>
                        </Grid>
                        <Grid item xs={6}>
                          <Item elevation={0}>Categoria Rubro</Item>
                        </Grid>
                        <Grid item xs={6}>
                          <Item elevation={0}>Rubro</Item>
                        </Grid>
                      </Grid>
                      <Alert icon={false} severity="info">
                        Indícanos la dirección de tu comercio.
                      </Alert>
                      <Grid container columnSpacing={{ xs: 0.5, sm: 4, md: 1 }}>
                        <Grid item xs={6}>
                          <Item elevation={0}>Estado</Item>
                        </Grid>
                        <Grid item xs={6}>
                          <Item elevation={0}>Ciudad</Item>
                        </Grid>
                        <Grid item xs={6}>
                          <Item elevation={0}>municipio</Item>
                        </Grid>
                        <Grid item xs={6}>
                          <Item elevation={0}>
                            <TextField
                            onChange={changeEvent}
                              name="sDireccion"
                              required
                              type="text"
                              label="Dirección"
                              placeholder="Ejem: Av. Principal, Edificio 1, Piso 1, Oficina 1"
                              variant="outlined"
                              size="small"
                            />
                          </Item>
                        </Grid>
                      </Grid>
                      <Alert icon={false} severity="info">
                        Datos del representante legal
                      </Alert>
                      <Grid container columnSpacing={{ xs: 0.5, sm: 4, md: 1 }}>
                        <Grid item xs={6}>
                          <Item elevation={0}>
                            <TextField
                            onChange={(e) => changeEvent(e, 13)}
                              name="sNombreReprLegal"
                              required
                              type="text"
                              label="Nombre del Representante
                            Legal"
                              placeholder="Ejem: Juan Perez"
                              variant="outlined"
                              size="small"
                            />
                          </Item>
                        </Grid>
                        <Grid item xs={6}>
                          <Item elevation={0}>
                            <TextField
                            onChange={(e) => changeEvent(e, 14)}
                              name="sCedulaReprLegal"
                              required
                              type="text"
                              label="Cedula del Represéntate Legal"
                              placeholder="Ejem: 12345678"
                              variant="outlined"
                              size="small"
                            />
                          </Item>
                        </Grid>
                        <Grid item xs={6}>
                          <Item elevation={0}>
                            <TextField
                            onChange={(e) => changeEvent(e, 15)}
                              name="sTelefonoReprLegal"
                              required
                              type="tel"
                              label="Teléfono del Representante
                            Legal
                            "
                              placeholder="Ejem: 0414-1234567"
                              variant="outlined"
                              size="small"
                            />
                          </Item>
                        </Grid>
                        <Grid item xs={6}>
                          <Item elevation={0}>
                            <TextField
                            onChange={(e) => changeEvent(e, 16)}
                              name="sEmailReprLegal"
                              required
                              type="text"
                              label="Email del Representante"
                              placeholder="Ejem: juanperez@gmail.com"
                              variant="outlined"
                              size="small"
                            />
                          </Item>
                        </Grid>
                      </Grid>

                      <Alert icon={false} severity="info">
                        Datos del contacto
                      </Alert>
                      <Grid container columnSpacing={{ xs: 0.5, sm: 4, md: 1 }}>
                        <Grid item xs={6}>
                          <Item elevation={0}>
                            <TextField
                            onChange={(e) => changeEvent(e, 17)}
                              name="sNombreContacto"
                              required
                              type="text"
                              label="Nombre del Contacto"
                              placeholder="Ejem: Juan Perez"
                              variant="outlined"
                              size="small"
                            />
                          </Item>
                        </Grid>
                        <Grid item xs={6}>
                          <Item elevation={0}>
                            <TextField
                            onChange={(e) => changeEvent(e, 18)}
                              name="sTelefonoContacto"
                              required
                              type="tel"
                              label="Teléfono de Contacto"
                              placeholder="Ejem: 0414-1234567"
                              variant="outlined"
                              size="small"
                            />
                          </Item>
                        </Grid>
                        <Grid item xs={6}>
                          <Item elevation={0}>
                            <TextField
                            onChange={(e) => changeEvent(e, 19)}
                              name="sEmailContacto"
                              required
                              type="mail"
                              label="Email de Contacto"
                              placeholder="Ejem: contacto@valinkpay.com"
                              variant="outlined"
                              size="small"
                            />
                          </Item>
                        </Grid>
                      </Grid>
                    </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item elevation={0}>
                      <div className="espaciador-amarillo"></div>
                      <br />
                      <Alert icon={false} severity="info">
                        Indícanos el nombre de fantasía. Corresponde al nombre
                        de tu comercio que verán tus clientes.
                      </Alert>
                      <Stack>
                        <Stack item xs={6}>
                          <Item elevation={0}>
                            <TextField
                            onChange={(e) => changeEvent(e, 20)}
                              name="sNombrePublico"
                              required
                              type="text"
                              label="Nombre de Fantasía"
                              placeholder="Ejem: ValinkPay C.A"
                              variant="outlined"
                              size="small"
                            />
                          </Item>
                        </Stack>
                      </Stack>

                      <Alert icon={false} severity="info">
                        Indícanos el email de notificación, que es el que
                        ValinkPay utilizará como:
                        <br></br>- Email público: Para indicar a tus clientes
                        donde deben contactarte.
                        <br></br>- Notificación de pagos: Donde enviaremos los
                        avisos de pago realizados.
                        <br></br>- Notificación de seguridad: Donde enviaremos
                        el link de modificación de datos y el link de cambio de
                        contraseña.
                      </Alert>
                      <Stack
                        container
                        columnSpacing={{ xs: 0.5, sm: 4, md: 1 }}
                      >
                        <Stack item xs={6}>
                          <Item elevation={0}>
                            <TextField
                            onChange={(e) => changeEvent(e, 21)}
                              name="sEmailPublico"
                              required
                              type="email"
                              label={usuario.sEmail}
                              disabled
                              variant="outlined"
                              size="small"
                            />
                          </Item>
                        </Stack>
                      </Stack>
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                      ></Stack>
                      <Alert icon={false} severity="info">
                        Publica el logo de tu comercio o una imagen que lo
                        represente.
                      </Alert>
                      <Stack
                        container
                        columnSpacing={{ xs: 0.5, sm: 4, md: 1 }}
                      >
                        <Stack item xs={6}>
                          <Item elevation={0}>logo</Item>
                        </Stack>
                      </Stack>
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                      ></Stack>
                      <Alert icon={false} severity="info">
                        Datos Bancarios
                      </Alert>
                      <Stack>
                        <Item elevation={0}>banco</Item>
                        <Item elevation={0}>tipo de cuenta</Item>
                        <Item elevation={0}>
                          <TextField
                          
                            name="sRazonSocialCuenta"
                            required
                            label="Nombre o Razón Social de la
                          Cuenta Bancaria"
                            placeholder="Ejem: ValinkPay C.A, Juan Perez"
                            variant="outlined"
                            size="small"
                            fullWidth
                          />
                        </Item>
                        <Item elevation={0}>
                          <TextField
                          onChange= {(e) => changeEvent(e, 25)}
                            name="sCedulaRif"
                            required
                            type="text"
                            label="Cédula o RIF"
                            placeholder="Ejem: V-12345678"
                            variant="outlined"
                            size="small"
                            fullWidth
                          />
                        </Item>
                        <Item elevation={0}>
                          <TextField
                          onChange= {(e) => changeEvent(e, 26)}
                          name="sNroCuentaBanco"
                            required
                            helperText="Sin puntos ni guiones"
                            type="number"
                            label="Nro. de Cuenta de banco"
                            placeholder="Ejem: 12345678901234567890"
                            variant="outlined"
                            size="small"
                            fullWidth
                          />
                        </Item>
                        <Item elevation={0}>
                          <TextField
                          onChange= {(e) => changeEvent(e, 27)}
                          name="sConfirmarCuentaBan"
                            required
                            helperText="Sin puntos ni guiones"
                            type="number"
                            label="Confirmar Nro. de Cuenta de banco"
                            placeholder="Ej: 12345678901234567890"
                            variant="outlined"
                            size="small"
                            fullWidth
                          />
                          <LoadingButton
                            endIcon={<SendIcon />}
                            onClick={finalizarRegistro}
                            className="btn-create-account"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                          >
                            Finalizar Registro
                          </LoadingButton>
                        </Item>
                      </Stack>
                    </Item>
                  </Grid>
                </Grid>
              </Item>
            </Grid>
          </Grid>
          <br></br>
        </Container>
      </Box>
    </div>
  );
};

export default CompletarRegistroComponente;
