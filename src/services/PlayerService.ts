import { PlayerRecord, PlayerResponse } from '../entities/Player';
import { playersUrl } from '../shared/constants';
import axios from 'axios';

export const getPlayerData = async (name: string) => {
  const res: PlayerResponse = await axios.get(
    `${playersUrl}?search=${name}&per_page=100`
  );
  return res;
};

