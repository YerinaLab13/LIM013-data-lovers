import { filteredPokemon, orderPokemonUpward } from "./data.js"; //fijo
// import data from './data/lol/lol.js';
import data from "./data/pokemon/pokemon.js"; //fijo
// import data from './data/rickandmorty/rickandmorty.js';

let allPokemon = data.pokemon;

//mostrar pokémons
function pokemonTemplate(poke) {
    const quickMovesPoke= poke["quick-move"];
    const statsQuickMove= quickMovesPoke.map((movement)=>{
        return `
        <p>${movement.name}</p>
        <p>${movement.energy/movement["move-duration-seg"]}</p>`
    }).join("")
    const attackMoves = poke["special-attack"];

    const statsAttackMove = attackMoves.map((movement)=>{
        return `
           <p> ${movement.name} </p>
           <p> ${movement.energy / movement["move-duration-seg"]}</p>
        `
     }).join("")
     

    return `
        <div class='poke'>  
              
        <p class = 'poke-num'> ${poke.num}</p>
        <img class ='poke-img' src='${poke.img}'>
        <p class= 'poke-name'> ${poke.name}</p> 
        <div>${statsQuickMove}</div>  
        <div> ${statsAttackMove} </div>
        </div>
        `;
}

let root = document.getElementById("root");
root.innerHTML = `
    <div class = 'pokedex'>${allPokemon.map(pokemonTemplate).join("")}</div>
    `;
// ------------------------Filtrar por tipo------------------------
let list = document.getElementById("list");
list.addEventListener("change", () => {
    let typePokemon = allPokemon;
    let selectValue = list.value;
    // filtra si la seleccion es diferente a all pokemon
    if (selectValue !== "allPokemon") {
        typePokemon = filteredPokemon(allPokemon, selectValue); //Filtra los pokemones
        // console.log(typePokemon);
    }
    //console.log(selectValue);
      
    // Mostrar Pokemones filtrados
    root.innerHTML = `
    <div class = 'pokedex'>${typePokemon
            .map(pokemonTemplate)
            .join("")}</div>
    `;

});

// -------------------Función ordenar pokemones alfabéticamente-------------------------

/*function orderPokemon(myArray) {
    myArray.sort(function(a,b){
          let x = a.name;
          let y = b.name;
          if (x < y){return -1;}
          if (x > y){return 1;}
          return 0;
      });
  
      console.log(myArray);
      return myArray;
  }*/

let orderList = document.getElementById("orderList");
orderList.addEventListener("change", () => {
    let orderListValue = orderList.value;
    if (orderListValue === 'upward') {
        orderPokemonUpward(allPokemon);
    }
    if (orderListValue === 'downward') {
        orderPokemonUpward(allPokemon).reverse();
    }
    //Mostrar pokemones ordenados
    root.innerHTML = `
        <div class = 'pokedex'>${allPokemon.map(pokemonTemplate).join("")}</div>
        `;
})


//---------------------------Calculos de movimientos------------------------


