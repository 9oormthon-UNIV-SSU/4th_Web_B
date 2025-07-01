// 플레이어 타입
export type Player = "❌" | "⭕️";

// Position 타입 : 클릭한 위치 저장
export interface Position {
  row: number; // 0~2
  col: number; // 0~2
}

// MoveLog 타입 : history 저장
export interface MoveLog {
  squares: (Player | null)[];
  position: Position | null; // 해당 수의 위치 | 게임 시작 : null
}

// GameState : 게임 상태 저장
export interface GameState {
  history: MoveLog[];
  currentMove: number;
  xWins: number;
  oWins: number;
}

// Winner : 승리 정보 
export interface WinnerInfo {
  winner: Player;
  line: number[];
} 