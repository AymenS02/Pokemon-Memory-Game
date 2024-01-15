import './App.css';
import React, { useEffect, useState } from 'react';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [touchedPokemon, setTouchedPokemon] = useState([]);
  const [count, setCount] = useState(0);
  const [bestCount, setBestCount] = useState(0);

  useEffect(() => {
    // Generate an array of 15 unique random numbers between 1 and 649
    const getRandomNumbers = (min, max, count) => {
      const numbers = new Set();
      while (numbers.size < count) {
        const num = Math.floor(Math.random() * (max - min + 1) + min);
        numbers.add(num);
      }
      return Array.from(numbers);
    };

    const randomNumbers = getRandomNumbers(1, 649, 15);

    // Fetch Pokemon data using the generated random numbers
    const fetchData = async () => {
      const promises = randomNumbers.map(number =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
          .then(response => response.json())
      );

      try {
        const results = await Promise.all(promises);
        setPokemonData(results);
        console.log(results);
      } catch (error) {
        console.error('DATA FAILED TO LOAD IN EFFECT:', error);
      }
    };

    fetchData();
  }, []);

  function handleCardClick(pokemonName) {
    console.log("Touched", pokemonName);
    if (!touchedPokemon.includes(pokemonName)) {
      setCount(prevCount => prevCount + 1);
      setTouchedPokemon([...touchedPokemon, pokemonName]);
    } else {
      if (count > bestCount) {
        setBestCount(count);
      }
      setCount(0);
      setTouchedPokemon([]);
    }
    shuffleArray(pokemonData);
  }

  return (
    <>
      <img className="logo" src="\src\assets\pLogo.png" alt="Pokemon Logo" />
      <nav className='nav-bar'>
        <h1>Pokemon Memory Game!</h1>
        <h2>Score: {count}</h2>
        <h2>Best Score: {bestCount}</h2>
        <button onClick={() => {setBestCount(0)}}>Reset Best Score</button>
      </nav>
      <p>Get points by clicking on an image but don't click on any more than once!</p>
      <hr></hr>
      <div className='cardGrid'>
        {pokemonData.map((pokemon, index) => (
          <div key={index} className='card' onClick={() => handleCardClick(pokemon.name)}>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} alt="ERROR" />
            <p className='card-name'>{pokemon.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;

