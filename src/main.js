import { filteredPokemon, orderPokemonUpward, filteredName, epsfunction } from "./data.js"; //fijo
// import data from './data/lol/lol.js';
import data from "./data/pokemon/pokemon.js"; //fijo
// import data from './data/rickandmorty/rickandmorty.js';

let allPokemon = data.pokemon;
const modalContainer = document.querySelector(".modalContainer");
const root = document.getElementById("root");
//-----------Mostrar pokemons-------------------------------------

function pokemonTemplate(poke) {
    const pokeTypes = poke.type;
    //console.log(pokeTypes);
    const elementPokemon = pokeTypes.map((type)=> {
        return `<p>${type}</p>`
    }).join("")
    //En el div class poke se asigna el data set que se usará para el evento. Ver línea 39
    return `
        <div class='poke' data-num='${poke.num}'>     
            <p class = 'poke-num'> ${poke.num}</p>
            <img class ='poke-img' src='${poke.img}'>
            <p class= 'poke-name'> ${poke.name.toUpperCase()}</p> 
            <div> ${elementPokemon}</div>
        </div>
        `
}

root.innerHTML = `
    <div class = 'pokedex'>${allPokemon.map(pokemonTemplate).join("")}</div>
    `;
       
//--------------------Modal--------------------------------------

function showInfoPokemon(e) {
    modalContainer.innerHTML = "";
    const pokeNum = e.currentTarget.dataset.num; ////ver línea 17
    const poke = allPokemon.filter(p => p.num == pokeNum)[0];
    //const pokeTypes = poke.type;

    //Calculo eps pokemon
    const epsTemplateFunction = (movement) => {
        /*return `
        <p>${movement.name}</p>
        <p>${Math.round(movement.energy / movement["move-duration-seg"])}</p>`*/
        
        /*let stab = 0;
        if (movement.type.includes(pokeTypes)){
            stab = true;
            console.log(stab);         
        } 
        */

        return `
        <p>${movement.name} </p>
        <p>${epsfunction(movement.energy,movement["move-duration-seg"])} </p>
        `
    }
    const quickMovesPoke = poke["quick-move"];
    const statsQuickMove = quickMovesPoke.map(epsTemplateFunction).join ("");

    const attackMoves = poke["special-attack"];
    const statsAttackMove = attackMoves.map(epsTemplateFunction).join("");
    
    //Calculo Stab
    



    //-----------Aparece modal------------------
    modalContainer.style.display = "block"
    const modalShow = document.createElement("div");
    modalShow.classList.add("modalShow");
    modalShow.innerHTML = `
        <div class="flexModal">
            <div class= "modal-header">
                <span class="close">x</span>
            </div>
            <div class= "modal-body">
                <img class ='poke-img-modal-body' src='${poke.img}'>
                <div class ='basicInf-modal-body' >
                    <p class = 'poke-num-modal-body'> ${poke.num}</p> 
                    <p class= 'poke-name-modal-body'> ${poke.name.toUpperCase()}</p>
                </div>
                <div class= 'stats-modal-body'>
                    <div>${statsQuickMove}</div>
                    <div>${statsAttackMove}</div> 
                </div>
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

const listPoke = document.querySelectorAll(".poke");
console.log(listPoke);
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

// -------------------FunciÃ³n ordenar pokemones alfabaticamente-------------------------

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
    let selectValue = list.value;

    let pokedexfilter = allPokemon;

    if (selectValue !== 'allPokemon'){
        pokedexfilter = filteredPokemon(allPokemon,selectValue);
    }

    /*const pokedexfilter = filteredPokemon(allPokemon,selectValue);*/
    
    let orderListValue = orderList.value;
    
    if (orderListValue === 'upward') {
        orderPokemonUpward(pokedexfilter);
        console.log(pokedexfilter);
    }
    if (orderListValue === 'downward') {
        orderPokemonUpward(pokedexfilter).reverse();
    }
    //Mostrar pokemones ordenados
    root.innerHTML = `
        <div class = 'pokedex'>${pokedexfilter.map(pokemonTemplate).join("")}</div>
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

//---Stab[base damage * 1.20] Si el tipo de ataque = al tipo de pokemon--------


//---Dps [base damage/ move duration seg] Si es un ataque de tipo se considera el stab en lughar del base damage-------