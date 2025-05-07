import Header from "@/layout/Header";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow">
        <Header />
        <Outlet />
      </main>
    </div>
  );
}
