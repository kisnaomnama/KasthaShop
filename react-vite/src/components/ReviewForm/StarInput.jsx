import { useState } from "react";

const StarInput = ({ stars, setRating }) => {
    const [starEffect, setStarEffect] = useState(stars);
    const starRating = [1, 2, 3, 4, 5];
    
    const handleStarClick = (rating) => {
        setRating(rating);
        setStarEffect(rating);
    };

    return (
        <div className="stars-rating">
            <ul>
                Stars
                {starRating.map(rating => (
                    <i 
                        key={`stars-rating-${rating}`}
                        className={`fa-${starEffect >= rating ? "solid" : "regular"} fa-star`}
                        onClick={() => handleStarClick(rating)}
                        onMouseEnter={() => setStarEffect(rating)}
                        onMouseLeave={() => setStarEffect(stars)}
                    />
                ))}
            </ul>
        </div>
    );
};

export default StarInput;
