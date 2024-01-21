import './App.css';
import React, { useEffect, useState } from 'react';
import pLogo from './assets/pLogo.png';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const shakeGridVariant = {
  hidden: { opacity: 0, scale: 0 },
  shake: {
    x: [0, -10, 10, -10, 10, 0],
  },
};

function getRandomNumbers(min, max, count) {
  const numbers = new Set();
  while (numbers.size < count) {
    const num = Math.floor(Math.random() * (max - min + 1) + min);
    numbers.add(num);
  }
  return Array.from(numbers);
}

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
  const [isShakeGrid, setIsShakeGrid] = useState(false);  // Renamed to avoid conflict

  useEffect(() => {
    const getRandomNumbers = (min, max, count) => {
      const numbers = new Set();
      while (numbers.size < count) {
        const num = Math.floor(Math.random() * (max - min + 1) + min);
        numbers.add(num);
      }
      return Array.from(numbers);
    };

    const fetchData = async () => {
      const randomNumbers = getRandomNumbers(1, 649, 15);
      const promises = randomNumbers.map((number) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${number}`).then((response) =>
          response.json()
        )
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

  async function fetchNewPokemonSet() {
    const randomNumbers = getRandomNumbers(1, 649, 15);
    const promises = randomNumbers.map((number) =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${number}`).then((response) =>
        response.json()
      )
    );

    try {
      const results = await Promise.all(promises);
      setPokemonData(results);
    } catch (error) {
      console.error('DATA FAILED TO LOAD:', error);
    }
  }

  function handleCardClick(pokemonName) {
    console.log('Touched', pokemonName);
    if (!touchedPokemon.includes(pokemonName)) {
      setCount((prevCount) => prevCount + 1);
      setTouchedPokemon([...touchedPokemon, pokemonName]);
    } else {
      if (count > bestCount) {
        setBestCount(count);
      }
      setCount(0);
      setTouchedPokemon([]);
      setIsShakeGrid(true);

      setTimeout(async () => {
        setIsShakeGrid(false); // Reset isShakeGrid state
        await fetchNewPokemonSet();
      }, 1000); // Adjust the delay duration in milliseconds as needed
    }
    shuffleArray(pokemonData);
  }

  return (
    <>
      <nav className='nav-bar'>
        <h1>Pokemon Memory Game!</h1>
        <img className="logo" src={pLogo} alt="Pokemon Logo" />
        <h2>Score: {count}</h2>
        <h2>Best Score: {bestCount}</h2>
        <button onClick={() => {setBestCount(0)}}>Reset Best Score</button>
      </nav>
      <p className='rules'>Get points by clicking on an image but don't click on any more than once!</p>
      <hr></hr>

      <motion.div
        variants={isShakeGrid ? shakeGridVariant : container}
        initial="hidden"
        animate={isShakeGrid ? 'shake' : 'visible'}
        className={`cardGrid ${isShakeGrid ? 'shake' : ''}`}
        whileHover={isShakeGrid ? 'shake' : ''}
        onAnimationComplete={() => setIsShakeGrid(false)}
      >
        {pokemonData.map((pokemon, index) => (
          <motion.div
            key={index}
            className='card'
            onClick={() => handleCardClick(pokemon.name)}
            variants={item}
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
              alt="ERROR"
            />
            <p className='card-name'>{pokemon.name}</p>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}

export default App;


