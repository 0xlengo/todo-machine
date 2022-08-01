import React from "react";

function useLocalStorage(itemName, initialValue){

    //vamos a controlar el estado y actualizarlo
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [item, setItem] = React.useState(initialValue);
  
    React.useEffect(() => {
  
      setTimeout(() => {
  
        try {
  
          const localStorageItem = localStorage.getItem(itemName);
          let parsedItem;
        
          //pregunto si existe y lo parseo, sino creo uno vacio  
          if (!localStorageItem){
            localStorage.setItem(itemName, JSON.stringify(initialValue));
            parsedItem = [];
          } else {
            parsedItem = JSON.parse(localStorageItem);
          }
    
          setItem(parsedItem);
          setLoading(false);
        } catch (error) {
          setError(error);
        }
  
      }, 1000);
    });
  
    //guardamos las actualizaciones que nos pasen en localStorage, 
    //o nuestro estado con React
    const saveItem = (newItem) => {
  
      try {
        const stringifiedItem = JSON.stringify(newItem);
        localStorage.setItem(itemName, stringifiedItem);
        setItem(newItem);
      } catch (error) {
        setError(error);
      }
  
    };
  
    return {
      item,
      saveItem,
      loading,
      error,
    };
  
  }

  export {useLocalStorage};