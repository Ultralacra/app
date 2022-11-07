import * as React from "react";
import "./AppBar.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

const drawerWidth = 240;
const navItems = [
  "Nosotros",
  "¿Cómo funciona?",
  "Preguntas Frecuentes",
  "Contacto",
];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <img
          width="50%"
          src="http://valinkgroup.com/wp-content/uploads/2022/05/Negro.png"
          alt="logo"
          href="/"
        />
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item}>
            <ListItemButton sx={{ textAlign: "left" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <ListItem>
        <ListItemButton>
          <ListItemText>
            <Link
              className="btn-movil-login"
              to="/login"
              variant="contained"
              fullWidth
            >
              Acceso clientes
            </Link>
          </ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <ListItemText>
            <Link
              className="btn-movil-registro"
              to="/register-page"
              fullWidth
              variant="contained"
            >
              Registro
            </Link>
          </ListItemText>
        </ListItemButton>
      </ListItem>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Container>
        <Box
          sx={{
            width: "50%",
            height: "50%",
          }}
        >
          <AppBar
            position="fixed"
            display="flex"
            justifyContent=""
            sx={{
              mb: 10,
              backgroundColor: "#fff",
            }}
          >
            <div className="franja-up">
              <div className="franja-up calipso"></div>
              <div className="franja-up rojo"></div>
            </div>
            <Toolbar fixed className="navbar-container">
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <img
                src="http://valinkgroup.com/wp-content/uploads/2022/05/Negro.png"
                alt="logo"
                width="150"
                href="/"
              />
              <Box
                sx={{ display: { xs: "none", sm: "block" } }}
                className="list-items-nav"
              >
                {navItems.map((item) => (
                  <Button
                    key={item}
                    sx={{
                      color: "black",
                      fontSize: "0.9rem",
                      fontFamily: "roboto",
                      textTransform: "none",
                      fontWeight: "bold",
                      margin: "0.1rem",
                    }}
                  >
                    {item}
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </AppBar>
          <Box component="nav">
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
          </Box>
          <Box component="main" sx={{ p: 3 }}>
            <Toolbar />
          </Box>
        </Box>
      </Container>
    </>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
