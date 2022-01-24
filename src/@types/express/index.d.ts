import { IPlayer } from '@entities/Player';

declare module 'express' {
  export interface Request {
    body: {
      player: IPlayer;
    };
    query: {
      firstName?: string;
      lastName?: string;
    };
  }
}
