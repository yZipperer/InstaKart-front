import React, {useEffect, useState} from 'react';
import { listProductsActive } from '../apiFunctions/product';
import BasicHeading from '../components/headings/BasicHeading';
import ProductCardUser from '../components/cards/ProductCardUser';
import ProductCardLoading from '../components/cards/ProductCardLoading';

const NewArrivals = () => {
    const [newArrivals, setNewArrivals] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadNewArrivals();
    }, []);

    const loadNewArrivals = () => {
        setLoading(true);
        listProductsActive("createdAt", "desc", 1, 20)
        .then(res => {
            setLoading(false);
            setNewArrivals(res.data);
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
            {loadingCards(12)}
          </div>
        ) : (
          <div className="container mx-auto items-center justify-center px-2 mb-4 w-full">
              <BasicHeading
                text={"New Arrivals"}
              />
              <div className="flex-1 flex flex-wrap">
                  {newArrivals && newArrivals.map(product => (
                  <ProductCardUser
                      product={product}
                      key={product._id}
                  />
                  ))}
              </div>
          </div>
        )}
      </div>
    )
};

export default NewArrivals;