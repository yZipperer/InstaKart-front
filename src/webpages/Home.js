import React, {useEffect, useState} from 'react';
import { listProductsActive } from '../apiFunctions/product';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect (() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    listProductsActive(20)
    .then(res => {
      setProducts(res.data);
      console.log("p", res.data, products);
    });
  };

  return (
      <div style={{height: "94.1vh"}} class="bg-gray-300 h-screen">
          <p>Home</p>
      </div>
  );
};

export default App;
