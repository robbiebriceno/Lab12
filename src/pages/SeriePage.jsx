import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function SeriePage() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const savedSeries = JSON.parse(localStorage.getItem("series"));

    if (!savedSeries || savedSeries.length === 0) {
      const defaultSeries = [
        { cod: 1, nom: "Friends", cat: "Comedy", img: "friends.png" },
        { cod: 2, nom: "Law & Order", cat: "Drama", img: "law-and-order.png" },
        { cod: 3, nom: "The Big Bang Theory", cat: "Comedy", img: "the-big-bang.png" },
        { cod: 4, nom: "Stranger Things", cat: "Horror", img: "stranger-things.png" },
        { cod: 5, nom: "Dr. House", cat: "Drama", img: "dr-house.png" },
        { cod: 6, nom: "The X-Files", cat: "Drama", img: "the-x-files.png" },
      ];
      localStorage.setItem("series", JSON.stringify(defaultSeries));
      setSeries(defaultSeries);
    } else {
      setSeries(savedSeries);
    }
  }, []);

  const handleDelete = (cod) => {
    const updatedSeries = series.filter((serie) => serie.cod !== cod);
    localStorage.setItem("series", JSON.stringify(updatedSeries));
    setSeries(updatedSeries);
  };

  // Exportar CSV sin json2csv
  const exportToCSV = () => {
    const csvHeader = ['cod', 'nom', 'cat', 'img'];
    const csvRows = [
      csvHeader.join(','), // encabezados
      ...series.map(serie => [serie.cod, serie.nom, serie.cat, serie.img].join(',')),
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
    serie.cod,
    serie.nom,
    serie.cat,
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
  });

  doc.save("series.pdf");
};


  return (
    <>
      <HeaderComponent />
      <div className="container mt-3">
        <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
          <h3>Series</h3>
          <Link to="/series/new" className="btn btn-primary">
            Nueva Serie
          </Link>
        </div>

        <div className="mb-3">
          <button onClick={exportToCSV} className="btn btn-success me-2">
            Exportar a CSV
          </button>
          <button onClick={exportToPDF} className="btn btn-danger">
            Exportar a PDF
          </button>
        </div>

        <div className="row">
          {series.map((serie) => (
            <div key={serie.cod} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={`https://dummyimage.com/400x250/000/fff&text=${serie.img || "Imagen"}`}
                  className="card-img-top"
                  alt={serie.nom}
                />
                <div className="card-body">
                  <h5 className="card-title">{serie.nom}</h5>
                  <p className="card-text">{serie.cat}</p>
                  <div className="d-flex justify-content-between">
                    <Link
                      to={`/series/edit/${serie.cod}`}
                      className="btn btn-warning"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(serie.cod)}
                      className="btn btn-danger"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SeriePage;
