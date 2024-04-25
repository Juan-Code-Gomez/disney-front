import React, { useEffect, useState } from 'react'
import API from '../API'
import { Movie } from '../interface/Movie';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

function Home() {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(()=>{
        API.get<Movie[]>("/movie").then((resp)=>{
            setMovies(resp.data);
            
        }).catch((error) =>{
            console.log(error);
        })
    }, [])

  return (
    <>
    <div>
            <Grid container spacing={2}>
                {movies.map((movie) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={movie.image}
                                alt={movie.title}
                            />
                            <CardContent>
                                <Typography variant="h6">{movie.title}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    </>
  )
}

export default Home