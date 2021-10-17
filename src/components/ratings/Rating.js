import React, {useState} from 'react';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import StarRatings from 'react-star-ratings';

const Rating = ({product}) => {
    const [text, setText] = useState("");

    let rState = useSelector((rState) => {
        return rState;
    });

    return (
        <>
            {rState.user ? (
                <div>
                    <StarRatings 
                        name={product._id}
                        numberOfStars={5}
                        rating={2}
                        changeRating={(newRating, name) => console.log("rn", newRating, name)}
                        isSelectable={true}
                        starRatedColor="#6366F1"
                        starHoverColor="#1D4ED8"
                    />
                    <textarea 
                        type="text"
                        name="text"
                        className="block border border-grey-light w-full p-3 mt-2 rounded mb-4"
                        placeholder="Review"
                        onChange={console.log("changed")}
                        value={text}
                    />
                </div>
            ) : (
                <>

                </>
            )}
        </>
    )
};

export default Rating;