import * as React from "react";
import "./InfoPrimaria.css";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Button, CssBaseline, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import WorkIcon from "@mui/icons-material/Work";
import ImageIcon from "@mui/icons-material/Image";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import LoadingButton from "@mui/lab/LoadingButton";
import StorefrontIcon from '@mui/icons-material/Storefront';
import SellIcon from '@mui/icons-material/Sell';
import PaymentIcon from '@mui/icons-material/Payment';

console.log();

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
      <Container>
        <br></br>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid className="grid-box" xs={6}>
              <Item elevation={0}>
                <Typography className="titulo">
                  <h1>Te ayudamos a vender por internet.</h1>
                </Typography>
                <Typography className="subtitulo">
                  <p>
                    Si buscas aumentar tus ingresos vendiendo a través de tu
                    sitio web con carrito de compra, ¡ValinkPay es el producto
                    para ti!
                  </p>
                </Typography>
                <Button
                  //
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

          <Grid>
            <Stack>
              <Item elevation={0} className="box-shadow">
                <Item elevation={0} >
                  <Typography mt={5} className="titulo-2">
                    <h1>¿Qué es ValinkPay?</h1>
                  </Typography>
                  <Typography>
                    <p>
                      Es una pasarela de pago para realizar transacciones en
                      línea con tarjetas de débito, prepago y <br></br>
                      crédito de manera eficaz y segura.
                    </p>
                  </Typography>
                  <Divider
                    sx={{
                      width: "20%",
                      height: 1,
                      backgroundColor: "#006D8E",
                      margin: "auto",
                      marginBottom: "5rem",
                      marginTop: "2rem",
                    }}
                  />
                  <Grid
                    container
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                    <Grid item xs={6}>
                      <Item elevation={0}>
                        <img
                          src="https://publico.transbank.cl/documents/20129/0/thumb-quees.png/ddc97b19-c80d-fef2-9bac-ba62bdc24940?t=1662085910717&download=true"
                          alt="logo"
                          width="60%"
                        />
                      </Item>
                    </Grid>
                    <Grid item xs={6}>
                      <Item elevation={0} >
                        <List
                          sx={{
                            width: "100%",
                            maxWidth: 360,
                            bgcolor: "background.paper",
                          }}
                        >
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <PaymentIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary="Paga solo por lo que vendes."
                              secondary="No pagarás mensualidades fijas, solo las comisiones asociadas a cada venta."
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <StorefrontIcon />
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
                                <SellIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary="Vende en línea con la seguridad de ValinkPay."
                              secondary="Ofrece a tus clientes transacciones seguras y protégete de fraudes con nuestra tecnología."
                            />
                          </ListItem>
                        </List>
                        <Stack
  direction={{ xs: 'column', sm: 'row' }}
  spacing={{ xs: 1, sm: 2, md: 4 }}
>
  <Item  
  elevation={0}
  >

    <LoadingButton
    variant="outlined"
    className="btn-contacten"
    fullWidth
    
    >
      Quiero que me contacten
    </LoadingButton>

  </Item>
  <Item  elevation={0}>
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
        </Box>
      </Container>
    </>
  );
}
