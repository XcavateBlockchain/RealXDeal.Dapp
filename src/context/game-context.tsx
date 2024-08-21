'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface GameContextInterface {
  result: any;
  setResult: (data: any) => void;
}

const GameContext = React.createContext<GameContextInterface>({
  result: null,
  setResult: () => {}
});

export function useGameContext() {
  return useContext(GameContext);
}

export interface GameProps {
  children?: React.ReactNode;
}

export default function GameContextProvider({ children }: GameProps) {
  const [result, setResult] = useState<any>();
  return (
    <GameContext.Provider
      value={{
        result,
        setResult
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
