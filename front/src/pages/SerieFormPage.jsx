import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function SerieFormPage() {
    const urlApiSeries = 'http://localhost:8000/series/api/v1/series/';
    const urlApiCategories = 'http://localhost:8000/series/api/v1/categories/';

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [rating, setRating] = useState('');
    const [category, setCategory] = useState(''); 
    const [imageUrl, setImageUrl] = useState('');
    
    const [categories, setCategories] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;


    useEffect(() => {
        axios.get(urlApiCategories)
            .then(response => setCategories(response.data))
            .catch(err => {
                console.error("Error al cargar categorías:", err);
                setError('No se pudieron cargar las categorías. El formulario no puede funcionar.');
            });
    }, []); 

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            axios.get(`${urlApiSeries}${id}/`)
                .then(response => {
                    const serie = response.data;
                    setTitle(serie.title);
                    setDescription(serie.description);
                    setReleaseDate(serie.release_date);
                    setRating(serie.rating);
                    setCategory(serie.category.id); 
                    setImageUrl(serie.image_url || '');
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Error al cargar la serie:", err);
                    setError('No se pudo cargar la serie para editar.');
                    setLoading(false);
                });
        }
    }, [id, isEditMode]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const serieData = {
            title,
            description,
            release_date: releaseDate,
            rating,
            category, 
            image_url: imageUrl
        };
        const request = isEditMode
            ? axios.put(`${urlApiSeries}${id}/`, serieData)
            : axios.post(urlApiSeries, serieData);

        request
            .then(() => {
                setLoading(false);
                navigate('/series'); 
            })
            .catch(err => {
                console.error("Error al guardar la serie:", err);
                setError('Hubo un problema al guardar. Verifica que todos los campos estén correctos.');
                setLoading(false);
            });
    };

    return (
        <div className="container mt-4">
            <h2>{isEditMode ? 'Editar Serie' : 'Nueva Serie'}</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {loading ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    {}
                    <div className="mb-3">
                        <label className="form-label">Título</label>
                        <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Descripción</label>
                        <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Fecha de estreno</label>
                        <input type="date" className="form-control" value={releaseDate} onChange={e => setReleaseDate(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Rating</label>
                        <input type="number" className="form-control" value={rating} onChange={e => setRating(e.target.value)} min="0" max="10" step="0.1" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Categoría</label>
                        <select className="form-select" value={category} onChange={e => setCategory(e.target.value)} required>
                            <option value="">Selecciona una categoría</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">URL de imagen</label>
                        <input type="url" className="form-control" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                        <button type="button" className="btn btn-secondary" onClick={() => navigate('/series')}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Guardando...' : (isEditMode ? 'Actualizar' : 'Crear Serie')}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default SerieFormPage;