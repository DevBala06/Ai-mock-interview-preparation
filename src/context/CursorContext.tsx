
"use client"
import React, { createContext, useContext, useState, ReactNode, RefObject } from 'react';

interface CursorContextType {
  cursorRef: RefObject<HTMLDivElement> | null;
  setCursorRef: React.Dispatch<React.SetStateAction<RefObject<HTMLDivElement> | null>>;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const useCursor = (): CursorContextType => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};

export const CursorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cursorRef, setCursorRef] = useState<RefObject<HTMLDivElement> | null>(null);

  return (
    <CursorContext.Provider value={{ cursorRef, setCursorRef }}>
      {children}
    </CursorContext.Provider>
  );
};
