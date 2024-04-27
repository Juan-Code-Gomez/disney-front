import { useEffect, useState } from "react";
import { Modal, TextField, Button, Typography, Box } from "@mui/material";
import API from "../API";
import { Characters } from "../interface/Character";

interface CreateCharacterModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (newCharacter: {
    name: string;
    age: number;
    weight: number;
    history: string;
    image: string;
    movie: string;
  }) => void;
  character?: Characters | null;
}

function CreateCharacterModal({
  open,
  onClose,
  onSave,
  character,
}: CreateCharacterModalProps) {
  useEffect(() => {
    if (character) {
      setNewCharacter({
        name: character.name,
        age: character.age,
        weight: character.weight,
        history: character.history,
        image: character.image,
        movie: character.movie,
      });
    } else {
      setNewCharacter({
        name: "",
        age: 0,
        weight: 0,
        history: "",
        image: "",
        movie: "",
      });
    }
  }, [character]);

  const [newCharacter, setNewCharacter] = useState({
    name: "",
    age: 0,
    weight: 0,
    history: "",
    image: "",
    movie: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewCharacter({ ...newCharacter, [name]: value });
  };

  const handleSave = async () => {
    if (character) {
      // Lógica para actualizar un personaje existente
      try {
        const response = await API.put(
          `/character/${character.id}`,
          newCharacter
        );
        if (response.status === 200) {
          onSave(newCharacter);
          onClose();
        }
      } catch (error) {
        console.error("Error al editar personaje:", error);
      }
    } else {
      // Lógica existente para crear un nuevo personaje
      try {
        const response = await API.post("/character", newCharacter);
        if (response.status === 201) {
          onSave(newCharacter);
          onClose();
        }
      } catch (error) {
        console.error("Error al crear personaje:", error);
      }
    }
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
        <Typography variant="h6">Crear Personaje</Typography>

        <TextField
          label="name"
          name="name"
          value={newCharacter.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Edad"
          name="age"
          type="number"
          value={newCharacter.age}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Peso"
          name="weight"
          value={newCharacter.weight}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Historia"
          name="history"
          value={newCharacter.history}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Imagen"
          name="image"
          value={newCharacter.image}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Pelicula"
          name="movie"
          value={newCharacter.movie}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <Button onClick={handleSave} variant="contained" color="primary">
          Guardar
        </Button>
        <Button
          sx={{ margin: "12px" }}
          variant="contained"
          color="primary"
          onClick={onClose}
        >
          Cancelar
        </Button>
      </Box>
    </Modal>
  );
}

export default CreateCharacterModal;
