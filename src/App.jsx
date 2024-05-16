import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [notas, setNotas] = useState([{ id: 1, value: '' }]);
  const [promedio, setPromedio] = useState(0);

  const handleNotaChange = (id, value) => {
    const nuevasNotas = notas.map(nota => 
      nota.id === id ? { ...nota, value: parseFloat(value) || '' } : nota
    );
    setNotas(nuevasNotas);
    calcularPromedio(nuevasNotas);
  };

  const agregarNota = () => {
    const nuevaNota = { id: notas.length + 1, value: '' };
    setNotas([...notas, nuevaNota]);
  };

  const eliminarNotas = () => {
    setNotas([{ id: 1, value: '' }]);
    setPromedio(0);
  };

  const calcularPromedio = (notas) => {
    const valoresValidos = notas
      .map(nota => nota.value)
      .filter(value => value !== '');
    const suma = valoresValidos.reduce((acc, curr) => acc + curr, 0);
    const promedio = valoresValidos.length > 0 ? suma / valoresValidos.length : 0;
    setPromedio(promedio);
  };

  return (
    <div className="App">
      <h1>Calculadora de Promedio de Notas</h1>
      {notas.map((nota, index) => (
        <div key={nota.id}>
          <input
            type="number"
            placeholder={`Nota ${index + 1}`}
            value={nota.value}
            onChange={(e) => handleNotaChange(nota.id, e.target.value)}
          />
        </div>
      ))}
      <button onClick={agregarNota}>Agregar Nota</button>
      <button onClick={eliminarNotas}>Eliminar Todas las Notas</button>
      <h2>Promedio: {promedio.toFixed(2)}</h2>
    </div>
  );
};

export default App;

