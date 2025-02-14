import { useState, useEffect } from 'react';
import { fetchPokemonData } from './api.jsx';
import { useCounter } from './counter.jsx';
import { item } from './motion.jsx';
import pLogo from './assets/pLogo.png';
import { motion } from 'framer-motion';

function App() {

  const startTime = 2500;

  const [pokemonData, setPokemonData] = useState([]);
  const [touchedPokemon, setTouchedPokemon] = useState([]);
  const { count, setCount, bestCount, setBestCount, timer, setTimer, start, setStart, resetCounter }  = useCounter(startTime);


  let set = 15;

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchPokemonData(set);
      setPokemonData(data);
    };
    loadData();
  }, [set]);




  async function fetchNewPokemonSet() {
    const data = await fetchPokemonData(set);
    setPokemonData(data);
  }




  function handleCardClick(pokemonName) {
    if (!touchedPokemon.includes(pokemonName)) {
      setCount((prevCount) => prevCount + 1);
      setTouchedPokemon([...touchedPokemon, pokemonName]);
      setTimer(startTime);
    } else {
      if (count > bestCount) {
        setBestCount(count);
      }
      resetCounter();
      setTimeout(async () => {
        await fetchNewPokemonSet();
      }, 1000);
    }
    shuffleArray(pokemonData);
  }




  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }




  if (count === set) {
    alert("You win!");
    resetCounter();
    setTimeout(async () => {
      await fetchNewPokemonSet();
    }, 1000);
  }




  return (
    <div className='bg-blue-diagonal relative min-h-screen text-white overflow-hidden'>

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-gray-200/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-200/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 90, 180],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-2/3 right-2/3 w-72 h-72 bg-gray-200/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          rotate: [180, 90, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-2/3 left-2/3 w-80 h-80 bg-gray-200/30 rounded-full blur-3xl"
      />

      <div className="relative z-10">
        <nav className="pt-5 px-4 flex justify-between items-center pb-2">
          <img className="w-32 pb-2" src={pLogo} alt="Pokemon Logo" />

          <div className="flex space-x-4">
            <h2 className="text-lg font-bold px-6 py-2 bg-blue-500 rounded-l-md border border-black">Timer: {timer}</h2>
            <h2 className="text-lg font-bold px-6 py-2 bg-blue-500 border border-black">Score: {count}</h2>
            <h2 className="text-lg font-bold px-6 py-2 bg-blue-500 rounded-r-md border border-black">Best Score: {bestCount}</h2>
          </div>

          {start && (
            <button 
              className="text-lg font-bold px-4 py-2 border border-black rounded-lg bg-blue-500 shadow-md hover:scale-105 hover:shadow-lg hover:text-gray-100"
              onClick={() => { setStart(!start); setCount(0); }}
            >
              {start ? 'Stop' : 'Start'}
            </button>
          )}

          <button 
            className="text-lg font-bold px-4 py-2 border border-black rounded-lg bg-blue-500 shadow-md hover:scale-105 hover:shadow-lg hover:text-gray-100"
            onClick={() => { fetchNewPokemonSet(); setTimer(25); }}
          >
            New Pokemon Set
          </button>

          <button 
            className="text-lg font-bold px-4 py-2 border border-black rounded-lg bg-blue-500 shadow-md hover:scale-105 hover:shadow-lg hover:text-gray-100"
            onClick={() => { setBestCount(0); }}
          >
            Reset Best Score
          </button>
        </nav>

        <p className="pl-2 mt-1">Get points by clicking on an image but don&apos;t click on any more than once!</p>
        <hr className="border-black border-2 mt-4 mb-2" />

        {!start && (
          <div className="flex justify-center items-center h-[80vh]">
            <button 
              className="
              bg-blue-400 hover:scale-105 duration-300 ease-in-out border-2 border-black rounded-lg shadow-2xl 
              text-white font-bold text-outline text-4xl p-10"
              onClick={() => { setStart(!start); setCount(0); setTimer(startTime); }}
            >
              {start ? 'Stop' : 'PLAY'}
            </button>
          </div>
        )}
        
        {start && (
          <motion.div
            initial="hidden"
            animate="visible"
            className="bg-gray-200  m-20 rounded-2xl border-2 border-black flex flex-wrap justify-evenly gap-4 p-2"
          >
            {pokemonData.map((pokemon, index) => (
              <motion.div
                key={index}
                className="w-[20vw] bg-blue-500 flex flex-col justify-between items-center p-2 border border-black rounded-md transition-transform duration-100 ease-in-out hover:scale-105 hover:shadow-lg"
                onClick={() => handleCardClick(pokemon.name)}
                variants={item} // Use the item animation
              >
                <img
                  className="w-36 h-36 pb-2 border-b-2 border-black"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                  alt="ERROR"
                />
                <p className="pt-2 font-bold">{pokemon.name}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default App;