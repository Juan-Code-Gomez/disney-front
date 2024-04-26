import { useEffect, useState } from "react";
import API from "../../API";
import { Characters } from "../../interface/Character";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

import ModalComponent from "../../common/ModalComponent";

function Character() {
  const [characters, setCharacters] = useState<Characters[]>([]);
  const [filters, setFilters] = useState({
    name: "",
    age: "" as string | number,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalImage, setModalImage] = useState("");
  const [modalHistory, setModalHistory] = useState("");

  const openModal = (title: string, content: string, image:string, history: string) => {
    console.log(image, 'image');
    
    setModalTitle(title);
    setModalContent(content);
    setModalOpen(true);
    setModalImage(image)
    setModalHistory(history)
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleCardClick = (character: Characters) => {
    console.log(character, 'character');
    
            openModal(character.name,   `Película: ${character.movie}\nEdad: ${character.age}`, character.image, character.history);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, name: event.target.value });
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, age: event.target.value });
  };

  const handleClearFilters = () => {
    setFilters({ name: "", age: "" });
  };

  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (filters.name) {
      queryParams.append("name", filters.name);
    }

    if (filters.age) {
      queryParams.append("age", filters.age.toString());
    }

    API.get(`/character?${queryParams.toString()}`)
      .then((resp) => {
        setCharacters(resp.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [filters]);

  return (
    <>
      {" "}
      <Box
        mb={12}
        mt={10}
        sx={{
          backgroundColor: "#0682f0",
          p: 2,
          position: "sticky",
          zIndex: 10,
        }}
      >
        <p>Filtros</p>
        <Toolbar>
          <TextField
            label="Buscar por nombre"
            variant="outlined"
            margin="normal"
            value={filters.name}
            onChange={handleNameChange}
          />

          <TextField
            label="Filtrar por edad"
            variant="outlined"
            margin="normal"
            type="number"
            value={filters.age}
            onChange={handleAgeChange}
          />

          <Button
            variant="contained"
            color="secondary"
            style={{ marginLeft: 10 }}
            onClick={handleClearFilters}
          >
            Limpiar filtros
          </Button>
        </Toolbar>
      </Box>
      <Grid container spacing={2}>
        {characters.length === 0 ? (
          <>
            <h1>No se encontraron resultados</h1>
          </>
        ) : (
          <>
            {characters.map((character) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={character.id}>
                <Card onClick={() => handleCardClick(character)}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={character.image}
                    alt={character.name}
                  />
                  <CardContent>
                    <Typography variant="h6">{character.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Nombre: {character.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Pelicula: {character.movie}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Pelicula: {character.age}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </>
        )}
      </Grid>
      <ModalComponent
        open={modalOpen}
        onClose={closeModal}
        title={modalTitle}
        image={modalImage}
        content={modalContent}
        history={modalHistory}
      />
    </>
  );
}

export default Character;
