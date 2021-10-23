import React, {useState} from 'react';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import StarRatings from 'react-star-ratings';
import {productRating} from '../../apiFunctions/product';

const Rating = ({product, onRate, stars, reviewText, setReviewText, loadProduct}) => {
    let rState = useSelector((rState) => {
        return rState;
    });

    const handleRatingSubmit = async () => {
        await productRating(product._id, stars, reviewText, rState.user.token)
        .then(res => {
            console.log("rating", res.data);
            loadProduct();
        });
    };

    return (
        <>
            {rState.user ? (
                <form onSubmit={handleRatingSubmit}>
                    <StarRatings 
                        name={product._id}
                        numberOfStars={5}
                        rating={stars}
                        changeRating={onRate}
                        isSelectable={true}
                        starRatedColor="#6366F1"
                        starHoverColor="#1D4ED8"
                    />
                    <textarea 
                        type="text"
                        name="reviewText"
                        className="block border border-grey-light w-full p-3 mt-2 rounded mb-4 lg:h-48"
                        placeholder="Review"
                        onChange={event => setReviewText(event.target.value)}
                        value={reviewText}
                    />
                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-400 focus:outline-none my-1"
                    >Submit Review</button>
                </form>
            ) : (
                <>

                </>
            )}
        </>
    )
};

export default Rating;