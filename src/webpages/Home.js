import React, {useEffect, useState} from 'react';
import { listProductsActive } from '../apiFunctions/product';

//components
import ProductCardUser from '../components/cards/ProductCardUser';
import ProductCardLoading from '../components/cards/ProductCardLoading';
import WinterImage from '../components/heroes/WinterImage';
import NewArrivalsHeading from '../components/headings/NewArrivalsHeading';
import BasicHeading from '../components/headings/BasicHeading';

const App = () => {
  const [products, setProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect (() => {
    loadProducts();
    loadNewArrivals();
    loadBestSellers();
  }, []);

  const loadProducts = () => {
    setLoading(true);
    listProductsActive(20, "updatedAt", "desc")
    .then(res => {
      setLoading(false);
      res.data = res.data.sort(() => Math.random() - 0.5);
      setProducts(res.data);
    });
  };

  const loadNewArrivals = () => {
    setLoading(true);
    listProductsActive(8, "createdAt", "desc")
    .then(res => {
      setLoading(false);
      setNewArrivals(res.data);
    });
  };

  const loadBestSellers = () => {
    setLoading(true);
    listProductsActive(8, "sold", "desc")
    .then(res => {
      setLoading(false);
      setBestSellers(res.data);
    });
  }

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
          <NewArrivalsHeading />
          <div className="flex-1 flex flex-wrap">
            {newArrivals && newArrivals.map(product => (
              <ProductCardUser
                product={product}
                key={product._id}
              />
            ))}
          </div>
          <BasicHeading text={"Best Sellers"} />
          <div className="flex-1 flex flex-wrap">
            {bestSellers && bestSellers.map(product => (
              <ProductCardUser
                product={product}
                key={product._id}
              />
            ))}
          </div>
          <BasicHeading text={"Everyday Finds"} />
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
