import { filteredPokemon, orderPokemonUpward, filteredName } from "./data.js"; //fijo
// import data from './data/lol/lol.js';
import data from "./data/pokemon/pokemon.js"; //fijo
// import data from './data/rickandmorty/rickandmorty.js';

let allPokemon = data.pokemon;
let modalContainer = document.querySelector(".modalContainer")
//mostrar pokémons
function pokemonTemplate(poke) {

    return `
        <div class='poke' data-num='${poke.num}'>       
            <p class = 'poke-num'> ${poke.num}</p>
            <img class ='poke-img' src='${poke.img}'>
            <p class= 'poke-name'> ${poke.name.toUpperCase()}</p> 
        </div>
        `
}

//--------------------Modal--------------------------------------

function showInfoPokemon(e) {
    modalContainer.innerHTML = "";
    const pokeNum = e.currentTarget.dataset.num;
    const poke = allPokemon.filter(p => p.num == pokeNum)[0];

    //Calculo eps pokemon
    const epsTemplateFunction = (movement) => {
        return `
        <p>${movement.name}</p>
        <p>${Math.round(movement.energy / movement["move-duration-seg"])}</p>`
    }
    const quickMovesPoke = poke["quick-move"];
    const statsQuickMove = quickMovesPoke.map(epsTemplateFunction).join ("");

    const attackMoves = poke["special-attack"];
    const statsAttackMove = attackMoves.map(epsTemplateFunction).join("");
    
    modalContainer.style.display = "block"
    const modalShow = document.createElement("div");
    modalShow.classList.add("modalShow");
    //modalShow.style.display = "block";
    modalShow.innerHTML = `
        <div class="flexModal">
            <div class= "modal-header">
                <span class="close">x</span>
            </div>
            <div class= "modalBody">
                <p class = 'poke-num'> ${poke.num}</p>
                <img class ='poke-img' src='${poke.img}'>
                <p class= 'poke-name'> ${poke.name.toUpperCase()}</p>
                <div>${statsQuickMove}</div>
                <div>${statsAttackMove}</div> 
            </div> 
        </div>
        `
    modalContainer.appendChild(modalShow);

    //return modalContainer;
    const close = document.querySelector(".close");
    close.addEventListener("click", () => {
        modalContainer.style.display = "none";
    })

}

let root = document.getElementById("root");
root.innerHTML = `
    <div class = 'pokedex'>${allPokemon.map(pokemonTemplate).join("")}</div>
    `;

const listPoke = document.querySelectorAll(".poke");

listPoke.forEach((card) => {
    card.addEventListener('click', showInfoPokemon)
});


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
    const listPoke = document.querySelectorAll(".poke");

    listPoke.forEach((card) => {
        card.addEventListener('click', showInfoPokemon)
    });    
    
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

    const listPoke = document.querySelectorAll(".poke");

    listPoke.forEach((card) => {
            card.addEventListener('click', showInfoPokemon)
    });  
})

//--------------------------Filtro por nombre--------------------------
const inputName = document.getElementById("search");
inputName.addEventListener("keyup", () => {
    let inputNameValue = inputName.value;
    console.log(inputNameValue);
    const searchName = filteredName(allPokemon, inputNameValue)
    root.innerHTML = `
        <div class = 'pokedex'>${searchName.map(pokemonTemplate).join("")}</div>
        `;
    const listPoke = document.querySelectorAll(".poke");

    listPoke.forEach((card) => {
        card.addEventListener('click', showInfoPokemon)
    });  
})