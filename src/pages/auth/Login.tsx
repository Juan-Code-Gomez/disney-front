import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import API from "../../API";
import logoDisney from "../../assets/Disney_Logo_Letras_Blancas.png";
import { useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate();
  const [userLogin, setUsrlogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await API.post("/login", { userLogin, password });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/movies");
        console.log("Login exitoso:", response.data.token);
      }
    } catch (error) {
      setErrorMessage("Nombre de usuario o contraseña incorrectos");
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box mt={8} display="flex" flexDirection="column" alignItems="center">
          <img width="200px" src={logoDisney}></img>
          <Typography component="h1" variant="h5" mt={2}>
            Iniciar sesión
          </Typography>

          <Box mt={3}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="usrlogin"
              label="Nombre de usuario"
              name="usrlogin"
              autoComplete="username"
              autoFocus
              value={userLogin}
              onChange={(e) => setUsrlogin(e.target.value)}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* {errorMessage && (
              <Typography color="error" variant="body2">
                {errorMessage}
              </Typography>
            )} */}

            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogin}
            >
              Iniciar sesión
            </Button>
            <Button
              fullWidth
              variant="text"
              color="primary"
              onClick={() => navigate("/register")}
            >
              Regístrate
            </Button>
          </Box>
        </Box>
        <Box mt={2} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            Versión de la aplicación: 1.0.0
          </Typography>
        </Box>
      </Container>
    </>
  );
}

export default Login;
