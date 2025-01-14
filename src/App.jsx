import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [animals, setAnimals] = useState([]);
  useEffect(()=> {
    const lastQuery = localStorage.getItem('lastQuery')
    search(lastQuery)
  }, [])

  const search = async (q) => {
    const response = await fetch(
      "http://localhost:8080?" + new URLSearchParams({ q })
    );

    const data = await response.json();
    setAnimals(data);

    localStorage.setItem("lastQuery", q)
  };

  return (
    <main>
      <h1>Animal Farm</h1>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => search(e.target.value)}
        className="input"
      />
      {animals.length === 0 && <p>No animals found</p>}
      <ul>
        {animals.map((animal) => (
          <li key={animal.id}>
            <strong>{animal.type}</strong> - {animal.name}, {animal.age} years old
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
