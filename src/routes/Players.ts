import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import {
  paramMissingError,
  defaults,
  apiFailureError,
} from '../shared/constants';
import logger from '../shared/Logger';

import { filterForPlayerMatch } from '../shared/functions';
import { getPlayerData } from '../services/PlayerService';
import { getFormattedResponse } from '../entities/Player';
import { getSeasonData } from '../services/SeasonService';

const { BAD_REQUEST, OK, INTERNAL_SERVER_ERROR } = StatusCodes;

export async function getGamesPlayed(req: Request, res: Response) {
  let above50 = 0;
  let below50 = 0;
  let playerId: number;
  const { firstName, lastName } = req.query;
  const { seasons } = defaults;
  if (typeof firstName !== 'string' || typeof lastName !== 'string')
    return res.status(BAD_REQUEST).send(paramMissingError);

  try {
    const lastNameRes = await getPlayerData(lastName);
    const filteredRes = filterForPlayerMatch(firstName, lastName, lastNameRes);

    if (filteredRes.length === 0) {
      logger.info(`No records found for ${firstName} ${lastName}`);
      const resp = getFormattedResponse(firstName, lastName, above50, below50);
      return res.status(200).send(resp);
    }
    playerId = filteredRes[0].id;
  } catch (error) {
    logger.err(error);
    return res.status(INTERNAL_SERVER_ERROR).send(apiFailureError);
  }

  const seasonApiCalls = seasons.map((season) =>
    getSeasonData(season, playerId)
  );
  await Promise.all(seasonApiCalls)
    .then((results) => {
      results.forEach((result) => {
        const {
          data: { data: records },
        } = result;
        if (!!records && !!records[0]?.games_played) {
          records[0]?.games_played > 50 ? above50++ : below50++;
        }
      });
    })
    .catch((error) => {
      logger.err(error.stack);
      return res.status(INTERNAL_SERVER_ERROR).send(apiFailureError);
    });

  logger.info(`
  Player Name: ${firstName.toLowerCase()} ${lastName.toLowerCase()},
  Games Played: { Above50: ${above50}, Below50" ${below50}}
  `);
  const resp = getFormattedResponse(firstName, lastName, above50, below50);
  return res.status(OK).send(resp);
}
