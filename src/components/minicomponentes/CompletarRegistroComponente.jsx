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

const CompletarRegistroComponente = () => {
  const [TypePerson, setTypePerson] = useState("");
  const [usuario, setUsuario] = useState([]);
  const [datos, setDatos] = useState({
    sUserId: "",
    sTipoPersona: "",
    sCedula: "",
    sRazonSocial: " ",
    sSitioWeb: "",
    sTelefonoAsociado: "",
    sCategoriaRubro: "",
    sRubro: "",
    sEstado: "",
    sCiudad: "",
    sMunicipio: "",
    sDireccion: " ",
    sActividadEcon: "",
    sNombreReprLegal: " ",
    sCedulaReprLegal: "",
    sTelefonoReprLegal: "",
    sEmailReprLegal: "",
    sNombreContacto: "",
    sTelefonoContacto: "",
    sEmailContacto: "",
    sNombrePublico: " ",
    sEmailPublico: "",
    sUrlLogo: "",
    sTipoCuenta: "",
    sRazonSocialCuenta: "",
    sCedulaRif: "",
    sNroCuentaBanco: "",
    sConfirmarCuentaBan: "",
    sMedioPago: "",
  });

  //caputrar el valor del input
  const handleInputChange = (event) => {
    console.log(event.target.value);

    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const tipoDePersona = [
    { id: "N", name: "Persona Natural" },
    { id: "J", name: "Persona Jurídica" },
  ];

  //validar campos vacios

  //Llamar los usuario
  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("id"));
    axios
      .get(`https://valink-pay-api.vercel.app/users/${id}`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
      })
      .then((response) => {
        console.log(response.data);
        setUsuario(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //LLamar los bancos

  const [bancos, setBancos] = useState([]);

  useEffect(() => {
    axios
      .get("https://valink-pay-api.vercel.app/formulario/lista/bancos")
      .then((response) => {
        console.log(response.data);
        setBancos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const drawerWidth = 240;

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
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
                    <Typography
                      variant="p"
                      fontWeight="bold"
                      color="#006d8e"
                      fontFamily=""
                      align="left"
                      fontSize="1rem"
                    >
                      Completar registro
                    </Typography>
                    <div className="espaciador-amarillo"></div>
                    <br />
                    <Alert icon={false} severity="info">
                      ¿Utilizarás ValinkPay como persona natural o como persona
                      jurídica (empresa)?
                    </Alert>
                    <br />

                    <Alert icon={false} severity="info">
                      Datos de comercio<br></br>- Debes ingresar el nombre o
                      razón social tal como aparece en el documento de
                      identificación.
                    </Alert>
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 0.5, sm: 4, md: 1 }}
                    >
                      <Grid item xs={6}>
                        <Item elevation={0}>
                          <TextField
                            name="sCedula"
                            required
                            type="text"
                            label="Cédula o rif"
                            placeholder="Cédula o rif"
                            variant="outlined"
                            size="small"
                            fullWidth
                          />
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
                            fullWidth
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
                            fullWidth
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
                            fullWidth
                          />
                        </Item>
                      </Grid>
                      <Grid item xs={6}>
                        <Item elevation={0}>
                          <TextField
                            name="sCategoriaRubro"
                            required
                            select
                            type="text"
                            label="Categoria Rubro"
                            variant="outlined"
                            size="small"
                            fullWidth
                          />
                        </Item>
                      </Grid>
                      <Grid item xs={6}>
                        <Item elevation={0}>
                          <TextField
                            name="sRubro"
                            required
                            select
                            type="text"
                            label="Rubro"
                            variant="outlined"
                            size="small"
                            fullWidth
                          />
                        </Item>
                      </Grid>
                    </Grid>
                    <Alert icon={false} severity="info">
                      Indícanos la dirección de tu comercio.
                    </Alert>
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 0.5, sm: 4, md: 1 }}
                    >
                      <Grid item xs={6}>
                        <Item elevation={0}>
                          <TextField
                            required
                            select
                            label="Estado"
                            variant="outlined"
                            size="small"
                            fullWidth
                          />
                        </Item>
                      </Grid>
                      <Grid item xs={6}>
                        <Item elevation={0}>
                          <TextField
                            name="sCiudad"
                            required
                            select
                            label="Ciudad"
                            variant="outlined"
                            size="small"
                            fullWidth
                          />
                        </Item>
                      </Grid>
                      <Grid item xs={6}>
                        <Item elevation={0}>
                          <TextField
                            name="sMunicipio"
                            required
                            select
                            label="Muicipio"
                            variant="outlined"
                            size="small"
                            fullWidth
                          />
                        </Item>
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
                            fullWidth
                          />
                        </Item>
                      </Grid>
                    </Grid>
                    <Alert icon={false} severity="info">
                      Datos del representante legal
                    </Alert>
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 0.5, sm: 4, md: 1 }}
                    >
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
                            fullWidth
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
                            fullWidth
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
                            fullWidth
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
                            fullWidth
                          />
                        </Item>
                      </Grid>
                    </Grid>

                    <Alert icon={false} severity="info">
                      Datos del contacto
                    </Alert>
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 0.5, sm: 4, md: 1 }}
                    >
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
                            fullWidth
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
                            fullWidth
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
                            fullWidth
                          />
                        </Item>
                      </Grid>
                    </Grid>
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item elevation={0}>
                    <Typography
                      variant="p"
                      fontWeight="bold"
                      color="#006d8e"
                      fontFamily=""
                      align="left"
                      fontSize="1rem"
                    >
                      Datos Publicos
                    </Typography>
                    <div className="espaciador-amarillo"></div>
                    <br />
                    <Alert icon={false} severity="info">
                      Indícanos el nombre de fantasía. Corresponde al nombre de
                      tu comercio que verán tus clientes.
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
                            fullWidth
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
                      <br></br>- Notificación de seguridad: Donde enviaremos el
                      link de modificación de datos y el link de cambio de
                      contraseña.
                    </Alert>
                    <Stack
                      container
                      rowSpacing={1}
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
                            fullWidth
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
                      rowSpacing={1}
                      columnSpacing={{ xs: 0.5, sm: 4, md: 1 }}
                    >
                      <Stack item xs={6}>
                        <Item elevation={0}>Campo para subir logo</Item>
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
                      <Item elevation={0}>
                        <Select
                          name="sBanco"
                          required
                          variant="outlined"
                          size="small"
                          fullWidth
                        >
                          {bancos.map((banco) => (
                            <MenuItem  value={banco.sDescripcion}>
                              {banco.sDescripcion}
                              
                            </MenuItem>
                          ))}
                        </Select>
                      </Item>
                      <Item elevation={0}>
                        <Select
                          name="sTipoCuenta"
                          required
                          label="Tipo de cuenta"
                          variant="outlined"
                          size="small"
                          fullWidth
                        >
                          <MenuItem value="ahorro">AHORRO</MenuItem>
                          <MenuItem value="corriente">CORRIENTE</MenuItem>
                        </Select>
                      </Item>
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
                          required
                          helperText="Sin puntos ni guiones"
                          type="number"
                          label="Confirmar Nro. dé Cuenta de banco"
                          placeholder="Ejem: 12345678901234567890"
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
                      </Item>
                      <Item elevation={0}>
                        <TextField
                          required
                          helperText="Sin puntos ni guiones"
                          type="number"
                          label="Confirmar Nro. de Cuenta de banco"
                          placeholder="Ej: 12345678901234567890"
                          variant="outlined"
                          size="small"
                          fullWidth
                        />
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
  );
};

export default CompletarRegistroComponente;
