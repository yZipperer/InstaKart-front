import React from "react";
import StarRatings from "react-star-ratings";

export const AverageRating = ({product}) => {
    if(product && product.ratings) {
        let ratings = product && product.ratings;
        let total = [];
        let length = ratings.length;

        ratings.map((rating) => {
            total.push(rating.stars);
        });
        let totalR = total.reduce((prev, next) => prev + next, 0);

        //how many reviews * 5/5 stars
        let highestPossible = length * 5;
        let result = (totalR * 5)/ highestPossible;

        return (
            <div className="flex">
                <StarRatings 
                    name={product._id}
                    numberOfStars={5}
                    rating={result}
                    starRatedColor="blue"
                />
                <p className="text-2xl">({length})</p>
            </div>
        )
    }
};

export default AverageRating;