import { IPlayer } from '@entities/Player';
import { defaults } from '@shared/constants';

declare module 'express' {
  export interface Request {
    body: {
      player: IPlayer;
    };
    query: {
      firstName: string = defaults.firstName;
      lastName: string = defaults.lastName;
    };
  }
}
