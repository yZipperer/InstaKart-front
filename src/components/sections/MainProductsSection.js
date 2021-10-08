import React, {useEffect, useState} from 'react';
import { listProductsActive } from '../../apiFunctions/product';

//components
import ProductCardUser from '../cards/ProductCardUser';
import ProductCardLoading from '../cards/ProductCardLoading';
import BasicHeading from '../headings/BasicHeading';
import Pagination from '../pagination/Pagination';

const MainProductsSection = () => {
    const [products, setProducts] = useState([]);
    const [productsCount, setProductsCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [resultsPerPage, setResultsPerPage] = useState(16);
    let [page, setPage] = useState(1);

  useEffect (() => {
    loadProducts(page);
  }, []);

  const loadProducts = (pageNum) => {
    setLoading(true);
    listProductsActive("updatedAt", "desc", pageNum, resultsPerPage)
    .then(res => {
      setLoading(false);
      res.data = res.data.sort(() => Math.random() - 0.5);
      setProducts(res.data);
      setProductsCount(res.data.length);
    });
  };

  const handlePageChange = (direction) => {
    console.log(page);
    if (direction === "Next") {
        let newPageNum = page;
        newPageNum++;
        setPage(newPageNum);
        loadProducts(newPageNum);
    } else if (direction === "Previous" && page > 1) {
        let newPageNum = page;
        newPageNum--;
        setPage(newPageNum);
        loadProducts(newPageNum);
    }
};

  const loadingCards = (amount) => {
    for(let i = 0; i < amount; i++) {
      return <ProductCardLoading />
    }
  };

  return (
    <div style={{height: "94.1vh"}} class="bg-gray-300 h-screen">
      {loading ? (
        <div className="container mx-auto items-center justify-center px-2 mb-4 w-full">
          {loadingCards(12)}
        </div>
      ) : (
        <div className="container mx-auto items-center justify-center px-2 mb-4 w-full">
            <BasicHeading text={"Everyday Finds"} />
            <div className="flex-1 flex flex-wrap">
                {products && products.map(product => (
                <ProductCardUser
                    product={product}
                    key={product._id}
                />
                ))}
            </div>
            <Pagination 
                handlePageChange={handlePageChange}
                productsCount={productsCount}
                productsPerPage={resultsPerPage}
            />
        </div>
      )}
    </div>
  );
};

export default MainProductsSection;
