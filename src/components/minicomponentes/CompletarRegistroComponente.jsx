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
import { Input, Tooltip } from "antd";
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
import { FormControlLabel, Checkbox, FormGroup } from "@mui/material";
import { AlertCompleteForm } from "../usercompletecomponentes/AlertCompleteForm";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";

const CompletarRegistroComponente = () => {
  //Config del tema
  const drawerWidth = 240;

  //open loading
  const [open, setOpen] = useState(false);
  //Datos del usuario
  const [usuario, setUsuario] = useState([]);

  //quitar las comillas del token
  const token = localStorage.getItem("token").replace(/['"]+/g, "");

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
  console.log(usuario);

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
              //validar si es persona natural o juridica
              if (!values.sTipoPersona) {
                errors.sTipoPersona = "Campo requerido";
              }
              //validar numero de cedula o rif sin espacios ni caracteres especiales
              if (!values.sCedulaRif) {
                errors.sCedulaRif = "Campo requerido";
              } else if (!/^[0-9]{1,10}$/.test(values.sCedulaRif)) {
                errors.sCedulaRif =
                  "El numero de cedula o rif solo puede contener numeros";
              }
              //cedula o rif
              if (!values.sCedula) {
                errors.sCedula = "Campo requerido";
              } else if (!/^[0-9]{1,10}$/.test(values.sCedula)) {
                errors.sCedula =
                  "El numero de cedula o rif solo puede contener numeros";
              }
              //cedula o rif representante legal
              if (!values.sCedulaReprLegal) {
                errors.sCedulaReprLegal = "Campo requerido";
              } else if (!/^[0-9]{1,10}$/.test(values.sCedulaReprLegal)) {
                errors.sCedulaReprLegal =
                  "El numero de cedula o rif solo puede contener numeros";
              }
              //validar razon social o nombre de la empresa solo permitir el caracter & y espacios
              if (!values.sRazonSocialCuenta) {
                errors.sRazonSocialCuenta = "Campo requerido";
              } else if (
                !/^[a-zA-ZÀ-ÿ0-9\s&]{1,40}$/.test(values.sRazonSocialCuenta)
              ) {
                errors.sRazonSocialCuenta =
                  "La razon social solo puede contener letras, numeros, espacios y el caracter &";
              }
              // validar razon social o nombre de la empresa solo permitir el caracter & y espacios
              if (!values.sRazonSocial) {
                errors.sRazonSocial = "Campo requerido";
              } else if (
                !/^[a-zA-ZÀ-ÿ0-9\s&]{1,40}$/.test(values.sRazonSocial)
              ) {
                errors.sRazonSocial =
                  "La razon social solo puede contener letras, numeros, espacios y el caracter &";
              }
              //validar sitio web
              if (!values.sSitioWeb) {
                errors.sSitioWeb = "Campo requerido";
              } else if (
                !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(
                  values.sSitioWeb
                )
              ) {
                errors.sSitioWeb = "El sitio web no es valido";
              }
              //validar telefono asociado puede tener 20 numeros maximo
              if (!values.sTelefonoAsociado) {
                errors.sTelefonoAsociado = "Campo requerido";
              } else if (!/^[0-9]{1,20}$/.test(values.sTelefonoAsociado)) {
                errors.sTelefonoAsociado =
                  "El telefono solo puede contener numeros";
              }
              //validar telefono asociado puede tener 20 numeros maximo
              if (!values.sTelefonoReprLegal) {
                errors.sTelefonoReprLegal = "Campo requerido";
              } else if (!/^[0-9]{1,20}$/.test(values.sTelefonoReprLegal)) {
                errors.sTelefonoReprLegal =
                  "El telefono solo puede contener numeros";
              }

              //validar telefono asociado puede tener 20 numeros maximo
              if (!values.sTelefonoContacto) {
                errors.sTelefonoContacto = "Campo requerido";
              } else if (!/^[0-9]{1,20}$/.test(values.sTelefonoContacto)) {
                errors.sTelefonoContacto =
                  "El telefono solo puede contener numeros";
              }
              //validar direccion sin caracteres especiales
              if (!values.sDireccion) {
                errors.sDireccion = "Campo requerido";
              } else if (!/^[a-zA-ZÀ-ÿ0-9\s&]{1,40}$/.test(values.sDireccion)) {
                errors.sDireccion =
                  "La direccion solo puede contener letras, numeros, espacios y el caracter &";
              }

              //validar correo electronico
              if (!values.sEmailContacto) {
                errors.sEmailContacto = "Campo requerido";
              } else if (
                !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                  values.sEmailContacto
                )
              ) {
                errors.sEmailContacto = "Por favor ingrese un email válido";
              }
              //validar correo electronico
              if (!values.sEmailReprLegal) {
                errors.sEmailReprLegal = "Campo requerido";
              } else if (
                !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                  values.sEmailReprLegal
                )
              ) {
                errors.sEmailReprLegal = "El correo electronico no es valido";
              }
              //validar Checkboxes
              if (!values.sMedioPago) {
                errors.sMedioPago = "Campo requerido";
              }
              // validar que los numeros de cuenta sean solo numeros y coincidan los 2 campos

              if (!values.sNroCuentaBanco) {
                errors.sNroCuentaBanco = "Campo requerido";
              } else if (!/^[0-9]{1,24}$/.test(values.sNroCuentaBanco)) {
                errors.sNroCuentaBanco =
                  "El numero de cuenta solo puede contener numeros";
              }

              if (!values.sConfirmarCuentaBan) {
                errors.sConfirmarCuentaBan = "Campo requerido";
              } else if (!/^[0-9]{1,24}$/.test(values.sConfirmarCuentaBan)) {
                errors.sConfirmarCuentaBan =
                  "El numero de cuenta solo puede contener numeros";
              }
              if (values.sNroCuentaBanco !== values.sConfirmarCuentaBan) {
                errors.sConfirmarCuentaBan =
                  "Los numeros de cuenta no coinciden";
              }

              if (!values.sNombrePublico) {
                errors.sNombrePublico = "Campo requerido";
              } else if (
                !/^[a-zA-ZÀ-ÿ0-9\s&]{1,40}$/.test(values.sNombrePublico)
              ) {
                errors.sNombrePublico =
                  "Solo puede contener letras, numeros, espacios y el caracter &";
              }

              return errors;
            }}
            onSubmit={async (lols, { setSubmitting }) => {
              axios
                .post(
                  "https://valink-pay-api.vercel.app/clientes/completarregistro",
                  {
                   sUserId: JSON.parse(localStorage.getItem("id")),
                    sTipoPersona: lols.sTipoPersona,
                    sCedula: lols.sCedula,
                    sRazonSocial: lols.sRazonSocial,
                    sSitioWeb: lols.sSitioWeb,
                    sTelefonoAsociado: lols.sTelefonoAsociado,
                    sCategoriaRubro: lols.sCategoriaRubro,
                    sRubro: lols.sRubro,
                    sEstado: lols.sEstado,
                    sCiudad: lols.sCiudad,
                    sMunicipio: lols.sMunicipio,
                    sDireccion: lols.sDireccion,
                    sActividadEcon: lols.sActividadEcon,
                    sNombreReprLegal: lols.sNombreReprLegal,
                    sCedulaReprLegal: lols.sCedulaReprLegal,
                    sTelefonoReprLegal: lols.sTelefonoReprLegal,
                    sEmailReprLegal: lols.sEmailReprLegal,
                    sNombreContacto: lols.sNombreContacto,
                    sTelefonoContacto: lols.sTelefonoContacto,
                    sEmailContacto: lols.sEmailContacto,
                    sNombrePublico: lols.sNombrePublico,
                    sEmailPublico: usuario.sEmail,
                    sUrlLogo: lols.sUrlLogo,
                    sTipoCuenta: lols.sTipoCuenta,
                    sBanco: lols.sBanco,
                    sCedulaRif: lols.sCedulaRif,
                    sNroCuentaBanco: lols.sNroCuentaBanco,
                    sConfirmarCuentaBan: lols.sConfirmarCuentaBan,
                    sMedioPago: lols.sMedioPago,
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                      authorization: token,
                    },
                  }
                )
                .then((res) => {
                  if (res.data.message === "El usuario no existe") {
                    Swal
                      .fire({
                        toast: true,
                        position: "top-end",
                        icon: "error",
                        title: "El usuario no existe",
                        showConfirmButton: false,
                        timer: 3000,
                      })
                      .then(() => {
                      }
                      );
                  } else if (res.data.message === "Este usuario ya tiene un perfil creado") {

                    Swal  
                      .fire({
                        toast: true,
                        position: "top-end",
                        icon: "error",
                        title: "Este usuario ya tiene un perfil creado",
                        showConfirmButton: false,
                        timer: 3000,
                      })
                      .then(() => {
                      }

                      );
                  } else
                    Swal
                      .fire({
                        toast: true,
                        position: "top-end",
                        icon: "success",
                        title: "Registro completado con exito",
                        showConfirmButton: false,
                        timer: 3000,
                      })
                      .then(() => {
                      });

                  console.log(res.data);
                })
                .catch((err) => {
                  console.log(err);
                });
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
                {console.log(values)}
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
                <Grid>
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
                              value={values.sTipoPersona}
                              onBlur={handleBlur}
                              touched={touched.sTipoPersona}
                            >
                              <Radio value="natural">natural</Radio>
                              <Radio value="juridica">juridica</Radio>
                            </Radio.Group>
                            {errors.sTipoPersona && touched.sTipoPersona && (
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
                                {errors.sTipoPersona}
                              </Typography>
                            )}
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
                                    onBlur={handleBlur}
                                    touched={touched.sCedula}
                                    prefix={<IdcardOutlined />}
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
                                  {touched.sCedula && errors.sCedula && (
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
                                      {errors.sCedula}
                                    </Typography>
                                  )}
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
                                    onBlur={handleBlur}
                                    touched={touched.sRazonSocial}
                                  />
                                  {touched.sRazonSocial &&
                                    errors.sRazonSocial && (
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
                                        {errors.sRazonSocial}
                                      </Typography>
                                    )}
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
                                    onBlur={handleBlur}
                                    touched={touched.sSitioWeb}
                                    suffix={
                                      <Tooltip title="el sitio web debe comenzar con www.">
                                        <InfoCircleOutlined
                                          style={{
                                            color: "rgba(0,0,0,.45)",
                                          }}
                                        />
                                      </Tooltip>
                                    }
                                  />
                                  {touched.sSitioWeb && errors.sSitioWeb && (
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
                                      {errors.sSitioWeb}
                                    </Typography>
                                  )}
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
                                    onBlur={handleBlur}
                                    touched={touched.sTelefonoAsociado}
                                    prefix={<PhoneOutlined />}
                                  />
                                  {touched.sTelefonoAsociado &&
                                    errors.sTelefonoAsociado && (
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
                                        {errors.sTelefonoAsociado}
                                      </Typography>
                                    )}
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
                                      required
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
                                      required
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
                                    required
                                    name="sDireccion"
                                    type="text"
                                    label="Dirección"
                                    placeholder="Av. Principal, Edificio 1, Piso 1, Oficina 1"
                                    size="large"
                                    value={values.sDireccion}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    touched={touched.sDireccion}
                                  />
                                  {touched.sDireccion && errors.sDireccion && (
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
                                      {errors.sDireccion}
                                    </Typography>
                                  )}
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
                                    touched={touched.sCedulaReprLegal}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    prefix={<IdcardOutlined />}
                                  />
                                </Item>
                                {touched.sCedulaReprLegal &&
                                  errors.sCedulaReprLegal && (
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
                                      {errors.sCedulaReprLegal}
                                    </Typography>
                                  )}
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
                                    onBlur={handleBlur}
                                    touched={touched.sTelefonoReprLegal}
                                    prefix={<PhoneOutlined />}
                                  />
                                  {touched.sTelefonoReprLegal &&
                                    errors.sTelefonoReprLegal && (
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
                                        {errors.sTelefonoReprLegal}
                                      </Typography>
                                    )}
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
                                    onBlur={handleBlur}
                                    touched={touched.sEmailReprLegal}
                                    prefix={<MailOutlined />}
                                  />
                                  {touched.sEmailReprLegal &&
                                    errors.sEmailReprLegal && (
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
                                        {errors.sEmailReprLegal}
                                      </Typography>
                                    )}
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
                                    onBlur={handleBlur}
                                    touched={touched.sTelefonoContacto}
                                  />
                                  {touched.sTelefonoContacto &&
                                    errors.sTelefonoContacto && (
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
                                        {errors.sTelefonoContacto}
                                      </Typography>
                                    )}
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
                                    onBlur={handleBlur}
                                    touched={touched.sEmailContacto}
                                    prefix={<MailOutlined />}
                                  />
                                  {touched.sEmailContacto &&
                                    errors.sEmailContacto && (
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
                                        {errors.sEmailContacto}
                                      </Typography>
                                    )}
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
                                        onBlur={handleBlur}
                                        touched={touched.sMedioPago}
                                      />
                                    }
                                    label={medio.Descripcion}
                                  />
                                ))}
                                {touched.sMedioPago && errors.sMedioPago && (
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
                                    {errors.sMedioPago}
                                  </Typography>
                                )}
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
                                    onBlur={handleBlur}
                                    touched={touched.sNombrePublico}
                                  />
                                  {touched.sNombrePublico &&
                                    errors.sNombrePublico && (
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
                                        {errors.sNombrePublico}
                                      </Typography>
                                    )}
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
                                <FormControl fullWidth>
                                  <InputLabel>Banco</InputLabel>
                                  <Select
                                    fullWidth
                                    required
                                    select
                                    label="Banco"
                                    size="medium"
                                    name="sBanco"
                                    value={values.sBanco}
                                    onChange={handleChange}
                                    SelectProps={{
                                      native: true,
                                    }}
                                  >
                                    {bancos.map((option) => (
                                      <MenuItem
                                        key={option.sCodigo}
                                        value={option.sCodigo}
                                      >
                                        {option.sDescripcion}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Item>
                              <Item elevation={0}>
                                <FormControl fullWidth>
                                  <InputLabel>Tipo de cuenta</InputLabel>
                                  <Select
                                    fullWidth
                                    required
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
                                  onBlur={handleBlur}
                                  touched={touched.sRazonSocialCuenta}
                                />
                                {touched.sRazonSocialCuenta &&
                                  errors.sRazonSocialCuenta && (
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
                                      {errors.sRazonSocialCuenta}
                                    </Typography>
                                  )}
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
                                  onBlur={handleBlur}
                                  touched={touched.sCedulaRif}
                                />
                              </Item>
                              {touched.sCedulaRif && errors.sCedulaRif && (
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
                                  {errors.sCedulaRif}
                                </Typography>
                              )}
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
                                {touched.sNroCuentaBanco &&
                                  errors.sNroCuentaBanco && (
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
                                      {errors.sNroCuentaBanco}
                                    </Typography>
                                  )}
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
                                {touched.sConfirmarCuentaBan &&
                                  errors.sConfirmarCuentaBan && (
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
                                      {errors.sConfirmarCuentaBan}
                                    </Typography>
                                  )}
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
