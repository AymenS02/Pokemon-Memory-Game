// api.js
export async function fetchPokemonData(set) {
  const getRandomNumbers = (min, max, count) => {
    const numbers = new Set();
    while (numbers.size < count) {
      const num = Math.floor(Math.random() * (max - min + 1) + min);
      numbers.add(num);
    }
    return Array.from(numbers);
  };

  const randomNumbers = getRandomNumbers(1, 649, set);
  const promises = randomNumbers.map((number) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${number}`).then((response) =>
      response.json()
    )
  );

  try {
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error('DATA FAILED TO LOAD:', error);
    return [];
  }
}