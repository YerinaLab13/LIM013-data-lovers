//------------ Función Filtrar por tipo -----------------
export const filteredPokemon = (data,selectType) => {
  const myArray= data.filter((myObject)=>{ 
    return myObject.type.includes(selectType); // Para ver si arreglo incluye valor seleccionado
  }); 
  return myArray;
};
//------------- Función Ordenar alfabéticamente -------------
export const orderPokemonUpward = (myArray) => {
  myArray.sort(function(a,b){
        let x = a.name;
        let y = b.name;
        if (x < y){return -1;}
        if (x > y){return 1;}
        return 0;
    });

    //console.log(myArray);
    return myArray;
};
//------------- Función Filtrar por Nombre ------------------ 
export const filteredName = (data,name) => {
  const myArray= data.filter((myObject)=>{
    
    return myObject.name.includes(name);
  })
  return myArray;
}

 //------------ Función Filtrar por Generación ---------------
 export const filterGeneration = (data,selectGeneration) => {
   const myArray= data.filter((myObject)=>{
    
    return myObject.generation.name.includes(selectGeneration);
     
  
   })
   return myArray;
 }
//------------- Función Obtener EPS -----------------------
export const epsfunction = (energy, movement) => {
  const epsCompute = Math.round(energy/movement);
  return epsCompute;
 }

 //------------ Función suma stats (Reduce)------------------------
/*export const calculation = (myArray) => {
  const sumaStats = myArray.reduce((prev,item) => prev+ parseInt(item)
    ,0);
    return sumaStats;
}*/

export const calculation = (myObject) => {
  const myArray = Object.values(myObject);
  const sumaStats = myArray.reduce((prev,item) => prev+ parseInt(item)
  ,0);
  return sumaStats;
}
  


//export const 
/*


export const orderPokemonDownward = (myArray) => {
  myArray.sort(function(a,b){
        let x = a.name;
        let y = b.name;
        if (x < y){return 1;}
        if (x > y){return -1;}
        return 0;
    });

    //console.log(myArray);
    return myArray;
};
*/

// estas funciones son de ejemplo
export const anotherExample = () => {
  return 'OMG';
};
