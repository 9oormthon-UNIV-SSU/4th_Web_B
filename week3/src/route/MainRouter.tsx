import MainPage from "@/page/main/page";
import { Layout } from "@/route/Layout";
import { Route, Routes } from "react-router-dom";

export default function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<MainPage />} />
      </Route>
    </Routes>
  );
}
