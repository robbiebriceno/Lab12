import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import HeaderComponent from "../components/HeaderComponent";


function CategoryFormPage() {
    const urlApi = 'http://localhost:8000/series/api/v1/categories/';

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState('');
    
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            axios.get(`${urlApi}${id}/`)
                .then(response => {
                    const { name, description } = response.data;
                    setName(name);
                    setDescription(description || ''); 
                    setLoading(false);
                })
                .catch(() => {
                    setError('No se pudo cargar la categoría para editar.');
                    setLoading(false);
                });
        }
    }, [id, isEditMode]); 

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setError('El nombre de la categoría es obligatorio.');
            return;
        }

        setLoading(true);
        setError('');

        const categoryData = { name, description };

        const request = isEditMode
            ? axios.put(`${urlApi}${id}/`, categoryData) 
            : axios.post(urlApi, categoryData);

        request
            .then(() => {
                setLoading(false);
                navigate('/categories'); 
            })
            .catch((err) => {
                console.error("Error al guardar la categoría:", err);
                setError('No se pudo guardar la categoría. Por favor, intenta de nuevo.');
                setLoading(false);
            });
    };

    return (
        <div className="container mt-4">
            <h2>{isEditMode ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
            
            {error && <div className="alert alert-danger">{error}</div>}

            {loading && !error ? ( 
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="categoryName" className="form-label">Nombre</label>
                        <input
                            id="categoryName"
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="categoryDescription" className="form-label">Descripción</label>
                        <textarea
                            id="categoryDescription"
                            className="form-control"
                            rows="3"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-end gap-2"> {}
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate('/categories')}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Guardando...' : (isEditMode ? 'Actualizar' : 'Crear Categoría')}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default CategoryFormPage;