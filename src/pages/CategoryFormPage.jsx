import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderComponent from "../components/HeaderComponent";


function CategoryFormPage() {
  const navigate = useNavigate();
  const { idcategory } = useParams();
  const isEdit = Boolean(idcategory);

  const [data, setData] = useState({ nom: "" });

  useEffect(() => {
    const savedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    if (isEdit) {
      const category = savedCategories.find(c => c.cod === parseInt(idcategory));
      if (category) {
        setData({ nom: category.nom });
      }
    }
  }, [idcategory]);

  const onChangeNombre = (e) => {
    setData({ ...data, nom: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    if (isEdit) {
      const updated = savedCategories.map(cat =>
        cat.cod === parseInt(idcategory) ? { ...cat, nom: data.nom } : cat
      );
      localStorage.setItem("categories", JSON.stringify(updated));
    } else {
      const newCod = savedCategories.length > 0 ? Math.max(...savedCategories.map(c => c.cod)) + 1 : 1;
      savedCategories.push({ cod: newCod, nom: data.nom });
      localStorage.setItem("categories", JSON.stringify(savedCategories));
    }

    // Mostrar datos como pide el laboratorio
    console.log("Datos enviados:", data);
    navigate("/categories");
  };

  return (
    <>
      <HeaderComponent />
      <div className="container mt-3">
        <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
          <h3>{isEdit ? "Editar" : "Nueva"} Categoría</h3>
          <button
            onClick={() => navigate('/categories')}
            className="btn btn-secondary"
          >
            Cancelar
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              required
              value={data.nom}
              onChange={onChangeNombre}
            />
          </div>
          <button type="submit" className="btn btn-primary">Guardar</button>
        </form>
      </div>
    </>
  );
}

export default CategoryFormPage;


