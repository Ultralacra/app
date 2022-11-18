import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import "./CompletarRegistroComponente.css";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import FormCompletarRegistro from "./FormCompletarRegistro";
import FormCompletarRegistro2 from "./FormCompletarRegistro2";
import Divider from "@mui/material/Divider";


const CompletarRegistroComponente = () => {
  const [usuario, setUsuario] = useState([]);

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
      <Container>
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

        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs>
            <Item
              className="item-1-registro"
              sx={{
                backgroundColor: "##E6F6FF",
              }}
            >
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
              <br></br>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item className="item-1-registro" >
              <FormCompletarRegistro />
            </Item>
          </Grid>
          <Grid item xs>
           <Item className="item-1-registro" >
           
              <FormCompletarRegistro2 />
            </Item>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CompletarRegistroComponente;
