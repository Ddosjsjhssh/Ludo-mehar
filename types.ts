export enum GameType {
  FULL = 'Full',
  CLASSIC = 'Classic',
  QUICK = 'Quick',
}

export interface TableOptions {
  freshId: boolean;
  codeAapDoge: boolean;
  noIphone: boolean;
  noKingPass: boolean;
  autoLoss: boolean;
}

export interface TableRequest {
  amount: string;
  type: GameType;
  gamePlus: string;
  options: TableOptions;
}

export const PRESET_AMOUNTS = ["1000", "2000", "3000", "5000", "7000", "8000", "10000"];
export const PRESET_GAME_PLUS = ["100+", "200+", "500+", "1000+"];