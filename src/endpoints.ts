import { Router, Request, Response } from 'express';
import { type } from 'node:os';
import { body, check, validationResult } from 'express-validator';
import { SequelizeConnection } from './database/sequelize';
import { createNewMovie, getMovies, getMoviesById } from './services/movieService';
import { Movie, movieValidator } from './model/movie';

const router = Router();


router.post('/movies', movieValidator
, async (req: Request, res: Response) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const newMovie: Movie = req.body as Movie;
    const id = await createNewMovie(newMovie);

    return res.status(201).send(JSON.stringify(id));
});

router.get('/movies', async (req: Request, res: Response) => {
    const movies = await getMovies();
    
    return res.json((Array.from(movies)));
});

router.get('/movies/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    if (Number.isNaN(id)) {
        return res.status(404).send(JSON.stringify("Movie not found"));
    }

    const movie = await getMoviesById(id);

    if (movie == null) {
        return res.status(404).send(JSON.stringify("Movie not found"));
    }
    return res.json(movie);
});


export default router;