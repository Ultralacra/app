import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import "./CompletarRegistroComponente.css";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";

const CompletarRegistroComponente = () => {
  //Datos del usuario
  const [usuario, setUsuario] = useState([]);
  //LLamar lista de bancos
  const [bancos, setBancos] = useState([]);
  //Datos del formulario

  const sCedulaRef = useRef('');
 
//Llamar info usuario
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

 const [body , setBody] = useState({

  sUserId: localStorage.getItem("id"),
        sTipoPersona: "13123123123",
        sCedula: "",
        sRazonSocial: "",
        sSitioWeb: "",
        sTelefonoAsociado: "",
        sCategoriaRubro: "",
        sRubro:   "",
        sEstado: "",
        sCiudad: "",
        sMunicipio:  "",
        sDireccion: "",
        sActividadEcon:   "",
        sNombreReprLegal: "",
        sCedulaReprLegal: "",
        sTelefonoReprLegal: "",
        sEmailReprLegal: "",  
        sNombreContacto:  "",
        sTelefonoContacto: "",
        sEmailContacto: "",
        sNombrePublico: "",
        sEmailPublico:  "",
        sUrlLogo: "",
        sTipoCuenta: "",
        sBanco: "",
        sCedulaRif: "",
        sNroCuentaBanco: "",
        sConfirmarCuentaBan: "",
        sMedioPago: "",

})

console.log(body)

const handleChange = (e) => {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  };

const registrar = () => {
  console.log(sCedulaRef.current.value);
};


//Config del tema
const drawerWidth = 240;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));


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
                          required
                          size="small"
                          fullWidth
                          name="sCedula"
                          label="Cedula o Rif"
                          type="text"                          
                          value={body.sCedula}
                          onChange={handleChange}/>
                          </Item>
                        </Grid>
                        <Grid item xs={6}>
                          <Item elevation={0}>
                            <TextField
                              name="sRazonSocial"
                              required
                              type="text"
                              label="Razón Social"
                              placeholder="Ejemplo: ValinkGroup C.A"
                              variant="outlined"
                              size="small"
                              inputRef={sCedulaRef}
                            />
                          </Item>
                        </Grid>
                        <Grid item xs={6}>
                          <Item elevation={0}>
                            <TextField
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
                            className="btn-create-account"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={registrar}
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
