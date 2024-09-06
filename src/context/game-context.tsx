'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface GameContextInterface {
  result: any;
  currentBlock: any;
  endingBlock: any;
  setResult: (data: any) => void;
  setCurrentBlock: (data: any) => void;
  setEndingBlock: (data: any) => void;
}

const GameContext = React.createContext<GameContextInterface>({
  result: null,
  currentBlock: null,
  endingBlock: null,
  setResult: () => {},
  setCurrentBlock: () => {},
  setEndingBlock: () => {}
});

export function useGameContext() {
  return useContext(GameContext);
}

export interface GameProps {
  children?: React.ReactNode;
}

export default function GameContextProvider({ children }: GameProps) {
  const [result, setResult] = useState<any>();
  const [currentBlock, setCurrentBlock] = useState();
  const [endingBlock, setEndingBlock] = useState();

  return (
    <GameContext.Provider
      value={{
        result,
        currentBlock,
        endingBlock,
        setResult,
        setCurrentBlock,
        setEndingBlock
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
