import React, { useState, useEffect } from "react";
import "./ConsultarTransacciones.css";
import Box from "@mui/material/Box";
import { TextField, Typography } from "@mui/material";
import "./DashboardMain.css";
import Container from "react-bootstrap/Container";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Formik } from "formik";
import Grid from "@mui/material/Grid";
import axios from "axios";
import LoadingButton from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { DataGrid, esES } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { AlertCompleteForm } from "../usercompletecomponentes/AlertCompleteForm";

const ConsultarTransacciones = () => {

  const drawerWidth = 240;

  const [usuario, setUsuario] = useState({});

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
      console.log(response.data);
    }
    fetchData();
  }, []);
 

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  }));

  const formatearFecha = (fecha) => {
    const fechaFormateada = new Date(fecha).toLocaleDateString("es-ES");
    return fechaFormateada;
  };

  const columns = [
    {
      field: "fechaTransaccion",
      headerName: "fechaTransaccion",
      id: "fechaTransaccion",
      width: 200,
    },
    {
      field: "estatus",
      headerName: "estatus",
      id: "estatus",
      width: 200,
    },
    {
      field: "card_number",
      headerName: "card_number",
      id: "card_number",
      width: 200,
    },
    {
      field: "customer_id",
      headerName: "customer_id",
      id: "customer_id",
      width: 200,
    },
    {
      field: "idTransaccion",
      headerName: "idTransaccion",
      id: "idTransaccion",
      width: 200,
    },
    {
      field: "account_type",
      headerName: "account_type",
      id: "account_type",
      width: 200,
    },
    {
      field: "amount",
      headerName: "amount",
      id: "amount",
      width: 200,
    },
  ];

  const [info, setInfo] = useState([]);
  const [open, setOpen] = useState(false);


  //quitar las comillas del token
  const token = localStorage.getItem("token").replace(/['"]+/g, "");

  //funcion para agregar / y no - en la fecha
  const addSlash = (date) => {
    let newDate = date.split("-");
    return newDate[2] + "/" + newDate[1] + "/" + newDate[0];
  };

 //consultar credenciales 
 const URL_API = "https://valink-pay-api.vercel.app/clientes/consultarregistro?sUserId=" ;

 const [infoUser, setInfoUser] = useState({});
 
 useEffect(() => {
   async function fetchData() {
     const id = JSON.parse(localStorage.getItem("id"));
     const response = await axios.get( 
       `${URL_API}${id}`,
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

 console.log(infoUser);

  return (
    <div>
      <Backdrop
        sx={{
          color: "#DFFEFF",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
      >
        cargando información...
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Container>
          <Typography
            variant="h4"
            color="#262626"
            fontWeight="bold"
            mb={2}
            textAlign="left"
          >
            CONSULTAR TRANSACCIONES
          </Typography>
          <AlertCompleteForm/>
          <div className="espaciador-amarillo-largo"></div>

          <Formik
            initialValues={{
              fechaDesde: "",
              fechaHasta: "",
            }}
            onSubmit={(values) => {
              setOpen(true);

              axios
                .get(
                  "https://valink-pay-api.vercel.app/transaccion/consultar-transaccion",
                  {
                    params: {
                      fechaDesde: addSlash(values.fechaDesde),
                      fechaHasta: addSlash(values.fechaHasta),
                      id_comercio: infoUser[0].sIdComercio,
                    },
                    headers: {
                      Authorization: token,
                    },
                  }
                  
                )
                .then(function (response) {

                    if (response.data.message === "No hay informaci&oacute;n para los parametros seleccionados") {
                      Swal.fire({
                        toast: true,
                        position: "top-end",
                        icon: "error",
                        title: "No hay información para los parametros seleccionados",
                        showConfirmButton: false,
                        timer: 3000,
                      });
                      setOpen(false);
                    } else {

                      Swal.fire({
                        toast: true,
                        position: "top-end",
                        icon: "success",
                        title: "Información cargada correctamente",
                        showConfirmButton: false,
                        timer: 3000,
                      });
                      setInfo(response.data);
                      setOpen(false);
                    }
                })
                .catch(function (error) {
                  console.log(error);
                });
            }}
          >

            {({ values, handleChange,  handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid
                    container
                    spacing={{ xs: 2, md: 2 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                    <Grid item xs={6} md={8}>
                      <Stack spacing={2}>
                        <Item elevation={4}
                        //deshabilitar la caja si el perfil es 0
                        >
                          <Alert
                            severity="info"
                            sx={{ width: "100%", mb: 4 }}
                          >
                            Selecciona el rango de fechas para consultar las
                            transacciones realizadas en el sistema.
                          </Alert>
                          <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={{ xs: 1, sm: 1, md: 1 }}
                          >
                            <Item elevation={0}>
                              <TextField
                                required
                                fullWidth
                                size="small"
                                label="Fecha Desde"
                                id="fechaDesde"
                                name="fechaDesde"
                                type="date"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                onChange={handleChange}
                                value={values.fechaDesde}
                              ></TextField>
                            </Item>
                            <Item elevation={0}>
                              <TextField
                                required
                                fullWidth
                                size="small"
                                label="Fecha Hasta"
                                id="fechaHasta"
                                name="fechaHasta"
                                type="date"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                onChange={handleChange}
                                value={values.fechaHasta}
                              ></TextField>
                            </Item>
                            <Item elevation={0}>
                              <LoadingButton
                              disableElevation
                                fullWidth
                                type="submit"
                                variant="contained"
                                sx={{
                                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "var(--color-azul)",
                                  },
                                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "var(--color-azul)",
                                  },
                                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "var(--color-azul)",
                                  },
                                  "& .MuiOutlinedInput-input": {
                                    color: "var(--color-azul)",
                                  },
                                }}
                                disabled={usuario.iProfileId === 0}
                              >
                                Consultar
                              </LoadingButton>
                            </Item>
                          </Stack>
                        </Item>
                      </Stack>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <Item elevation={4}>
                        <Alert severity="info"
                        >
                          En esta sección podrá consultar las transacciones
                          realizadas en el sistema.
                        </Alert>
                      </Item>
                    </Grid>
                  </Grid>
                  <br></br>
                </Box>
              </form>
            )}
          </Formik>
          <Grid sx={{ height: 750, width: "100%" }}>
            <DataGrid
              rows={info}
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
              columns={columns}
              pageSize={20}
              rowsPerPageOptions={[20]}
              checkboxSelection
              getRowId={(row) =>
                row.fechaTransaccion +
                row.estatus +
                row.card_number +
                row.customer_id +
                row.idTransaccion +
                row.account_type +
                row.amount
              }
            />
          </Grid>
          <br></br>
        </Container>
      </Box>
    </div>
  );
};


export default ConsultarTransacciones;
