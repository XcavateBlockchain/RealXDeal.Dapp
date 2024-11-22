'use client';

import { LOADING_STATUS } from '@/types';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface GameContextInterface {
  result: any;
  loading: LOADING_STATUS;
  setResult: (data: any) => void;
  setLoading: (data: any) => void;
}

const GameContext = React.createContext<GameContextInterface>({
  result: null,
  loading: LOADING_STATUS.IDLE,
  setResult: () => {},
  setLoading: () => {}
});

export function useGameContext() {
  return useContext(GameContext);
}

export interface GameProps {
  children?: React.ReactNode;
}

export default function GameContextProvider({ children }: GameProps) {
  const [result, setResult] = useState<any>();
  const [loading, setLoading] = useState<LOADING_STATUS>(LOADING_STATUS.IDLE);

  return (
    <GameContext.Provider
      value={{
        result,
        loading,
        setResult,
        setLoading
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
