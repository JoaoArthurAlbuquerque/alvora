// src/App.tsx
import React, { useState } from "react";
import { AppLayout } from "./app/Applayout";
import { AppRoutes } from "./app/routes";
import { LoginPage } from "./modules/autenticacao/LoginPage";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <AppLayout>
      <AppRoutes />
    </AppLayout>
  );
}
