import React, { useState, useEffect } from "react";


export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(async () => {
    const response = await fetch('https://api.github.com/users/luskasouza/repos');
    const data = await response.json();

    setRepositories(data);
  }, []);

  useEffect(() => {
    const filtered = repositories.map(repo => repo.favorite);

    document.title = filtered.length;
  }, [repositories]);

  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo
    });

    setRepositories(newRepositories);

  }

  return (
    <table>
      {repositories.map(repo => (
        <tr key={repo.id}>
          <td >📘 {repo.name}</td>
          <td>{repo.favorite && <samp>(Favorito 🌟)</samp>}</td>
          <td><button onClick={() => handleFavorite(repo.id)}>Favoritar</button></td>
        </tr>
      ))}
    </table >
  );
}