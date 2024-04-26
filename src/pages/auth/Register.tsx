import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import API from '../../API';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [userLogin, setUsrlogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = async () => {
        try {
            const response = await API.post('/register', { userLogin, password });

            if (response.status === 201) {
                // Registro exitoso
                navigate('/');
            }
        } catch (error) {
            setErrorMessage('Error al registrar usuario');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box mt={8} display="flex" flexDirection="column" alignItems="center">
                <Typography component="h1" variant="h5" mt={2}>
                    Regístrate
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

                    {errorMessage && (
                        <Typography color="error" variant="body2">
                            {errorMessage}
                        </Typography>
                    )}

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleRegister}
                    >
                        Regístrate
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default Register;