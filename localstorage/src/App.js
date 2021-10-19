import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useLocalStorage } from './useLocalStorage';

function App() {
  const removePrueba = () => {
    let newPrueba = '';

    setPrueba(newPrueba);
  };

  const addPrueba = () => {
    let newPrueba = 'prueba';

    setPrueba(newPrueba);
  };

  const [prueba, setPrueba] = useLocalStorage('prueba', '');
  const [prueba2, setPrueba2] = useLocalStorage('prueba2', 0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code></code> and save to reload.
        </p>
        <textarea
          onChange={(e) => setPrueba(e.target.value)}
          value={prueba}
        ></textarea>
        <p>{prueba2}</p>
        <button onClick={() => setPrueba2(prueba2 + 1)}></button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={removePrueba}>prueba</button>
        <button onClick={addPrueba}>prueba 2</button>
      </header>
    </div>
  );
}

export default App;
