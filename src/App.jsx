import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import SeriePage from "./pages/SeriePage";
import SerieFormPage from "./pages/SerieFormPage"
import CategoryFormPage from "./pages/CategoryFormPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/series" element={<SeriePage />} />
        <Route path='/series/edit/:id' element={<SerieFormPage />} />
        <Route path='/series/new' element={<SerieFormPage />} />
        <Route path='/categories/new' element={<CategoryFormPage />} />
        <Route path='/categories/edit/:idcategory' element={<CategoryFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;