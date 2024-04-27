import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { Movie } from "../interface/Movie"; // Importa la interfaz de película

interface EditCreateModalProps {
  open: boolean;
  onClose: () => void;
  movie?: Movie | null;
  onSave: (movieData: Movie) => void;
}

function EditCreateMovieModal({
  open,
  onClose,
  movie,
  onSave,
}: EditCreateModalProps) {
  const [title, setTitle] = useState(movie?.title || "");
  const [rating, setRating] = useState(movie?.rating || 0);
  const [dateCreated, setDateCreated] = useState(movie?.date_created || "");
  const [image, setImage] = useState(movie?.image || "");
  const [characters, setCharacters] = useState(movie?.character || "");

  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setRating(movie.rating);
      setDateCreated(movie.date_created);
      setImage(movie.image);
      setCharacters(movie.character);
    } else {
      setTitle("");
      setRating(0);
      setDateCreated("");
      setImage("");
      setCharacters("");
    }
  }, [movie]);

  const handleSave = () => {
    const movieData: Movie = {
      id: movie?.id,
      title,
      rating,
      date_created: dateCreated,
      image,
      character: characters,
    };

    onSave(movieData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          padding: 4,
          backgroundColor: "#1d1f2b",
          margin: "auto",
          marginTop: "10%",
          width: 400,
          borderRadius: 4,
        }}
      >
        <Typography variant="h6">
          {movie ? "Editar" : "Crear"} Película
        </Typography>
        <TextField
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Calificación"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Fecha de lanzamiento"
          value={dateCreated}
          onChange={(e) => setDateCreated(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Imagen"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Personajes"
          value={characters}
          onChange={(e) => setCharacters(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ marginTop: 2, marginRight: 2 }}
        >
          Guardar
        </Button>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{ marginTop: 2, marginRight: 2 }}
        >
          Cancelar
        </Button>
      </Box>
    </Modal>
  );
}

export default EditCreateMovieModal;
