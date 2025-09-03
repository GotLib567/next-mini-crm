"use client";
import { createContext, useContext } from "react";
export const CompanyCtx = createContext<{ company: { id: string } } | null>(null);
export const CompanyProvider = CompanyCtx.Provider;
export const useCompany = () => {
  const ctx = useContext(CompanyCtx);
  if (!ctx) throw new Error("useCompany must be used within CompanyProvider");
  return ctx.company;
};
