import { useState } from "react";
import { Modal, TextField, Button, Typography } from "@mui/material";
import API from "../API";

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
}

function CreateCharacterModal({
  open,
  onClose,
  onSave,
}: CreateCharacterModalProps) {
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
    console.log(newCharacter, "newCharacter");
    try {
      const response = await API.post("/character", newCharacter);

      if (response.status === 201) {
        onSave(newCharacter);
        onClose();
      }
    } catch (error) {
      console.error("Error al crear personaje:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ padding: "20px", backgroundColor: "#1d1f2b" }}>
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
        <Button sx={{ margin: "12px" }} variant="contained" color="primary">
          Cancelar
        </Button>
      </div>
    </Modal>
  );
}

export default CreateCharacterModal;
