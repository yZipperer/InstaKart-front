import React, {useEffect, useState} from 'react';
import { listProductsActive } from '../apiFunctions/product';

//components
import ProductCardUser from '../components/cards/ProductCardUser';
import ProductCardLoading from '../components/cards/ProductCardLoading';
import WinterImage from '../components/heroes/WinterImage';
import BasicHeading from '../components/headings/BasicHeading';
import NewArrivalsSection from '../components/sections/NewArrivalsSection';
import MainProductsSection from '../components/sections/MainProductsSection';
import BestSellersSection from '../components/sections/BestSellersSection';

const App = () => {
  const [loading, setLoading] = useState(false);

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
          
          <NewArrivalsSection />

          <BestSellersSection />

          <MainProductsSection />
        </div>
      )}
    </div>
  );
};

export default App;
