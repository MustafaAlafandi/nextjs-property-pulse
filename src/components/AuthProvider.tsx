"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

interface authProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: authProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default AuthProvider;
