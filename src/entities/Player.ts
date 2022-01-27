export interface IPlayer {
  firstName: string;
  lastName: string;
}

class Player implements IPlayer {
  public firstName: string;
  public lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
export default Player;

export interface PlayerRecord {
  id: number;
  first_name: string;
  last_name: string;
}

export interface PlayerResponse {
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

export const getFormattedResponse = (
  firstName: string,
  lastName: string,
  above50: number,
  below50: number
) => {
  return {
    PlayerName: `${firstName} ${lastName}`,
    GamesPlayed: { Above50: above50, Below50: below50 },
  };
};
