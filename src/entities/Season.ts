export interface SeasonRecord {
  games_played: number;
  player_id: number;
  season: number;
}

export interface SeasonResponse {
  data: {
    data: [SeasonRecord];
  };
}
