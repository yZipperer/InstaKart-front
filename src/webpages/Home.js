import React, {useEffect, useState} from 'react';
import { listProductsActive } from '../apiFunctions/product';
import ProductCardUser from '../components/cards/ProductCardUser';
import ProductCardLoading from '../components/cards/ProductCardLoading';
import WinterImage from '../components/heroes/WinterImage';

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

  const loadingCards = (amount) => {
    for(let i = 0; i < amount; i++) {
      return <ProductCardLoading />
    }
  };

  return (
    <div style={{height: "94.1vh"}} class="bg-gray-300 h-screen overflow-auto">
      {loading ? (
        <div className="container mx-auto items-center justify-center px-2 mb-4 w-full">
          <WinterImage />
          {loadingCards(12)}
        </div>
      ) : (
        <div className="container mx-auto items-center justify-center px-2 mb-4 w-full">
          <WinterImage />
          <div className="flex-1 flex flex-wrap">
            {products && products.map(product => (
              <ProductCardUser
                product={product}
                key={product._id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
