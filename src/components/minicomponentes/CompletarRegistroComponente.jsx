import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import "./CompletarRegistroComponente.css";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { Input, Field, Form, Space, Cascader, Tooltip } from "antd";
import { Formik } from "formik";
import { Radio } from "antd";
import LogoUpload from "./LogoUpload";
import {
  UserOutlined,
  MailOutlined,
  IdcardOutlined,
  PhoneOutlined,
  BankOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
/* import { Select } from "@mui/material";
 */ import { FormControlLabel, Checkbox, FormGroup } from "@mui/material";
import { AlertCompleteForm } from "../usercompletecomponentes/AlertCompleteForm";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const CompletarRegistroComponente = () => {
  //Config del tema
  const drawerWidth = 240;

  //Datos del usuario
  const [usuario, setUsuario] = useState([]);

  //tipo de cuenta bancaria
  const [tipoCuenta, setTipoCuenta] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `https://valink-pay-api.vercel.app/formulario/lista?tipo=TCB&subTipo=`,
        {}
      );
      setTipoCuenta(response.data);
    }
    fetchData();
  }, []);

  //medio de pago
  const [medioPago, setMedioPago] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `https://valink-pay-api.vercel.app/formulario/lista?tipo=MDP&subTipo=`,
        {}
      );
      setMedioPago(response.data);
    }
    fetchData();
  }, []);

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
  const [bancos, setBancos] = useState([]);

  //bancos
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

  //Estado
  const [estado, setEstado] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `https://valink-pay-api.vercel.app/formulario/lista/estados`,
        {}
      );
      setEstado(response.data);
    }
    fetchData();
  }, []);

  //ciudad
  const [ciudad, setCiudad] = useState([]);
  const [selectedEstado, setSelectedEstado] = useState("");

  const handleEstadoChange = (event) => {
    setSelectedEstado(event.target.value);
  };

  useEffect(() => {
    async function fetchCiudades() {
      const response = await axios.get(
        `https://valink-pay-api.vercel.app/formulario/lista/ciudades?estado=${selectedEstado}`,
        {}
      );
      setCiudad(response.data);
    }
    fetchCiudades();
  }, [selectedEstado]);

  //minicipios
  const [municipio, setMunicipio] = useState([]);
  const [selectedCiudad, setSelectedCiudad] = useState("");
  const handleCiudadChange = (event) => {
    setSelectedCiudad(event.target.value);
  };

  useEffect(() => {
    async function fetchMunicipios() {
      const response = await axios.get(
        `https://valink-pay-api.vercel.app/formulario/lista/municipios?estado=${selectedEstado}`,
        {}
      );
      setMunicipio(response.data);
    }
    fetchMunicipios();
  }, [selectedEstado]);

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
        <Container>
          <Formik
            initialValues={{
              sUserId: JSON.parse(localStorage.getItem("id")),
              sTipoPersona: "",
              sCedula: "",
              sRazonSocial: "",
              sSitioWeb: "",
              sTelefonoAsociado: "",
              sCategoriaRubro: "",
              sRubro: "",
              sEstado: "",
              sCiudad: "",
              sMunicipio: "",
              sDireccion: "",
              sActividadEcon: "",
              sNombreReprLegal: "",
              sCedulaReprLegal: "",
              sTelefonoReprLegal: "",
              sEmailReprLegal: "",
              sNombreContacto: "",
              sTelefonoContacto: "",
              sEmailContacto: "",
              sNombrePublico: "",
              sEmailPublico: usuario.sEmail,
              sUrlLogo: "",
              sTipoCuenta: "",
              sBanco: "",
              sCedulaRif: "",
              sNroCuentaBanco: "",
              sConfirmarCuentaBan: "",
              sMedioPago: [],
            }}
            onSubmit={(values) => {
              console.log(values);
            }}
            validate={(values) => {
              const errors = {};
              //validar nombre del representante legal
              if (!values.sNombreReprLegal) {
                errors.sNombreReprLegal = "Campo requerido";
              } else if (
                !/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.sNombreReprLegal)
              ) {
                errors.sNombreReprLegal =
                  "El nombre solo puede contener letras y espacios";
              }
              //validar nombre de contacto
              if (!values.sNombreContacto) {
                errors.sNombreContacto = "Campo requerido";
              } else if (
                !/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.sNombreContacto)
              ) {
                errors.sNombreContacto =
                  "El nombre solo puede contener letras y espacios";
              }

           

              return errors;
            }}
          >
            {({
              errors,
              values,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Typography
                  variant="h4"
                  textAlign="left"
                  color="#262626"
                  fontWeight="bold"
                  fontFamily=""
                  mb={2}
                >
                  COMPLETAR REGISTRO
                </Typography>
                <AlertCompleteForm />
                <div className="espaciador-amarillo-largo"></div>

                <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12 }}>
                  <Grid item xs={6} md={8}>
                    <Item className="item-1-registro">
                      <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                      >
                        <Grid item xs={6}>
                          <Item elevation={0}>
                            <Alert
                              severity="info"
                              textAlign="left"
                              className="alerta"
                            >
                              ¿Utilizarás ValinkPay como persona natural o como
                              persona jurídica (empresa)?
                            </Alert>

                            <Radio.Group
                              className="radio-group-completar-registro"
                              onChange={handleChange}
                              name="sTipoPersona"
                            >
                              <Radio value="natural">natural</Radio>
                              <Radio value="juridica">juridica</Radio>
                            </Radio.Group>

                            <Alert
                              severity="info"
                              textAlign="left"
                              className="alerta"
                            >
                              Datos de comercio<br></br>- Debes ingresar el
                              nombre o razón social tal como aparece en el
                              documento de identificación.
                            </Alert>
                            <Grid
                              container
                              columnSpacing={{ xs: 0.5, sm: 4, md: 1 }}
                            >
                              <Grid item xs={6}>
                                <Item elevation={0}>
                                  <Input
                                    placeholder="cédula o rif"
                                    value={values.sTest}
                                    name="sCedula"
                                    onChange={handleChange}
                                    prefix={
                                      <IdcardOutlined/>
                                    }
                                    suffix={
                                      <Tooltip title="Debe agregar J- para rif o V- cédula de identidad">
                                        <InfoCircleOutlined
                                          style={{
                                            color: "rgba(0,0,0,.45)",
                                          }}
                                        />
                                      </Tooltip>
                                    }
                                  />
                                </Item>
                              </Grid>
                              <Grid item xs={6}>
                                <Item elevation={0}>
                                  <Input
                                    name="sRazonSocial"
                                    type="text"
                                    label="Razón Social"
                                    placeholder="ValinkGroup C.A"
                                    variant="outlined"
                                    size="medium"
                                    value={values.sRazonSocial}
                                    onChange={handleChange}
                                  />
                                </Item>
                              </Grid>
                              <Grid item xs={6}>
                                <Item elevation={0}>
                                  <Input
                                    name="sSitioWeb"
                                    type="text"
                                    label="Sitio web"
                                    placeholder="www.valinkgroup.com"
                                    variant="outlined"
                                    size="medium"
                                    value={values.sSitioWeb}
                                    onChange={handleChange}
                                  />
                                </Item>
                              </Grid>
                              <Grid item xs={6}>
                                <Item elevation={0}>
                                  <Input
                                    name="sTelefonoAsociado"
                                    type="tel"
                                    label="Teléfono Asociado "
                                    placeholder="04141234567"
                                    variant="outlined"
                                    size="medium"
                                    value={values.sTelefonoAsociado}
                                    onChange={handleChange}
                                    prefix={<PhoneOutlined />}
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
                            <Alert
                              severity="info"
                              textAlign="left"
                              className="alerta"
                            >
                              Indícanos la dirección de tu comercio.
                            </Alert>
                            <Grid
                              container
                              columnSpacing={{ xs: 0.5, sm: 4, md: 1 }}
                            >
                              <Grid item xs={6}>
                                <Item elevation={0}>
                                  <TextField
                                    select
                                    fullWidth
                                    size="small"
                                    value={values.sEstado}
                                    onChange={handleEstadoChange}
                                    onInput={handleChange}
                                    name="sEstado"
                                    SelectProps={{
                                      native: true,
                                    }}
                                    variant="outlined"
                                  >
                                    {estado.map((option) => (
                                      <option
                                        key={option.id_estado}
                                        value={option.id_estado}
                                      >
                                        {option.estado}
                                      </option>
                                    ))}
                                  </TextField>
                                </Item>
                              </Grid>
                              <Grid item xs={6}>
                                <Item elevation={0}>
                                  {selectedEstado && (
                                    <TextField
                                      select
                                      fullWidth
                                      size="small"
                                      value={values.sCiudad}
                                      onChange={handleChange}
                                      onInput={handleCiudadChange}
                                      name="sCiudad"
                                      SelectProps={{
                                        native: true,
                                      }}
                                      variant="outlined"
                                    >
                                      {ciudad.map((option) => (
                                        <option
                                          key={option.id_ciudad}
                                          value={option.id_ciudad}
                                        >
                                          {option.ciudad}
                                        </option>
                                      ))}
                                    </TextField>
                                  )}
                                </Item>
                              </Grid>
                              <Grid item xs={6}>
                                <Item elevation={0}>
                                  {selectedEstado && (
                                    <TextField
                                      fullWidth
                                      select
                                      size="small"
                                      value={values.sMunicipio}
                                      onChange={handleChange}
                                      name="sMunicipio"
                                      SelectProps={{
                                        native: true,
                                      }}
                                      variant="outlined"
                                    >
                                      {municipio.map((option) => (
                                        <option
                                          key={option.id_municipio}
                                          value={option.id_municipio}
                                        >
                                          {option.municipio}
                                        </option>
                                      ))}
                                    </TextField>
                                  )}
                                </Item>
                              </Grid>
                              <Grid item xs={6}>
                                <Item elevation={0}>
                                  <Input
                                    name="sDireccion"
                                    type="text"
                                    label="Dirección"
                                    placeholder="Av. Principal, Edificio 1, Piso 1, Oficina 1"
                                    size="large"
                                    value={values.sDireccion}
                                    onChange={handleChange}
                                  />
                                </Item>
                              </Grid>
                            </Grid>
                            <Alert
                              severity="info"
                              textAlign="left"
                              className="alerta"
                            >
                              Datos del representante legal
                            </Alert>
                            <Grid
                              container
                              columnSpacing={{ xs: 0.5, sm: 4, md: 1 }}
                            >
                              <Grid item xs={6}>
                                <Item elevation={0}>
                                  <Input
                                    name="sNombreReprLegal"
                                    type="text"
                                    label="Nombre del representante legal"
                                    placeholder="Juan Perez"
                                    variant="outlined"
                                    size="medium"
                                    value={values.sNombreReprLegal}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    touched={touched.sNombreReprLegal}
                                    prefix={
                                      <UserOutlined className="site-form-item-icon" />
                                    }
                                  />
                                </Item>

                                {touched.sNombreReprLegal &&
                                  errors.sNombreReprLegal && (
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
                                      {errors.sNombreReprLegal}
                                    </Typography>
                                  )}
                              </Grid>
                              <Grid item xs={6}>
                                <Item elevation={0}>
                                  <Input
                                    name="sCedulaReprLegal"
                                    type="text"
                                    label="Cedula del Represéntate Legal"
                                    placeholder="V12345678"
                                    variant="outlined"
                                    size="medium"
                                    value={values.sCedulaReprLegal}
                                    onChange={handleChange}
                                    prefix={<IdcardOutlined />}
                                  />
                                </Item>
                              </Grid>
                              <Grid item xs={6}>
                                <Item elevation={0}>
                                  <Input
                                    name="sTelefonoReprLegal"
                                    type="tel"
                                    label="Teléfono del Representante Legal"
                                    placeholder="04141234567"
                                    variant="outlined"
                                    size="medium"
                                    value={values.sTelefonoReprLegal}
                                    onChange={handleChange}
                                    prefix={<PhoneOutlined />}
                                  />
                                </Item>
                              </Grid>
                              <Grid item xs={6}>
                                <Item elevation={0}>
                                  <Input
                                    name="sEmailReprLegal"
                                    type="text"
                                    label="Email del Representante"
                                    placeholder="juanperez@gmail.com"
                                    variant="outlined"
                                    size="medium"
                                    value={values.sEmailReprLegal}
                                    onChange={handleChange}
                                    prefix={<MailOutlined />}
                                  />
                                </Item>
                              </Grid>
                            </Grid>

                            <Alert
                              severity="info"
                              textAlign="left"
                              className="alerta"
                            >
                              Datos del contacto
                            </Alert>
                            <Grid
                              container
                              columnSpacing={{ xs: 0.5, sm: 4, md: 1 }}
                            >
                              <Grid item xs={6}>
                                <Item elevation={0}>
                                  <Input
                                    name="sNombreContacto"
                                    type="text"
                                    label="Nombre del Contacto"
                                    placeholder="Juan Perez"
                                    variant="outlined"
                                    size="medium"
                                    value={values.sNombreContacto}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    touched={touched.sNombreContacto}
                                    prefix={<UserOutlined />}
                                  />
                                </Item>
                                {touched.sNombreContacto &&
                                  errors.sNombreContacto && (
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
                                      {errors.sNombreContacto}
                                    </Typography>
                                  )}
                              </Grid>
                              <Grid item xs={6}>
                                <Item elevation={0}>
                                  <Input
                                    name="sTelefonoContacto"
                                    type="tel"
                                    label="Teléfono de Contacto"
                                    placeholder="04141234567"
                                    variant="outlined"
                                    size="medium"
                                    value={values.sTelefonoContacto}
                                    onChange={handleChange}
                                    prefix={<PhoneOutlined />}
                                  />
                                </Item>
                              </Grid>
                              <Grid item xs={6}>
                                <Item elevation={0}>
                                  <Input
                                    name="sEmailContacto"
                                    type="mail"
                                    label="Email de Contacto"
                                    placeholder="contacto@valinkpay.com"
                                    variant="outlined"
                                    size="medium"
                                    value={values.sEmailContacto}
                                    onChange={handleChange}
                                    prefix={<MailOutlined />}
                                  />
                                </Item>
                              </Grid>
                            </Grid>
                            <Alert
                              severity="info"
                              textAlign="left"
                              className="alerta"
                            >
                              Quiero recibir pagos en mi sitio web a través de
                            </Alert>

                            <Item elevation={0}>
                              <FormGroup>
                                {medioPago.map((medio) => (
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        name="sMedioPago"
                                        value={medio.Codigo}
                                        onChange={handleChange}
                                      />
                                    }
                                    label={medio.Descripcion}
                                  />
                                ))}
                              </FormGroup>
                            </Item>
                          </Item>
                        </Grid>
                        <Grid item xs={6}>
                          <Item elevation={0}>
                            <Alert
                              severity="info"
                              textAlign="left"
                              className="alerta"
                            >
                              Indícanos el nombre de fantasía. Corresponde al
                              nombre de tu comercio que verán tus clientes.
                            </Alert>
                            <Stack>
                              <Stack item xs={6}>
                                <Item elevation={0}>
                                  <Input
                                    name="sNombrePublico"
                                    type="text"
                                    label="Nombre de Fantasía"
                                    placeholder="ValinkPay C.A"
                                    variant="outlined"
                                    size="medium"
                                    fullWidth
                                    value={values.sNombrePublico}
                                    onChange={handleChange}
                                  />
                                </Item>
                              </Stack>
                            </Stack>

                            <Alert
                              severity="info"
                              textAlign="left"
                              className="alerta"
                            >
                              Indícanos el email de notificación, que es el que
                              ValinkPay utilizará como:
                              <br></br>- Email público: Para indicar a tus
                              clientes donde deben contactarte.
                              <br></br>- Notificación de pagos: Donde enviaremos
                              los avisos de pago realizados.
                              <br></br>- Notificación de seguridad: Donde
                              enviaremos el link de modificación de datos y el
                              link de cambio de contraseña.
                            </Alert>
                            <Stack
                              container
                              columnSpacing={{ xs: 0.5, sm: 4, md: 1 }}
                            >
                              <Stack item xs={6}>
                                <Item elevation={0}>
                                  <Input
                                    disabled
                                    name="sEmailPublico"
                                    type="email"
                                    value={usuario.sEmail}
                                    variant="outlined"
                                    size="medium"
                                    fullWidth
                                  />
                                </Item>
                              </Stack>
                            </Stack>
                            <Stack
                              direction={{ xs: "column", sm: "row" }}
                              spacing={{ xs: 1, sm: 2, md: 4 }}
                            ></Stack>
                            <Alert
                              severity="info"
                              textAlign="left"
                              className="alerta"
                            >
                              Sube el logo de tu comercio o una imagen que lo
                              represente.
                            </Alert>
                            <Stack
                              container
                              columnSpacing={{ xs: 0.5, sm: 4, md: 1 }}
                            >
                              <Stack item xs={6}>
                                <Item elevation={0}>
                                  <LogoUpload />
                                </Item>
                              </Stack>
                            </Stack>
                            <Stack
                              direction={{ xs: "column", sm: "row" }}
                              spacing={{ xs: 1, sm: 2, md: 4 }}
                            ></Stack>
                            <Alert severity="info" textAlign="left">
                              Datos Bancarios
                            </Alert>
                            <Stack>
                              <Item elevation={0}>
                                <TextField
                                  fullWidth
                                  select
                                  size="small"
                                  name="sBanco"
                                  value={values.sBanco}
                                  onChange={handleChange}
                                  SelectProps={{
                                    native: true,
                                  }}
                                >
                                  {bancos.map((option) => (
                                    <option
                                      key={option.sCodigo}
                                      value={option.sCodigo}
                                    >
                                      {option.sDescripcion}
                                    </option>
                                  ))}
                                </TextField>
                              </Item>
                              <Item elevation={0}>
                              <FormControl fullWidth>
        <InputLabel>Tipo de cuenta</InputLabel>
                                <Select
                                fullWidth
                                  label="Tipo de Cuenta"
                                  size="medium"
                                  name="sTipoCuenta"
                                  value={values.sTipoCuenta}
                                  onChange={handleChange}
                                  SelectProps={{
                                    native: true,
                                  }}
                                >
                                  {tipoCuenta.map((option) => (
                                    <MenuItem 
                                      key={option.sTipoCuenta}
                                      value={option.Codigo}
                                    >
                                      {option.Descripcion}
                                    </MenuItem>
                                  ))}
                                </Select>
                                </FormControl>
                              </Item>
                              <Item elevation={0}>
                                <Input
                                  name="sRazonSocialCuenta"
                                  label="Nombre o Razón Social de la Cuenta Bancaria"
                                  placeholder="ValinkPay C.A, Juan Perez"
                                  variant="outlined"
                                  size="medium"
                                  fullWidth
                                  value={values.sRazonSocialCuenta}
                                  onChange={handleChange}
                                />
                              </Item>
                              <Item elevation={0}>
                                <Input
                                  name="sCedulaRif"
                                  type="text"
                                  label="Cédula o RIF"
                                  placeholder="V12345678"
                                  variant="outlined"
                                  size="medium"
                                  fullWidth
                                  value={values.sCedulaRif}
                                  onChange={handleChange}
                                  prefix={<IdcardOutlined />}
                                />
                              </Item>
                              <Item elevation={0}>
                                <Input
                                  name="sNroCuentaBanco"
                                  helperText="Sin puntos ni guiones"
                                  type="number"
                                  label="Nro. de Cuenta de banco"
                                  placeholder="12345678901234567890"
                                  variant="outlined"
                                  size="medium"
                                  fullWidth
                                  value={values.sNroCuentaBanco}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  touched={touched.sNroCuentaBanco}
                                  prefix={<BankOutlined />}
                                />
                              </Item>
                              <Item elevation={0}>
                                <Input
                                  name="sConfirmarCuentaBan"
                                  helperText="Sin puntos ni guiones"
                                  type="number"
                                  label="Confirmar Nro. de Cuenta de banco"
                                  placeholder="12345678901234567890"
                                  variant="outlined"
                                  size="medium"
                                  fullWidth
                                  value={values.sConfirmarCuentaBan}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  touched={touched.sConfirmarCuentaBan}
                                  prefix={<BankOutlined />}
                                />
                              </Item>
                              <LoadingButton
                                type="submit"
                                endIcon={<SendIcon />}
                                className="btn-create-account"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                              >
                                Finalizar Registro
                              </LoadingButton>
                            </Stack>
                          </Item>
                        </Grid>
                      </Grid>
                    </Item>
                  </Grid>
                  <Grid item xs={8} md={4}>
                    <Item className="item-1-registro">
                      aca va el componente de toda la info del usuario
                    </Item>
                  </Grid>
                </Grid>
                <br></br>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </div>
  );
};

export default CompletarRegistroComponente;
