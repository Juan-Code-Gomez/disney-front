import React, { useEffect, useState } from "react";
import API from "../API";
import { Movie } from "../interface/Movie";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import StarRating from "../common/StarRating";
import EditCreateMovieModal from "../common/EditCreateMovieModal";
import { Gender } from "../interface/Gender";

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genders, setGenders] = useState<Gender[]>([]);
  const [filters, setFilters] = useState({
    search: "",
    date: null as string | null,
    rating: "" as number | string,
    genre: "" as string,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: event.target.value });
  };

  const handleRatingChange = (event: SelectChangeEvent<string | number>) => {
    setFilters({ ...filters, rating: event.target.value as number });
  };

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    // Convertir la fecha seleccionada a formato YYYY-MM-DD si no es null
    const formattedDate = date ? date.format("YYYY-MM-DD") : null;
    setFilters({ ...filters, date: formattedDate });
  };

  const handleGenreChange = (event: SelectChangeEvent<string>) => {
    setFilters({ ...filters, genre: event.target.value });
  };

  const handleClearFilters = () => {
    // Restablece los filtros a sus valores predeterminados
    setFilters({ search: "", date: null, rating: "", genre: "" });
  };

  useEffect(() => {

    API.get<Gender[]>("/gender")
    .then((response) => {
      setGenders(response.data);
    })
    .catch((error) => {
      console.error(error);
    });

    const queryParams = new URLSearchParams();
    if (filters.search) {
      queryParams.append("title", filters.search);
    }
    if (filters.date) {
      queryParams.append("date_created", filters.date);
    }
    if (filters.rating !== "") {
      queryParams.append("rating", filters.rating.toString());
    }

    if (filters.genre) {
      queryParams.append("gender_id", filters.genre);
    }
    
    const getMovies = setTimeout(() => {
      API.get<Movie[]>(`/movie?${queryParams.toString()}`)
        .then((resp) => {
          console.log(resp.data, "");

          if (resp.data.length) {
          }

          setMovies(resp.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 250);
    return () => clearTimeout(getMovies);
  }, [filters]);

  const handleEditClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const fetchMovies = () => {
    API.get(`/movie`)
      .then((resp) => {
        setMovies(resp.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSaveMovie = async (movieData: Movie) => {
    try {
      if (movieData.id) {
        console.log(movieData, "movieData");

        const reponse = await API.put(`/movie/${movieData.id}`, movieData);

        if (reponse.status === 200) {
          fetchMovies();
          setIsModalOpen(false);
        } else {
          console.log("error al editar");
        }
      } else {
        const response = await API.post("/movie", movieData);

        if (response.status === 201) {
          fetchMovies();

          setIsModalOpen(false);
        } else {
          console.log("error al crear");
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsModalOpen(false);
  };

  const handleCreateMovie = () => {
    setSelectedMovie(null); // Establece selectedMovie a null para crear una nueva película
    setIsModalOpen(true); // Abre el modal
  };

  const handleDeleteClick = (movie: Movie) => {
    API.delete(`movie/${movie.id}`).then((resp) => {
      if (resp.status === 200) {
        fetchMovies();
        console.log("Eliminacion con exito");
      } else {
        console.log("error al eliminar la pelicula");
      }
    });
  };

  return (
    <>
      <EditCreateMovieModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        movie={selectedMovie}
        onSave={handleSaveMovie}
      />
      <div>
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
            onClick={handleCreateMovie}
            sx={{ marginBottom: 2 }}
          >
            Crear nueva película
          </Button>
          <p>Filtros</p>
          <Toolbar sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TextField
              label="Buscar por titulo"
              variant="outlined"
              value={filters.search}
              onChange={handleSearchChange}
            />

            <Select
              value={filters.rating}
              onChange={handleRatingChange}
              variant="outlined"
              displayEmpty
            >
              <MenuItem value="" disabled>
                Selecciona una calificación
              </MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>

            <Select
              value={filters.genre}
              onChange={handleGenreChange}
              variant="outlined"
              displayEmpty
            >
              <MenuItem value="" disabled>
                Selecciona un género
              </MenuItem>
              {genders.map((gender) => (
                <MenuItem key={gender.id} value={gender.id}>
                  {gender.name}
                </MenuItem>
              ))}
            </Select>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha"
                value={dayjs(filters.date)}
                onChange={handleDateChange}
              />
            </LocalizationProvider>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClearFilters}
              style={{ marginLeft: 10 }}
            >
              Limpiar filtros
            </Button>
          </Toolbar>
        </Box>
        <Grid container spacing={2}>
          {movies.length === 0 ? (
            <>
              <h1>No se encontraron resultados</h1>
            </>
          ) : (
            <>
              {movies.map((movie) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={movie.image}
                      alt={movie.title}
                      sx={{ objectFit: "fill" }}
                    />
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.2,
                      }}
                    >
                      <Typography
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        variant="h6"
                      >
                        {movie.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Calificacion: <StarRating rating={movie.rating} />
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Fecha de lanzamiento: <br />
                        {movie.date_created}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Personajes: {movie.character}
                      </Typography>
                      <div>
                        {" "}
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEditClick(movie)}
                          sx={{ marginRight: "1rem" }}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleDeleteClick(movie)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </div>
    </>
  );
}

export default Home;
