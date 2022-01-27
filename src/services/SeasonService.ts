import { seasonAvgsUrl } from '../shared/constants';
import logger from '../shared/Logger';
import axios from 'axios';

export const getSeasonData = async (season: number, playerId: number) => {
  return axios
    .get(`${seasonAvgsUrl}?season=${season}&player_ids[]=${playerId}`)
    .catch(async (error) => {
      logger.err('SeasonAvg API Error: ', error.stack);
      logger.info(`Retrying for the ${season} season`);
      return await axios
        .get(`${seasonAvgsUrl}?season=${season}&player_ids[]=${playerId}`)
        .catch((error) => {
          logger.err(error.stack);
          return Promise.reject(
            Error(`Season data for the ${season} season is unavailable`)
          );
        });
    });
};
