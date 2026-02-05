"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { ResultPack } from "@/lib/types";

interface TestContextValue {
  storedResult: ResultPack | null;
  setStoredResult: (result: ResultPack | null) => void;
}

const TestContext = createContext<TestContextValue | null>(null);

export function TestProvider({ children }: { children: ReactNode }) {
  const [storedResult, setStoredResult] = useState<ResultPack | null>(null);

  return (
    <TestContext.Provider value={{ storedResult, setStoredResult }}>
      {children}
    </TestContext.Provider>
  );
}

export function useTestContext() {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error("useTestContext must be used within a TestProvider");
  }
  return context;
}
