import React, {useEffect, useState} from 'react';
import {individualProduct} from '../apiFunctions/product';
import ProductCardLarge from '../components/cards/ProductCardLarge';
import {productRating} from '../apiFunctions/product';
import {useSelector} from 'react-redux';

const Product = ({match}) => {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [stars, setStars] = useState(0);
    const [reviewText, setReviewText] = useState("");

    let rState = useSelector((rState) => {
        return rState;
    });

    useEffect(() => {
        loadProduct();
    }, []);

    useEffect(() => {
        if(product.ratings && rState.user) {
            let exists = product.ratings.find((e) => {
                return e.author.toString() === rState.user._id.toString();
            });
            exists && setReviewText(exists.text);
            exists && setStars(exists.stars);
        }
    })

    const loadProduct = async () => {
        setLoading(true);
        await individualProduct(match.params.slug)
        .then(res => {
            console.log("data", res.data);
            setProduct(res.data);
            setLoading(false);
        });
    };

    const onRate = async (rating) => {
        setStars(rating);
        await productRating(product._id, rating, reviewText, rState.user.token)
        .then(res => {
            console.log("rating", res.data);
            loadProduct();
        });
    };

    return (
        <div class="bg-gray-300 pb-8 sm:pb-16 pt-6 sm:pt-12 ">
            {loading ? (
                <>Loading/...</>
            ) : (
                <ProductCardLarge
                    product={product}
                    onRate={onRate}
                    stars={stars}
                    reviewText={reviewText}
                    setReviewText={setReviewText}
                    loadProduct={loadProduct}
                />
            )}
        </div>
    )
};

export default Product;