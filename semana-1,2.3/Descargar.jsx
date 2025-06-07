import React from 'react';

function Descargar({ format, setFormat, filteredProducts, mensaje, setMensaje, tipoMensaje, setTipoMensaje}) {

  const handleExport = () => {
    try {
      if (format === 'json') {
        const blob = new Blob([JSON.stringify(filteredProducts, null, 2)], { type: 'application/json' }); //obtener el objeto 
        const url = URL.createObjectURL(blob); // crear un objeto URL para el blob
        triggerDownload(url, "productos.json");


      } else if (format === "csv") {
        const headers = Object.keys(filteredProducts[0]).join(','); // Este es el encabezado del CSV 
        const rows = filteredProducts.map(obj =>
          Object.values(obj).join(",")
        ).join("\n"); // Este es el cuerpo del CSV 

        const csv = `${headers}\n${rows}`; // se combina el encabezado y los datos
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob); // creamos un objeto URL para el blob otra vez 
        triggerDownload(url, "productos.csv")

      } else if (format === "excel") {
        const headers = Object.keys(filteredProducts[0]).join(',');
        const rows = filteredProducts.map(obj =>
          Object.values(obj).join(',')
        ).join('\n');

        const excel = `${headers}\n${rows}`;
        const blob = new Blob([excel], { type: 'application/vnd.ms-excel' });
        const url = URL.createObjectURL(blob);
        triggerDownload(url, 'productos.xls');

      }

      setMensaje("Archivo exportado con éxito");
      setTipoMensaje("exito");
      setTimeout(() => setMensaje(null), 3000);

    } catch {
      setMensaje("Error al exportar archivo");
      setTipoMensaje("error");
      setTimeout(() => setMensaje(null), 3000);

    }
  };

  const triggerDownload = (url, filename) => {
    //crear el hipervinculo
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;  //creada la etiqueta 
    //agregamos la etiqueta al DOM
    document.body.appendChild(link);
    // simulamos el click en el elemento 
    link.click();
    //eliminar el elemento del anchor 
    document.body.removeChild(link);
  };

  return (
    <>
      {/*seleccion de los formatos de descarga*/}
      <select onChange={(e) => setFormat(e.target.value)} value={format} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300">
        <option value="">Seleccionar formáto</option>
        <option value="json">JSON</option>
        <option value="csv">CSV</option>
        <option value="excel">EXCEL</option>

      </select>
      <button onClick={handleExport} className="px-4 py-2 bg-orange-200 hover:bg-orange-300 text-orange-800 font-semibold rounded-md shadow transition duration-200"
      >Exportar archivo</button>

  
  {mensaje && (
  <p
    className={`mt-2 p-2 rounded ${
      tipoMensaje === "exito"
        ? "bg-green-200 text-green-800"
        : "bg-red-200 text-red-800"
    }`}
  >
    {mensaje}
  </p>
  )}
    </>
  );
}

export default Descargar;

