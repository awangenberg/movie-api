import { Router, Request, Response, RequestHandler } from 'express';
import { type } from 'node:os';
import { body, check, validationResult } from 'express-validator';
import { SequelizeConnection } from './database/sequelize';
import { createNewMovie, getMovies, getMoviesById, updateRating } from './services/movieService';
import { Movie, movieValidator, ratingValidator } from './model/movie';

const router = Router();

const validate: RequestHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.post('/movies', movieValidator, validate,
    async (req: Request, res: Response) => {

        const newMovie: Movie = req.body as Movie;
        const id = await createNewMovie(newMovie);

        return res.status(201).send(JSON.stringify(id));
    });

router.patch('/movies:id', ratingValidator, validate,
    async (req: Request, res: Response) => {

        const id = Number(req.params.id)
        const newRating: number = req.body.rating

        if (Number.isNaN(id)) {
            return res.status(400).send(JSON.stringify("Id most be a number"));
        }

        const movieToUpdate = await updateRating(id, newRating);

        if (movieToUpdate == null) {
            return res.status(404).send(JSON.stringify("Movie not found"));
        }

        return res.json((movieToUpdate));
    });

router.get('/movies', async (req: Request, res: Response) => {
    const movies = await getMovies();

    return res.json((Array.from(movies)));
});

router.get('/movies/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    if (Number.isNaN(id)) {
        return res.status(400).send(JSON.stringify("Id most be a number"));
    }

    const movie = await getMoviesById(id);

    if (movie == null) {
        return res.status(404).send(JSON.stringify("Movie not found"));
    }
    return res.json(movie);
});




export default router;