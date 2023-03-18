import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import "./AlertCompleteForm.css";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Skeleton from "@mui/material/Skeleton";

export const AlertCompleteForm = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const [infoUser, setInfoUser] = useState({});
  const ID_USER = JSON.parse(localStorage.getItem("id"));
  const [loading, setLoading] = useState(true); // Nuevo estado para el esqueleto

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

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const loadingSkeleton = () => {
    return (
      <Box sx={{ width: "100%" }}>
        <Stack spacing={2} className="box-complete-form">
          <Item elevation={0} sx={{}}>
            <Alert
            
              sx = {{
                bgcolor: "#F2F2F2",
                color: "#ADAEB1",
                borderRadius: 2,
                

              }}
                icon = {false}
            >
              <Typography>
                <Skeleton 
                variant="text"
                width={200}
                animation="wave"
                />
              </Typography>
              <Typography>
                <Skeleton
                  variant="text"
                  width={200}
                  animation="wave"


                />
              </Typography>
              <LoadingButton>
                <Skeleton variant="" 
                width={200}
                animation="wave"
                
                />
              </LoadingButton>
            </Alert>

            <Alert
        icon={false}
            sx ={{
              bgcolor: "#F2F2F2",
              color: "#ADAEB1",
              borderRadius: 2,
              mt: 1,
            }}
            >
              <Skeleton variant="text" width={200} />
            </Alert>
          </Item>
        </Stack>
      </Box>
    );
  };

  if (loading) {
    return loadingSkeleton();
  }

  return (
    <div>
      {infoUser.iProfileId === 0 ? (
        <Box sx={{ width: "100%" }}>
          <Stack spacing={2} className="box-complete-form">
            <Item
              elevation={0}
              sx={{
                width: "100%",
                mb: 1,
                bgcolor: "#fff",
                color: "#ADAEB1",
                borderRadius: 0,
                border: "0px solid #ADAEB1",
                alignItems: "left",
              }}
            >
              <Alert
                justify="left"
                alignItems="baseline"
                justifyContent="baseline"
                severity="warning"
                sx={{ width: "100%" }}
              >
                <Typography
                  variant="h5"
                  color="text.primary"
                  fontFamily={"'Roboto', 'Helvetica', 'Arial', sans-serif"}
                  textAlign="left"
                  fontWeight={700}
                  fontSize={20}
                >
                  Debes configurar tu cuenta para empezar a aceptar pagos
                </Typography>
                <Typography
                  variant="h2"
                  color="#76767c"
                  fontFamily={"'Roboto', 'Helvetica', 'Arial', sans-serif"}
                  textAlign="left"
                  fontWeight={400}
                  fontSize={18}
                  mt={1}
                >
                  Para empezar a aceptar pagos, debes completar tu perfil de
                  usuario. Para ello, debes finalizar registro y completar los
                  datos que se te solicitan.
                </Typography>
                <br></br>
                <LoadingButton
                  className="btn-complete-form"
                  disableElevation
                  component={Link}
                  to="/completar-registro"
                  endIcon={<ArrowForwardIcon />}
                  variant="contained"
                  sx={{
                    width: "%",
                    bgcolor: "#FFB800",
                    color: "#fff",
                    "&:hover": { bgcolor: "#031B4E", color: "#fff" },
                  }}
                >
                  Completar registro
                </LoadingButton>
              </Alert>

              <Alert
                sx={{
                  mt: 1,
                  mb: 1,
                }}
                severity="warning"
              >
                Al completar tu registro se te generaran las credenciales del
                ambiete de pruebas donde podras realizar pruebas de pago.
              </Alert>
            </Item>
          </Stack>
        </Box>
      ) : (
        <div>                  

        </div>
      )}
    </div>
  );
};
