import { IoStarOutline, IoStar } from "react-icons/io5";

export const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars.push(<IoStar key={i} />);
        } else {
            stars.push(<IoStarOutline key={i} />);
        }
    }
    return stars;
};

export const calculateAverageReview = (reviews) => {
    if (reviews.length === 0) {
        return 0; // Return 0 if there are no reviews
    }

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    return averageRating
};
