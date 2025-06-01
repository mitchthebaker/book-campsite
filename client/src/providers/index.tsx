
import React from "react";
import { AuthProvider } from "./AuthProvider";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      {children}  
    </AuthProvider>
  );
}