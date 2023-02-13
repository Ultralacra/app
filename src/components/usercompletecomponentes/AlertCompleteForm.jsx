import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";

export const AlertCompleteForm = () => {
  const [infoUser, setInfoUser] = useState({});

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
      setInfoUser(response.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      {infoUser.iProfileId === 0 ? (
        <Alert
        variant="filled"
        severity="warning"
        sx={{ width: "100%", textAlign: "left" }}
        >
          Estimado usuario, para poder utilizar todas las funcionalidades de la plataforma, debe completar su perfil. Para 
            ello, debe dirigirse a la sección "Completar Registro" y completar los campos que se le solicitan.
        </Alert>
      ) : (
        <Alert 
        variant="filled"
        severity="success">Perfil completo</Alert>
      )}
    </div>
  );
};
