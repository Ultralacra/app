import React, { useState, useEffect } from "react";
import { Form, Alert, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreditCardForm.css";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { Input, Select, Typography } from "antd";
import Button from "@mui/material/Button";
import { Radio } from "antd";
import Swal from "sweetalert2";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CreditCardForm = () => {
  const [values, setValues] = useState({
    card_name: "",
    card_number: "",
    card_Expiration: "",
    bank_name: "",
    focus: "",
    id_cliente: "28",
    secret_key:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3OSwiY2VkdWxhIjoiMTIzNDU2NzgiLCJpYXQiOjE2NzU0MzI4NzYsImV4cCI6MTY3NTQzMjg3Nn0.ruvwSzAxvhILbeaLuKs8iF7gsyJAmrRMUgRymjvfOhM",
    ipaddress: "",
    browser_agent: "",
    manufacturer: "Samsung",
    model: "",
    os_version: "",
    lat: null,
    lng: null,
    customer_id: "",
    account_type: "",
    twofactor_auth: "",
    cvv: "",
    amount: 99999999999.11,
  });

  useEffect(() => {
    async function getData() {
      // Recopila la dirección IP
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      const { ip } = data;

      // Recopila la longitud y latitud
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const { latitude, longitude } = position.coords;

      // Recopila información sobre el navegador y sistema operativo
      const userAgent = navigator.userAgent;
      const os = navigator.oscpu || "Unknown OS";
      const manufacturer = window.navigator.vendor;
      const model = navigator.platform;
      //

      setValues((prevValues) => ({
        ...prevValues,
        ipaddress: ip,
        lat: latitude,
        lng: longitude,
        browser_agent: userAgent,
        os_version: os,
        manufacturer,
        model,
      }));
    }

    getData();
  }, []);

  //LLamar lista de bancos
  const [bancos, setBancos] = useState([]);
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

  const [errors, setErrors] = useState({});

  const handleFocus = (e) => {
    setValues({
      ...values,
      focus: e.target.name === "twofactor_auth" ? "cvc" : e.target.name,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://valink-pay-api.vercel.app/transaccion/registrar-transaccion",

        values,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: JSON.parse(localStorage.getItem("token")),
          },
        }
      )
      .then((res) => {
        if (res.data.message === "Banco no configurado") {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "error",
            title: "El banco no se encuentra configurado",
            showConfirmButton: false,
            timer: 1500,
          });
        } else if (res.data.message === "El cliente no existe") {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "error",
            title: "El cliente no existe",
            showConfirmButton: false,
            timer: 1500,
          });
        } else if (res.data.estatus === "success") {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Transaccion exitosa",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        console.log(res);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(values);
  };

  return (
    <>
      <img
        src="http://valinkgroup.com/wp-content/uploads/2022/05/Negro.png"
        alt="logo valink"
        style={{
          width: "15%",
          height: "15%",
          marginRight: "80%",
          marginTop: "2%",
          marginBottom: "2%",
        }}
      ></img>

      <Stack spacing={2}>
        <Item className="caja-pago" elevation={0}>
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid xs={6}>
                <Item elevation={0}>
                <div
                className="tarjeta-pago"
                >
                    <Cards
                      cvc={values.cvv}
                      expiry={values.card_Expiration}
                      focused={values.focus}
                      name={values.card_name}
                      number={values.card_number}
                    />
                  </div>
                  <Stack
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="left"
                    spacing={0}
                  >
                    
                    <Item elevation={0}>
                      
                      <Typography className="titulos-pago">
                        Estas pagando a:
                      </Typography>
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Farmatodo_logo.svg/2560px-Farmatodo_logo.svg.png"
                        alt="Logo"
                        width={250}
                      />
                    </Item>
                    <Item elevation={0}>
                      <Typography className="titulos-pago">
                        monto a pagar:
                      </Typography>
                      <h3 className="titulos-pago">5.250 VES</h3>
                    </Item>
                  </Stack>
                </Item>
              </Grid>
              <Grid xs={6}>
                <Item elevation={0}>
                  
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Input
                            className="input-card"
                            style={{
                              width: "100%",
                              marginBottom: "10px",
                              marginTop: "10px",
                            }}
                            size="large"
                            type="text"
                            name="card_name"
                            placeholder="Nombre del titular de la tarjeta"
                            value={values.card_name}
                            onChange={handleChange}
                            onFocus={handleFocus}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Input
                            className="input-card"
                            style={{
                              width: "100%",
                              marginBottom: "10px",
                              marginTop: "10px",
                            }}
                            size="large"
                            type="text"
                            name="customer_id"
                            placeholder="Cedula del titular de la tarjeta"
                            value={values.customer_id}
                            onChange={handleChange}
                            onFocus={handleFocus}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group>
                      <Input
                        className="input-card"
                        style={{
                          width: "100%",
                          marginBottom: "10px",
                          marginTop: "10px",
                        }}
                        size="large"
                        type="number"
                        name="card_number"
                        placeholder="Numero de tarjeta  "
                        value={values.card_number}
                        onChange={handleChange}
                        onFocus={handleFocus}
                      />
                    </Form.Group>
                    <Row>
                      {/*  <Select
                        size="large"
                        name="bank_name"
                        onChange={handleChange}
                        onFocus={handleFocus}
                        style={{ textAlign: "left" }}
                        placeholder="Seleccione un Banco"
                      >
                        {bancos.map((banco) => (
                          <options value={banco.sCodigo}>
                            {banco.sDescripcion}
                          </options>
                        ))}
                      </Select> */}
                      <Col>
                        <Form.Group>
                          <Radio.Group
                            size="large"
                            className="radio-group-completar-registro"
                            onChange={handleChange}
                            name="account_type"
                            value={values.account_type}
                            onFocus={handleFocus}
                          >
                            <Radio value="DC">Debito</Radio>
                            <Radio value="CC">Credito</Radio>
                          </Radio.Group>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Input
                            className="input-card"
                            size="large"
                            style={{
                              width: "100%",
                              marginBottom: "10px",
                              marginTop: "10px",
                            }}
                            type="text"
                            name="card_Expiration"
                            placeholder="fecha de expiracion"
                            value={values.card_Expiration}
                            onChange={handleChange}
                            onFocus={handleFocus}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Input
                            className="input-card"
                            size="large"
                            style={{
                              width: "100%",
                              marginBottom: "10px",
                              marginTop: "10px",
                            }}
                            type="number"
                            name="cvv"
                            placeholder="CVV"
                            value={values.cvv}
                            onChange={handleChange}
                            onFocus={handleFocus}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Input
                            className="input-card"
                            size="large"
                            style={{
                              width: "100%",
                              marginBottom: "10px",
                              marginTop: "10px",
                            }}
                            type="text"
                            name="twofactor_auth"
                            placeholder="Codigo de verificacion de telefono"
                            value={values.twofactor_auth}
                            onChange={handleChange}
                            onFocus={handleFocus}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button
                      sx={{
                        mb: 2,
                        mt: 2,
                        borderColor: "#FFC107",
                        borderRadius: "4px",
                        color: "#000000",
                        backgroundColor: "#FFC107",
                        "&:hover": {
                          backgroundColor: "#FFC107",
                          color: "#000000",
                        },
                      }}
                      variant="outlined"
                      color="primary"
                      type="submit"
                      fullWidth
                    >
                      Pagar
                    </Button>
                  </Form>
                </Item>
              </Grid>
            </Grid>
          </Box>
        </Item>
      </Stack>
    </>
  );
};

export default CreditCardForm;
