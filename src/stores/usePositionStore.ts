import { create } from 'zustand';

// 포지션 타입 정의
// Position 타입을 export 합니다
// export type Position = 'MASTER' | 'MANAGER' | 'EVALUATE' | 'READ' | null;
export type Position = '마스터' | '관리' | '평가' | '조회' | null;

interface PositionState {
  position: Position;
  setPosition: (position: Position) => void;
  clearPosition: () => void;
  hasPermission: (requiredPosition: Position) => boolean;
}

// 권한 레벨 정의 (높은 숫자가 더 높은 권한)
// const POSITION_LEVELS = {
//   'MASTER': 4,
//   'MANAGER': 3,
//   'EVALUATE': 2,
//   'READ': 1,
// } as const;
const POSITION_LEVELS = {
    '마스터': 4,
    '관리': 3,
    '평가': 2,
    '조회': 1,
  } as const;

export const usePositionStore = create<PositionState>((set, get) => ({
  position: null,
  
  setPosition: (position: Position) => {
    set({ position });
  },
  
  clearPosition: () => {
    set({ position: null });
  },
  
  // 권한 체크 함수
  hasPermission: (requiredPosition: Position) => {
    const currentPosition = get().position;
    
    if (!currentPosition || !requiredPosition) return false;
    
    const currentLevel = POSITION_LEVELS[currentPosition];
    const requiredLevel = POSITION_LEVELS[requiredPosition];
    
    // 현재 권한 레벨이 요구되는 권한 레벨보다 높거나 같으면 true
    return currentLevel >= requiredLevel;
  }
}));