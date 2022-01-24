import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import {
  paramMissingError,
  playersUrl,
  seasonAvgsUrl,
} from '@shared/constants';
import axios from 'axios';
import logger from '@shared/Logger';
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

interface PlayerRecord {
  id: number;
  first_name: string;
  last_name: string;
}

interface PlayerResponse {
  data: {
    data: [PlayerRecord];
  };
  meta: {
    total_pages: number;
    current_page: number;
    next_page: unknown;
    per_page: number;
    total_count: number;
  };
}

interface SeasonRecord {
  games_played: number;
  player_id: number;
  season: number;
}

interface SeasonResponse {
  data: {
    data: [SeasonRecord];
  };
}

/**
 * Get all users.
 *
 * @param req
 * @param res
 * @returns
 */
export async function getGamesPlayed(req: Request, res: Response) {
  const defaults = {
    seasons: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021],
    firstName: 'lebron',
    lastName: 'james',
  };
  let above50 = 0;
  let below50 = 0;
  let { firstName, lastName } = req.query;
  firstName ||= defaults.firstName;
  lastName ||= defaults.lastName;

  const lastNameRes: PlayerResponse = await axios.get(
    `${playersUrl}?search=${lastName}&per_page=100`
  );

  const playerFilter = (player: PlayerRecord) =>
    player?.first_name.toLowerCase() === firstName &&
    player?.last_name.toLowerCase() === lastName;

  const filteredRes = lastNameRes.data.data.filter(playerFilter);

  if (!filteredRes[0]) {
    console.log(`No records found for ${firstName} ${lastName}`);
    return res.status(200).send({
      PlayerName: `${firstName} ${lastName}`,
      GamesPlayed: { Above50: above50, Below50: below50 },
    });
  }
  const playerId = filteredRes[0].id;

  for await (const season of defaults.seasons) {
    const seasonRes = await axios.get(
      `${seasonAvgsUrl}?season=${season}&player_ids[]=${playerId}`
    );
    if (!seasonRes.data.data[0]?.games_played) continue;
    seasonRes.data.data[0]?.games_played > 50 ? above50++ : below50++;
    console.log(
      `Season Response for ${season}: `,
      seasonRes.data.data[0]?.games_played
    );
  }

  // logger.info(`
  // Player Name: ${firstName} ${lastName},
  // Games Played: { Above50: ${above50}, Below50" ${below50}}
  // `);

  return res.status(OK).json({
    PlayerName: `${firstName} ${lastName}`,
    GamesPlayed: { Above50: above50, Below50: below50 },
  });
}
