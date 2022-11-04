import * as React from "react";
import "./InfoPrimaria.css";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Button, CssBaseline, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SellIcon from "@mui/icons-material/Sell";
import PaymentIcon from "@mui/icons-material/Payment";
import TabsHome from "../Tabs/TabsHome";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function RowAndColumnSpacing() {
  return (
    <>
      <Container maxWidth="lg" className="box-1">
        <Grid
          sx={{ padding: 2 }}
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid className="grid-box" xs={6}>
            <Item elevation={0}
            
            >
              <Typography className="titulo">
                <h1>Te ayudamos a vender por internet.</h1>
              </Typography>
              <Typography className="subtitulo">
                <p>
                  Si buscas aumentar tus ingresos vendiendo a través de tu sitio
                  web con carrito de compra, ¡ValinkPay es el producto para ti!
                </p>
              </Typography>
              <Button
                className="btn-home-saber-mas  btn-login"
                variant="contained"
              >
                Quiero saber más
              </Button>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item elevation={0}>
              <img
                src="http://valinkgroup.com/wp-content/uploads/2022/10/header-webpayplus.png"
                alt="logo"
                width="100%"
              />
            </Item>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="xl" className="container-2">
        <Grid className="grid-2">
          <Stack className="container-2">
            <Item elevation={0} className="container-2">
              <Item elevation={0} className="container-2">
                <Typography mt={3} className="titulo-2">
                  <h1>¿Qué es ValinkPay?</h1>
                </Typography>
                <Typography className="subtitulo-2">
                  <p>
                    Es una pasarela de pago para realizar transacciones en línea
                    con tarjetas de débito, prepago y <br></br>
                    crédito de manera eficaz y segura.
                  </p>
                </Typography>

                <div className="espaciador-azul"></div>
                <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
                  <Grid
                    item
                    xs={6}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Item  elevation={0} className="container-2"
                    
                    >
                      <img
                        src="https://publico.transbank.cl/documents/20129/0/thumb-quees.png/ddc97b19-c80d-fef2-9bac-ba62bdc24940?t=1662085910717&download=true"
                        alt="logo"
                        width="60%"
                        alignItems="right"
                      />
                    </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item elevation={0} className="container-2">
                      <List
                         className="container-2 info-list-vp"
                        sx={{
                          width: "100%",
                          
                          bgcolor: "background.paper",
                        }}
                      >
                        <ListItem className="list-items-3" >
                          <ListItemAvatar>
                            <Avatar>
                              <PaymentIcon className="icons-services-1" />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                          className=""
                            primary="Paga solo por lo que vendes."
                            secondary="No pagarás mensualidades fijas, solo las comisiones asociadas a cada venta."
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <StorefrontIcon className="icons-services-1" />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Integra en tu sitio web."
                            secondary="Integra la pasarela de pago a tu proceso de compra en tu sitio web. ¡Puedes optar por integrarlo por tu cuenta o con nuestro apoyo!"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <SellIcon className="icons-services-1" />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Vende en línea con la seguridad de ValinkPay."
                            secondary="Ofrece a tus clientes transacciones seguras y protégete de fraudes con nuestra tecnología."
                          />
                        </ListItem>
                      </List>
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                      >
                        <Item elevation={0} className="container-2">
                          <LoadingButton
                            variant="outlined"
                            className="btn-contacten"
                            fullWidth
                          >
                            Quiero que me contacten
                          </LoadingButton>
                        </Item>
                        <Item elevation={0} className="container-2">
                          <LoadingButton
                            fullWidth
                            className="btn-contratar"
                            variant="contained"
                          >
                            Contratar ValinkPay
                          </LoadingButton>
                        </Item>
                      </Stack>
                    </Item>
                  </Grid>
                </Grid>
              </Item>
            </Item>
          </Stack>
        </Grid>
      </Container>

      <Container
        fixed
        sx={{
          backgroundColor: "white",
          color: "#fff",
          padding: "2rem",
          marginTop: "2rem",
        }}
      >
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={6}>
            <Item elevation={0}>
              <Typography className="titulo-3">
                <h1>¿Qué beneficios tiene ValinkPay para mí y mis clientes?</h1>
                <div className="espaciador-azul-2"></div>
                <img
                  src="https://publico.transbank.cl/documents/20129/0/Ilustracion+04+%281%29.webp/180198e7-2c59-cbb5-a9db-204e4b74a873?t=1661555290480&download=true"
                  alt="logo"
                  width="75%"
                />
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item elevation={0}>
              <TabsHome />
            </Item>
          </Grid>
        </Grid>
      </Container>

      <Container
        fixed
        sx={{
          backgroundColor: "white",
          color: "#fff",
          padding: "2rem",
          marginTop: "2rem",
        }}
      >
        <Grid
          container
          columns={{ xs: 4, sm: 8, md: 12 }}
          direction="row"
          justifyContent="space-evenly"
          alignItems="stretch"
        >
          <Grid item xs={6}>
            <Item elevation={0}>
              <Typography className="titulo-3">
                <h1>
                  Recibe pagos desde tu sitio web con el respaldo de seguridad
                  de ValinkPay.
                </h1>
                <Typography textAlign="left">
                  <p>
                    ¡Olvídate de las transferencias! Tus clientes podrán optar a
                    la posibilidad de pagar desde tu sitio web con tarjetas de
                    débito y crédito ¡y en muy pocos pasos!
                  </p>
                </Typography>
                <div className="espaciador-azul-3"></div>
                <img
                  src="https://publico.transbank.cl/documents/20129/0/valor-comision-thumb.png/5c245c94-212b-db56-c8d8-0ccf39a92499?t=1662085949341&download=true"
                  alt="logo"
                  width="65%"
                />
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item
              flexItem
              elevation={20}
              sx={{
                alignItems: "stretch",
                padding: "2rem",
                borderRadius: "10px",
              }}
            >
              <img
                src="http://valinkgroup.com/wp-content/uploads/2022/05/Negro.png"
                alt="logo"
                width="30%"
              />
              <Typography
                sx={{
                  color: "#ffb200",
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              >
                Solo pagas comision <br></br> por cada venta
              </Typography>
              <Divider
                sx={{
                  margin: "auto",
                  borderRadius: "4px",
                  width: "20%",
                  marginBottom: "1rem",
                  marginTop: "1rem",
                  color: "black",
                }}
              />
              <div>
                <ul className="list-info">
                  <li>
                    <CheckCircleOutlineIcon className="icono-check-2" />
                    No pagarás mensualidades fijas, solo las comisiones
                    asociadas a cada venta.
                  </li>
                  <li>
                    {" "}
                    <CheckCircleOutlineIcon className="icono-check-2" />
                    Integra la pasarela de pago a tu proceso de compra en tu
                    sitio web.
                  </li>
                  <li>
                    {" "}
                    <CheckCircleOutlineIcon className="icono-check-2" />
                    Accede a toda la información de tus ventas a través de
                    nuestro Portal de Clientes.
                  </li>
                  <li>
                    {" "}
                    <CheckCircleOutlineIcon className="icono-check-2" />
                    Vende tranquilo por internet gracias a los altos estándares
                    de seguridad de ValinkPay.
                  </li>
                </ul>
              </div>

              <LoadingButton
                fullWidth
                className="btn-contratar"
                variant="contained"
              >
                Quiero que me llamen
              </LoadingButton>
              <br />
              <LoadingButton
                fullWidth
                className="btn-llamar"
                variant="contained"
              >
                Contratar ValinkPay
              </LoadingButton>
            </Item>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
