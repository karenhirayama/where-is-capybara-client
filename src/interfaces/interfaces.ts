export interface Position {
  x: number;
  y: number;
}

export interface TimeTaken {
  hours?: number;
  minutes?: number;
  seconds: number;
}

export interface Score {
  id: string;
  player_name: string;
  time_taken: TimeTaken;
  game_session_id: string;
  created_at: string;
}