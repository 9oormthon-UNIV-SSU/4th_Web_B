export type Player = 'X' | 'O';

export type Position = number;

export type MoveLog = {
    player: Player;
    position: Position | null;
    squares: (Player | null)[];
};
