import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import logoDisney from "../assets/Disney_Logo_Letras_Blancas.png";

function NavBar() {
  const navigate = useNavigate();
  const handleCharactersClick = () => {
    // Navega a la ruta '/character' cuando se hace clic en el botón
    navigate("/character");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Container maxWidth="xl">
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                      mr: 2,
                      display: { xs: "none", md: "flex" },
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".3rem",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    <img src={logoDisney} width="100"></img>
                  </Typography>
                </Grid>
                <Grid item>
                  <Stack direction="row" spacing={2}>
                    <Button variant="contained">Peliculas</Button>
                    <Button variant="contained" onClick={handleCharactersClick}>
                      Personajes
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Container>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default NavBar;
