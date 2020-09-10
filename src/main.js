import { filteredPokemon, orderPokemonUpward, filteredName, epsfunction, filterGeneration, calculation } from "./data.js"; //fijo
// import data from './data/lol/lol.js';
import data from "./data/pokemon/pokemon.js"; //fijo
// import data from './data/rickandmorty/rickandmorty.js';

const allPokemon = data.pokemon;
const modalContainer = document.querySelector(".modalContainer");
const root = document.getElementById("root");
const generation = document.getElementById("generation");
const list = document.getElementById("list");
//------------------------- Mostrar pokemons -------------------------------------

function pokemonTemplate(poke) {
    const pokeTypes = poke.type;
    //console.log(pokeTypes);
    const elementPokemon = pokeTypes.map((type) => {
        return `<p>${type}</p>`
    }).join("")
    //En el div class poke se asigna el data set que se usará para el evento. Ver línea 39
    return `
        <div class='poke' data-num='${poke.num}'>     
            <p class='poke-num'>${poke.num}</p>
            <img class='poke-img' src='${poke.img}'>
            <p class='poke-name'>${poke.name.toUpperCase()}</p> 
            <div>${elementPokemon}</div>
        </div>
        `
}
root.innerHTML = `
    <div class ='pokedex'>${allPokemon.map(pokemonTemplate).join("")}</div>
    `;
//-------------------- Modal -----------------------------------------------------

function showInfoPokemon(e) {
    modalContainer.innerHTML = "";
    const pokeNum = e.currentTarget.dataset.num; ////ver línea 17
    const poke = allPokemon.filter(p => p.num == pokeNum)[0];
    
    //Calculo eps pokemon
    const epsTemplateFunction = (movement) => {
        /*return `
        <p>${movement.name}</p>
        <p>${Math.round(movement.energy / movement["move-duration-seg"])}</p>`*/
        return `
            <div class= "table-movement">       
            <div class="stats-movement-name">${movement.name}</div>
            <div class="stats-movement-eps">${epsfunction(movement.energy, movement["move-duration-seg"])}</div>
            </div>             
        `
    }
    const quickMovesPoke = poke["quick-move"];
    const statsQuickMove = quickMovesPoke.map(epsTemplateFunction).join("");

    const attackMoves = poke["special-attack"];
    const statsAttackMove = attackMoves.map(epsTemplateFunction).join("");

    //--------------- reduce pc ----------------------
   
    /*const statsPoke = Object.values(poke.stats);*/
    /*const sumaStats = statsPoke.reduce((prev,item) => prev+ parseInt(item)
    ,0)*/
    const totalStats = calculation(poke.stats);
    
    /*const pruebaKeys = Object.keys(poke.stats);
    console.log(pruebaKeys);*/

    //------------------ Aparece modal --------------------------------------------

    const modalShow = document.createElement("div");
    modalShow.classList.add("modalShow");
    modalShow.innerHTML = `
        <div class="flexModal">
            <div class="modal-header">
                <span class="close">x</span>
            </div>
            <div class="modal-body">
                <img class='poke-img-modal-body' src='${poke.img}'>
                <div class='inf-modal-body' >
                    <p class='poke-num-modal-body'> ${poke.num}</p> 
                    <p class='poke-name-modal-body'> ${poke.name.toUpperCase()}</p>
                </div>
                <div class='details-modal-body'>
                    <div class='detail'>
                        <img src= "imagenes/egg.png">
                        <p>${poke.egg}</p>
                    </div>  
                    <div class='detail'>
                        <img src= "imagenes/height.png">
                        <p>${poke.size.height}</p>
                    </div>  
                    <div class='detail'>
                        <img src= "imagenes/weight.png">
                        <p>${poke.size.weight}</p>
                    </div>  
                    <div class='detail '>
                        <img src = "imagenes/hp.png">
                        <p>${poke.stats['max-hp']}
                    </div>  
                    <div class='detail '>
                        <img src = "imagenes/cp.png">
                        <p>${poke.stats['max-cp']}</p>
                    </div> 
                    <div class='detail'>
                        <img src = "imagenes/power.png">
                        <p>${totalStats}</p>
                    </div>                    
                </div>
                <div class= 'stats-modal-body'>
                    <div class="table-movement">
                        <p class="encabezado">Quick Move</p>
                        <p class="encabezado">EPS</p>
                    </div>
                        ${statsQuickMove}
                    <div class="table-movement">
                        <p class="encabezado">Special Attack</p>
                        <p class="encabezado">EPS</p>
                    </div>
                        ${statsAttackMove}
                </div>
            </div> 
        </div>
        `
    modalContainer.style.display = "block";
    modalContainer.appendChild(modalShow);

    //return modalContainer;
    const close = document.querySelector(".close");
    close.addEventListener("click", () => {
        modalContainer.style.display = "none";
    })
}
//---------- Se llama a cada div poke ---------------------------------------
const listPoke = document.querySelectorAll(".poke");
//console.log(listPoke);

