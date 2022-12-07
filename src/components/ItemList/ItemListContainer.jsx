import { useState, useEffect } from "react";

import ItemList from "./ItemList";
import "./itemlist.css";
import getItems, { getItemsByCategory } from "../../Services/firestore";
import Loader from "../Loaders/Loader";

import { useParams } from "react-router-dom";

function ItemListContainer() {
  const [products, setProducts] = useState(null);
  /* const [isLoading, setIsLoading] = useState(true) */
  const { idCategory } = useParams();

  async function getItemsAsync() {
    if( !idCategory ){
      let respuesta = await getItems();
      setProducts(respuesta);
    }
    else {
      let respuesta = await getItemsByCategory(idCategory)
      setProducts(respuesta)
    }
  }

  useEffect(() => {
    getItemsAsync();
  }, [idCategory]); 

  // 1. Render Condicional con operador ternario
  return (
    <div className="catalogo">
      {products ? <ItemList products={products} /> : <Loader />}
    </div>
  )
}

export default ItemListContainer