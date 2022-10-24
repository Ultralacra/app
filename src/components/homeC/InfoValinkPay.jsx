import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function InfoValinkPay() {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={6}>
          <Item>
            <img
              width="100%"
              src="http://valinkgroup.com/wp-content/uploads/2022/10/webpay-home-10.png"
              alt="logo"
            />
          </Item>
          <Item>
            <Typography
              component="h5"
              variant="h5"
              align="center"
              fontWeight="bold"
              color="black"
              fontSize="3em"
            >
              Contratar ValinkPay
            </Typography>
            <br></br> 
            <Typography
              component="p"
              justify="justify"
              variant="p"
              align="left"
              fontWeight="400"
              color="#77869e"
                fontSize="1em"
            >
              Realiza cobros en línea a través de Internet desde cualquier lugar
              en que te encuentres y a cualquier hora.

             <br></br> 
             <br></br> 
            Comparte a tus clientes
              un link en redes sociales, whatsapp o email y recibe los pagos a
              través del sitio web Transbank webpay.cl 
              <br></br>
              <br></br>
              Recibe pagos con Crédito, Débito y Prepago 
              <br></br>
              <br></br>
              Paga una comisión por cada venta.{" "}

            </Typography>
            <br></br><br></br>
            <LoadingButton

                className="btn-forms"
                align="left"
                type="submit"
                variant="contained"
                size="large"
                endIcon={<SendIcon />}
                >
                Contratar
                </LoadingButton>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
