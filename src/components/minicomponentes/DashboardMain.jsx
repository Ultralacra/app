import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import "./DashboardMain.css";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { AlertCompleteForm } from "../usercompletecomponentes/AlertCompleteForm";

const DashboardMain = () => {
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
      console.log(usuario);
    }
    fetchData();
  }, []);

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
      <Container>
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
              fontSize="20px"
              mb={2}
            >
              DASHBOARD
            </Typography>
            <AlertCompleteForm />
            <div className="espaciador-amarillo-largo"></div>
          </Container>
        </Box>
      </Container>
    </div>
  );
};

export default DashboardMain;
