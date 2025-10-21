
export enum CellType {
  GEM,
  MINE,
}

export interface Cell {
  type: CellType;
  isRevealed: boolean;
}

export enum GameState {
  IDLE = 'IDLE',
  IN_PROGRESS = 'IN_PROGRESS',
  BUSTED = 'BUSTED',
}
