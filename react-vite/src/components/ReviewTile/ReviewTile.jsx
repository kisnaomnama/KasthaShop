
import "./ReviewTile.css";
import { IoPersonCircleOutline, IoStarOutline, IoStar } from "react-icons/io5";

function ReviewTile({ key, review }) {
  // Function to render rating stars
  const renderRatingStars = (rating) => {
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

  return (
    <div className="Review-tile-div">
      <div className="review-header">
        <IoPersonCircleOutline className="person-icon"/>
        <p>{review.customer.first_name}</p>
        <p>{review.created_at}</p>
      </div>
      <div className="review-detail">
        <p>Ratings: {renderRatingStars(review.rating)}</p>
        <p>Review: {review.review}</p>
      </div>
    </div>
  );
}

export default ReviewTile;
