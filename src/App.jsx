import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Dashboard from "./Dashboard";

// App component
const App = () => {
  return (
    <main className="flex flex-col items-center p-20">
      <h1 className="text-5xl text-dark font-bold mb-5">HSL Aikataulut</h1>
      <Dashboard />
    </main>
  );
};

export default App;
