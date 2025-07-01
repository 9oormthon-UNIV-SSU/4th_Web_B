export type Player = "X" | "O";

export type Position = {
  row: number;
  col: number;
};

export type MoveLog = {
  squares: (Player | null)[];
  position: Position | null;
};
