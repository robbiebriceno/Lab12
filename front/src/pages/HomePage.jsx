import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";

function HomePage() {
  const navigate = useNavigate();

  const [seriesCount, setSeriesCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);

  useEffect(() => {
    const series = JSON.parse(localStorage.getItem("series")) || [];
    const categories = JSON.parse(localStorage.getItem("categories")) || [];

    setSeriesCount(series.length);
    setCategoriesCount(categories.length);
  }, []);

  return (
    <>

      <div className="container mt-3">
        <div className="border-bottom pb-3 mb-3">
          <h3>Inicio</h3>
          <p className="text-muted">Bienvenido a tu sistema de gestión de series.</p>
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <div className="card text-bg-primary mb-3">
              <div className="card-body">
                <h5 className="card-title">Series registradas</h5>
                <p className="card-text fs-3">{seriesCount}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card text-bg-warning mb-3">
              <div className="card-body">
                <h5 className="card-title">Categorías registradas</h5>
                <p className="card-text fs-3">{categoriesCount}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="d-grid gap-2 d-md-block">
          <button onClick={() => navigate('/series')} className="btn btn-outline-primary me-2">Ver Series</button>
          <button onClick={() => navigate('/series/new')} className="btn btn-outline-success me-2">Nueva Serie</button>
          <button onClick={() => navigate('/categories')} className="btn btn-outline-secondary me-2">Ver Categorías</button>
          <button onClick={() => navigate('/categories/new')} className="btn btn-outline-info">Nueva Categoría</button>
        </div>
      </div>
    </>
  );
}

export default HomePage;