const openModal= (myArray)=>{
    myArray.forEach((card)=>{
        card.addEventListener('click', showInfoPokemon)
    });
}

openModal(listPoke);

// ------------------------ Filtrar por tipo ----------------------------------

list.addEventListener("change", () => {
    let typePokemon = allPokemon;
    let selectValue = list.value;
    // filtra si la seleccion es diferente a all pokemon
    if (selectValue !== "allPokemon") {
        typePokemon = filteredPokemon(allPokemon, selectValue); //Filtra los pokemones        
    }
    
     //----------Mostrar Pokemones filtrados--------
    root.innerHTML = `
    <div class = 'pokedex'>${typePokemon
            .map(pokemonTemplate)
            .join("")}</div>
    `;

    const listPoke = document.querySelectorAll(".poke");
    openModal(listPoke);
    
});

// ------------------- Función ordenar pokemones alfabéticamente ---------------------

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
    let selectType = list.value;
    let selectGeneration = generation.value;
    let pokedexFilter = allPokemon; //--inicio---
    if (selectType !== 'allPokemon') {
        pokedexFilter = filteredPokemon(allPokemon, selectType);
    } 
    let pokedexFilterOrder=pokedexFilter;
    if (selectGeneration !== 'allPokemon'){
        pokedexFilterOrder = filterGeneration(pokedexFilter, selectGeneration);
    }
    ///-------------------- Ordenar--------------------------
    let orderListValue = orderList.value;

    if (orderListValue === 'upward') {
        orderPokemonUpward(pokedexFilterOrder)
    }
    if (orderListValue === 'downward') {
        orderPokemonUpward(pokedexFilterOrder).reverse();
    }
    //----------------- Mostrar pokemones ordenados --------------
    root.innerHTML = `
        <div class = 'pokedex'>${pokedexFilterOrder.map(pokemonTemplate).join("")}</div>
        `;

    const listPoke = document.querySelectorAll(".poke");

    openModal(listPoke);
})
//-------------------------- Filtro por nombre -----------------------------

const inputName = document.getElementById("search");
inputName.addEventListener("keyup", () => {
    let inputNameValue = inputName.value;
    const searchName = filteredName(allPokemon, inputNameValue)
    root.innerHTML = `
        <div class = 'pokedex'>${searchName.map(pokemonTemplate).join("")}</div>
        `;
    const listPoke = document.querySelectorAll(".poke");
    openModal(listPoke);
})

//-----------------------Filtro por generación---------------------------------

generation.addEventListener("change", () => {
    let generationPokemon = allPokemon;//-inicio
    let selectGeneration = generation.value;
    let selectType = list.value;
    //console.log(selectValue);
    if(selectType !== 'allPokemon'){
        generationPokemon = filteredPokemon(allPokemon,selectType);
    }
    let generationPoke=generationPokemon;
    if (selectGeneration !== 'allPokemon') {
        generationPoke = filterGeneration(generationPokemon, selectGeneration);
    }
   
    root.innerHTML = `
    <div class = 'pokedex'>${generationPoke
            .map(pokemonTemplate)
            .join("")}</div>
    `;
    const listPoke = document.querySelectorAll(".poke");

    openModal(listPoke);    
})