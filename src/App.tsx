// src/App.tsx
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppLayout } from "./app/AppLayout";
import { AppRoutes } from "./app/routes";

const queryClient = new QueryClient();

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </QueryClientProvider>
  );
};

export default App;
