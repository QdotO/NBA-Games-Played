import { Router } from 'express';
import { getGamesPlayed } from './Players';

// Player-route
const playerRouter = Router();
playerRouter.get('/games-played', getGamesPlayed);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/players', playerRouter);
export default baseRouter;
