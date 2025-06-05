import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";

function SerieFormPage() {
    const { idserie } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(idserie);
    const [categories, setCategories] = useState([]);

    const defaultSeries = [
        { cod: 1, nom: "Friends", cat: "Comedy", img: "friends.png" },
        { cod: 2, nom: "Law & Order", cat: "Drama", img: "law-and-order.png" },
        { cod: 3, nom: "The Big Bang Theory", cat: "Comedy", img: "the-big-bang-theory.png" },
        { cod: 4, nom: "Stranger Things", cat: "Horror", img: "stranger-things.png" },
        { cod: 5, nom: "Dr. House", cat: "Drama", img: "dr-house.png" },
        { cod: 6, nom: "The X-Files", cat: "Drama", img: "the-x-files.png" }
    ];

    const [data, setData] = useState({
        nom: "",
        cat: "",
        img: ""
    });

    useEffect(() => {

        const savedCategories = JSON.parse(localStorage.getItem("categories")) || [];
        setCategories(savedCategories);
        const savedSeries = JSON.parse(localStorage.getItem("series"));
        if (!savedSeries || savedSeries.length === 0) {
            localStorage.setItem("series", JSON.stringify(defaultSeries));
        }

        if (isEdit) {
            const currentSeries = JSON.parse(localStorage.getItem("series")) || defaultSeries;
            const found = currentSeries.find(s => s.cod === parseInt(idserie));
            if (found) {
                setData({
                    nom: found.nom,
                    cat: found.cat,
                    img: found.img
                });
            }
        }
    }, [idserie]);

    const onChangeNombre = (e) => {
        setData({ ...data, nom: e.target.value });
    };

    const onChangeCategoria = (e) => {
        setData({ ...data, cat: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let savedSeries = JSON.parse(localStorage.getItem("series")) || defaultSeries;
        
        if (isEdit) {
            const updatedSeries = savedSeries.map(serie =>
                serie.cod === parseInt(idserie) ? { ...serie, ...data } : serie
            );
            localStorage.setItem("series", JSON.stringify(updatedSeries));
        } else {
            // Crear nueva serie
            const newCod = savedSeries.length > 0 ? Math.max(...savedSeries.map(s => s.cod)) + 1 : 1;
            const newSerie = { cod: newCod, ...data };
            const updatedSeries = [...savedSeries, newSerie];
            localStorage.setItem("series", JSON.stringify(updatedSeries));
        }
        
        navigate("/series");
    };

    // Resto del código del componente (igual que antes)
    return (
        <>
            <HeaderComponent />
            <div className="container mt-3">
                <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
                    <h3>{isEdit ? "Editar" : "Nueva"} Serie</h3>
                    <div>
                        <button onClick={() => navigate("/series")} className="btn btn-secondary me-2">Cancelar</button>
                        <button type="submit" className="btn btn-primary" form="serieForm">Guardar</button>
                    </div>
                </div>
                <form id="serieForm" className="row" onSubmit={handleSubmit}>
                    <div className="col-md-4 mb-3">
                        <img
                            className="card-img-top mb-3"
                            src={`https://dummyimage.com/400x250/000/fff&text=${data.img || "Imagen"}`}
                            alt="Preview"
                        />
                        <div className="mb-3">
                            <label htmlFor="img" className="form-label">Imagen</label>
                            <input
                                type="text"
                                className="form-control"
                                id="img"
                                value={data.img}
                                onChange={(e) => setData({ ...data, img: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="mb-3">
                            <label htmlFor="nom" className="form-label">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nom"
                                value={data.nom}
                                onChange={onChangeNombre}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cat" className="form-label">Categoría</label>
                            <select
                                className="form-select"
                                id="cat"
                                value={data.cat}
                                onChange={onChangeCategoria}
                            >
                                <option value="">Seleccione una categoría</option>
                                {categories.map(cat => (
                                    <option key={cat.cod} value={cat.nom}>{cat.nom}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default SerieFormPage;