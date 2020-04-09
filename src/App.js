import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [techs, setTechs] = useState("");

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository(e) {
    e.preventDefault();
    const response = await api.post("repositories", {
      title,
      url,
      techs,
    });

    setRepositories([...repositories, response.data]);
    setTitle("");
    setTechs("");
    setUrl("");
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`);

    setRepositories(repositories.filter((rep) => rep.id !== id));
  }

  return (
    <div className="container">
      <ul data-testid="repository-list">
        {repositories.map((rep) => (
          <li key={rep.id}>
            {rep.title}
            <button
              className="button"
              onClick={() => handleRemoveRepository(rep.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddRepository}>
        <input
          type="text"
          placeholder="Titulo"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Tecnologias"
          value={techs}
          onChange={(e) => {
            setTechs(e.target.value);
          }}
        />

        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}

export default App;
