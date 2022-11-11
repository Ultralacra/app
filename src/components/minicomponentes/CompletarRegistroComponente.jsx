import React from "react";
import Stack from "@mui/material/Stack";
import Item from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Toolbar } from "@mui/material";

const AppBarDashboard = () => {

  const drawerWidth = 100;

  return (
    <>
<Box sx={{ display: "flex" }}>
<CssBaseline />

<Box

        sx={{
          height: "50vh",
          width: { sm: `calc(100% - ${drawerWidth}px)` }, 
          p: 3,
        }}
      >
        <Stack>
          <Item>
              <h1>test</h1>
          </Item>
        </Stack>
      </Box>

</Box>
    </>
  );
};

export default AppBarDashboard;
