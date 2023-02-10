import React, { useState, useEffect, useRef } from "react";
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
import { Input, Select, Field, Form } from "antd";
import { Formik } from "formik";
import { Radio } from "antd";
import { Checkbox } from "antd";
import LogoUpload from "./LogoUpload";
import {
  UserOutlined,
  MailOutlined,
  IdcardOutlined,
  PhoneOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";

const CompletarRegistroComponente = () => {
  //Config del tema
  const drawerWidth = 240;

  //Datos del usuario
  const [usuario, setUsuario] = useState([]);

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
  const [selectedBanco, setSelectedBanco] = useState("");

  const handleBancoChange = (event) => {
    setSelectedBanco(event.target.value);
  };

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
  console.log(selectedEstado);

  useEffect(() => {
    async function fetchCiudades() {
      const response = await axios.get(
        `https://valink-pay-api.vercel.app/formulario/lista/ciudades?estado=${selectedEstado}`,
        {}
      );
      console.log(response)
      setCiudad(response.data);
    }
    fetchCiudades();
  }, [selectedEstado]);

  console.log(ciudad);

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
              onCambio,
              setFieldValue,
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
                  TUS DATOS
                </Typography>

                <div className="espaciador-amarillo-largo"></div>

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
                                    placeholder="Cedula"
                                    name="sCedula"
                                    fullWidth
                                    label="Cedula o Rif"
                                    type="text"
                                    size="medium"
                                    value={values.sCedula}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    touched={touched.sCedula}
                                    prefix={<IdcardOutlined />}
                                  />
                                </Item>
                                {errors.sCedula && touched.sCedula && (
                                  <div className="input-feedback">
                                    {errors.sCedula}
                                  </div>
                                )}
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
                                    prefix={<MailOutlined />}
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
                                    size="small"
                                    value={values.sEstado}
                                    onChange={handleEstadoChange}
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
                                      size="small"
                                      value={values.sCiudad}
                                      onChange={handleChange}
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
                                <Item elevation={0}>municipio</Item>
                              </Grid>
                              <Grid item xs={6}>
                                <Item elevation={0}>
                                  <Input
                                    name="sDireccion"
                                    type="text"
                                    label="Dirección"
                                    placeholder="Av. Principal, Edificio 1, Piso 1, Oficina 1"
                                    size="default size"
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
                                    required
                                    name="sNombreReprLegal"
                                    type="text"
                                    label="Nombre del Representante Legal"
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
                            <Grid
                              container
                              columnSpacing={{ xs: 0.5, sm: 4, md: 1 }}
                            >
                              <Grid item xs={6}>
                                <Item elevation={0}>
                                  <Checkbox.Group
                                    type="checkbox"
                                    style={{ width: "200%" }}
                                    name="sMedioPago"
                                  >
                                    <Row>
                                      <Col span={8}>
                                        <Checkbox value="TDD">
                                          Tarjeta de crédito
                                        </Checkbox>
                                      </Col>
                                      <Col span={8}>
                                        <Checkbox value="TDC">
                                          Tarjeta de débito
                                        </Checkbox>
                                      </Col>
                                      <Col span={8}>
                                        <Checkbox value="PM">
                                          Pago Móvil
                                        </Checkbox>
                                      </Col>
                                    </Row>
                                  </Checkbox.Group>
                                </Item>
                              </Grid>
                            </Grid>
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
                                      key={option.value}
                                      value={option.sCodigo}
                                    >
                                      {option.sDescripcion}
                                    </option>
                                  ))}
                                </TextField>
                              </Item>
                              <Item elevation={0}>
                                <Radio.Group
                                  className="radio-group-completar-registro"
                                  onChange={handleChange}
                                  name="sTipoPersona"
                                >
                                  <Radio value="ahorro">Ahorro</Radio>
                                  <Radio value="corriente">Corriente</Radio>
                                </Radio.Group>
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
