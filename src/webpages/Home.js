import React, {useEffect, useState} from 'react';
import { listProductsActive } from '../apiFunctions/product';
import ProductCardUser from '../components/cards/ProductCardUser';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect (() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setLoading(true);
    listProductsActive(20)
    .then(res => {
      setLoading(false);
      setProducts(res.data);
      console.log("p", res.data, products);
    });
  };

  return (
    <div style={{height: "94.1vh"}} class="bg-gray-300 h-screen">
      {loading ? (<h1>Loading...</h1>) : (
        <div className="container mx-auto flex-1 flex items-center justify-center px-2 mb-4 flex-wrap w-full">
          {products && products.map(product => (
            <ProductCardUser
              product={product}
              key={product._id}
            />
          ))}

        </div>
      )}
    </div>
  );
};

export default App;
