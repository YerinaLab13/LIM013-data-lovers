import { filteredPokemon, orderPokemonUpward, filteredName, filterGeneration, calculation} from '../src/data.js';
const testPokemon = {
  "pokemon":[ 
    { 
      "name": "charizard",
      "generation": {
        "num": "generation i",
        "name": "kanto"
      },
      "type": [
        "fire",
        "flying"]
    },
    {
      "name": "squirtle",
      "generation": {
        "num": "generation i",
        "name": "kanto"
      },
      "type": [
        "water"]
    },
    { 
      "name": "bulbasaur",
      "generation": {
        "num": "generation i",
        "name": "kanto"
      },
      "type": [
        "grass",
        "poison"]
    },
    {
    "name": "chikorita",
    "generation": {
      "num": "generation ii",
      "name": "johto",
    },
    "type": [
       "grass"]
    },
    
  ]
};

 const grassPokemon = [ 
  { 
    "name": "bulbasaur",
    "generation": {
      "num": "generation i",
      "name": "kanto"
    },
    "type": [
      "grass",
      "poison"]
    },
    {
      "name": "chikorita",
      "generation": {
        "num": "generation ii",
        "name": "johto",
      },
      "type": [
         "grass"]
      },
  ];

const pokemonAbc = {
  "pokemon":[ 
    { 
      "name": "bulbasaur",
      "generation": {
        "num": "generation i",
        "name": "kanto"
      },
      "type": [
        "grass",
        "poison"]
    },
    { 
      "name": "charizard",
      "generation": {
        "num": "generation i",
        "name": "kanto"
      },
      "type": [
        "fire",
        "flying"]
    },
    {
      "name": "chikorita",
      "generation": {
        "num": "generation ii",
        "name": "johto",
      },
      "type": [
         "grass"]
    },
    { 
      "name": "squirtle",
      "generation": {
        "num": "generation i",
        "name": "kanto"
      },
      "type": [
        "water"]
    }
]
 };

const pokeName = [
  {
    "name": "charizard",
    "generation": {
      "num": "generation i",
      "name": "kanto"
    },
    "type": [
      "fire",
      "flying"]
  }
]

const pokeName2 = [
  { 
    "name": "bulbasaur",
    "generation": {
      "num": "generation i",
      "name": "kanto"
    },
    "type": [
      "grass",
      "poison"]
  }
]

const pokeJohto = [
  {
  "name": "chikorita",
  "generation": {
    "num": "generation ii",
    "name": "johto",
  },
  "type": [
     "grass"]

  }
] 

const stats = {
      "base-attack": "118",
      "base-defense": "111",
      "base-stamina": "128",
      "max-cp": "1115",
      "max-hp": "113"
    }
  
describe('filteredPokemon', () => {
  it('is a function', () => {
    expect(typeof filteredPokemon).toBe('function');
  });

  it('returns `filteredPokemon`', () => {
    expect(filteredPokemon(testPokemon.pokemon,'grass')).toEqual(grassPokemon); //(expect.arrayContaining(expected)({'name':'bulbasaur','type':['grass','poison']}));
  });
});


describe('orderPokemonUpward', () => {
  it('is a function', () => {
    expect(typeof orderPokemonUpward).toBe('function');
  });

  it('returns `orderPokemonUpward`', () => {
    expect(orderPokemonUpward(testPokemon.pokemon)).toEqual(pokemonAbc.pokemon);
  });
});


describe('filteredName', () => {
  it('is a function', () => {
    expect(typeof filteredName).toBe('function');
  });

  it('returns `filteredName`', () => {
    expect(filteredName(testPokemon.pokemon,'cha')).toEqual(pokeName);
  });

  it('returns `filteredName`', () => {
    expect(filteredName(testPokemon.pokemon,'bul')).toEqual(pokeName2);
  });

});

describe('filterGeneration',() => {
  it('is a function', () => {
    expect(typeof filterGeneration).toBe('function');
  });
  it('returns`filterGeneration`', () => {
    expect(filterGeneration(testPokemon.pokemon,'johto')).toEqual(pokeJohto);
  })
})

describe('calculation',() => {
  it('is a function', () => {
    expect(typeof calculation).toBe('function');
  });
  it('returns `calculation`', () => {
    expect(calculation(stats)).toBe(1585);
  })
})