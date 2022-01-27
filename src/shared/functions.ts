import { PlayerRecord, PlayerResponse } from '../entities/Player';
import logger from './Logger';

export const pErr = (err: Error) => {
  if (err) {
    logger.err(err);
  }
};

export const getRandomInt = () => {
  return Math.floor(Math.random() * 1_000_000_000_000);
};

export const filterForPlayerMatch = (
  firstName: string,
  lastName: string,
  res: PlayerResponse
) => {
  const playerFilter = (player: PlayerRecord) =>
    player?.first_name.toLowerCase() === firstName.toLowerCase() &&
    player?.last_name.toLowerCase() === lastName.toLowerCase();
  const {
    data: { data },
  } = res;
  const filteredRes = data.filter(playerFilter);
  return filteredRes;
};
