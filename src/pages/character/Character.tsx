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
import CreateCharacterModal from "../../common/CreateCharacterModal";

function Character() {
  const [characters, setCharacters] = useState<Characters[]>([]);
  const [filters, setFilters] = useState({
    name: "",
    age: "" as string | number,
    movie: ""
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalImage, setModalImage] = useState("");
  const [modalHistory, setModalHistory] = useState("");
  const [characterToEdit, setCharacterToEdit] = useState<Characters | null>(
    null
  );

  const openModal = (
    title: string,
    content: string,
    image: string,
    history: string
  ) => {
    console.log(image, "image");

    setModalTitle(title);
    setModalContent(content);
    setModalOpen(true);
    setModalImage(image);
    setModalHistory(history);
  };

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
  };

  const fetchCharacters = () => {
    API.get(`/character`)
      .then((resp) => {
        setCharacters(resp.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleSaveNewCharacter = async (newCharacter: any) => {
    try {
      const response = await API.post("/character", newCharacter);
      if (response.status === 201) {
        // Agregar el nuevo personaje a la lista de personajes
        setCharacters([...characters, response.data]); // Solo esta línea es necesaria
        handleCloseCreateModal();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCardClick = (character: Characters) => {
    console.log(character, "character");

    openModal(
      character.name,
      `Película: ${character.movie}\nEdad: ${character.age}`,
      character.image,
      character.history
    );
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, name: event.target.value });
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, age: event.target.value });
  };

  const handleMovieChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, movie: event.target.value });
  };

  const handleClearFilters = () => {
    setFilters({ name: "", age: "", movie: "" });
  };

  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (filters.name) {
      queryParams.append("name", filters.name);
    }

    if (filters.age) {
      queryParams.append("age", filters.age.toString());
    }

    if (filters.movie) {
      queryParams.append("movie", filters.movie);
    }

    API.get(`/character?${queryParams.toString()}`)
      .then((resp) => {
        setCharacters(resp.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [filters]);

  const handleOpenEditModal = (character: Characters) => {
    setCreateModalOpen(true);
    setCharacterToEdit(character);
  };

  const deleteCharacter = (id: number) => {
    API.delete(`character/${id}`)
      .then((resp) => {
        if (resp.status === 200) {
          fetchCharacters();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      {" "}
      <Box
        mb={12}
        mt={10}
        sx={{
          backgroundColor: "#1d1f2b",
          p: 2,
          position: "sticky",
          zIndex: 10,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenCreateModal}
          style={{ marginBottom: "1rem" }}
        >
          Crear personaje
        </Button>
        <p>Filtros</p>
        <Toolbar sx={{ display: "flex", gap: 2, alignItems: "center" }}>
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

          <TextField
            label="Buscar por serie o pelicula"
            variant="outlined"
            margin="normal"
            value={filters.movie}
            onChange={handleMovieChange}
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
                    sx={{ objectFit: "fill" }}
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
                      Edad: {character.age}
                    </Typography>
                    <Button onClick={() => handleOpenEditModal(character)}>
                      Editar
                    </Button>
                    <Button onClick={() => deleteCharacter(character.id)}>
                      Eliminar
                    </Button>
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
      <CreateCharacterModal
        open={createModalOpen}
        onClose={handleCloseCreateModal}
        onSave={handleSaveNewCharacter}
        character={characterToEdit}
      />
    </>
  );
}

export default Character;
