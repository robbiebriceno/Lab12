import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SerieComponent from '../components/SerieComponent';

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function SeriePage() {
    const urlApi = 'http://localhost:8000/series/api/v1/series/';

    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchSeries();
    }, []);

    const fetchSeries = () => {
        setLoading(true);
        axios.get(urlApi)
            .then(response => {
                setSeries(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error al cargar las series:", error);
                setError('No se pudieron cargar las series.');
                setLoading(false);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta serie?')) {
            axios.delete(`${urlApi}${id}/`)
                .then(() => {
                    fetchSeries();
                })
                .catch((error) => {
                    console.error("Error al eliminar la serie:", error);
                    setError('No se pudo eliminar la serie.');
                });
        }
    };

      // Exportar CSV sin json2csv
  const exportToCSV = () => {
    const csvHeader = ['cod', 'nom', 'cat', 'img'];
    const csvRows = [
      csvHeader.join(','), // encabezados
      ...series.map(serie => [serie.id, serie.title, serie.category.name, serie.image_url].join(',')),
    ];

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'series.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

    // Exportar a PDF con jsPDF y autotable
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Lista de Series", 14, 15);

        const tableColumn = ["Código", "Nombre", "Categoría"];
        const tableRows = series.map((serie) => [
            serie.id,
            serie.title,
            serie.category.name,
        ]);

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.save("series.pdf");
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Series</h1>
                <button 
                    className="btn btn-primary"
                    onClick={() => navigate('/series/new')}
                >
                    Nueva Serie
                </button>
            </div>
            <div className="mb-3">
                <button onClick={exportToCSV} className="btn btn-success me-2">
                    Exportar a CSV
                </button>
                <button onClick={exportToPDF} className="btn btn-danger">
                    Exportar a PDF
                </button>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            {loading ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            ) : (
                <div className="row">
                    {series.length === 0 ? (
                        <div className="col-12">
                            <div className="alert alert-info">
                                No hay series disponibles. ¡Crea una nueva!
                            </div>
                        </div>
                    ) : (
                        series.map(serie => (
                            <div className="col-md-4 mb-3" key={serie.id}>
                                <SerieComponent 
                                    codigo={serie.id}
                                    titulo={serie.title}
                                    descripcion={serie.description}
                                    fecha={serie.release_date}
                                    rating={serie.rating}
                                    categoria={serie.category.name} 
                                    imagen={serie.image_url}
                                    onDelete={() => handleDelete(serie.id)}
                                />
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default SeriePage;