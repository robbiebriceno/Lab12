import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";

function CategoryPage() {

    const urlApi = 'http://localhost:8000/series/api/v1/categories';
    const [categories, setCategories] = useState([]);

    // Inicializar categorías
    useEffect(() => {
        const savedCategories = JSON.parse(localStorage.getItem("categories"));
        
        // Si no hay categorías guardadas, inicializar con las por defecto
        if (!savedCategories || savedCategories.length === 0) {
            const defaultCategories = [
                { cod: 1, nom: "Horror" },
                { cod: 2, nom: "Comedy" },
                { cod: 3, nom: "Action" },
                { cod: 4, nom: "Drama" }
            ];
            localStorage.setItem("categories", JSON.stringify(defaultCategories));
            setCategories(defaultCategories);
        } else {
            setCategories(savedCategories);
        }
    }, []);

    const handleDelete = (cod) => {
        const updatedCategories = categories.filter(cat => cat.cod !== cod);
        localStorage.setItem("categories", JSON.stringify(updatedCategories));
        setCategories(updatedCategories);
    };

    const loadData = async () => {
        const resp = await axios.get(urlApi);
        console.log(resp.data);
        setCategories(resp.data);
    };

    return (
        <>
            <HeaderComponent />
            <div className="container mt-3">
                <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
                    <h3>Categorías</h3>
                    <Link to="/categories/new" className="btn btn-primary">Nueva Categoría</Link>
                </div>
                
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(cat => (
                            <tr key={cat.cod}>
                                <td>{cat.cod}</td>
                                <td>{cat.nom}</td>
                                <td>
                                    <Link 
                                        to={`/categories/edit/${cat.cod}`} 
                                        className="btn btn-sm btn-warning me-2"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(cat.cod)}
                                        className="btn btn-sm btn-danger"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default CategoryPage;