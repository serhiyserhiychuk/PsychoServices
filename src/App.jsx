import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const PsychologistsPage = lazy(() =>
  import("./pages/PsychologistsPage/PsychologistsPage")
);
const FavoritesPage = lazy(() => import("./pages/FavoritesPage/FavoritesPage"));
import Loader from "./components/Loader/Loader";
import Navigation from "./components/Navigation/Navigation";

const App = () => {
  return (
    <>
      <Toaster />
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/psychologists" element={<PsychologistsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
