import "./ReviewTile.css";
import { IoPersonCircleOutline, IoStarOutline, IoStar } from "react-icons/io5";
import { useEffect } from "react";
import { formatDate } from "../../../utils/dateConverter";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import DeleteReview from "../ManageReviews/DeleteReview";
import UpdateReview from "../ManageReviews/UpdateReview";

function starsMaker(review) {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < review.rating) {
      stars.push(<IoStar key={i} />);
    } else {
      stars.push(<IoStarOutline key={i} />);
    }
  }
  return stars;
}

function ReviewTile({ review }) {
  const postedAt = formatDate(review.created_at);
  const userId = useSelector((state) => state.session.user?.id);
  const stars = starsMaker(review);

  return (
    <div className="Review-tile-div">
      <div className="review-header">
        <IoPersonCircleOutline className="person-icon" />
        <p>{review.customer.first_name}</p>
        <p>posted on: {postedAt}</p>
      </div>
      <div className="review-detail">
        <p>Ratings: {stars}</p>
        <p>Review: {review.review}</p>
      </div>
      {userId === review.user_id && (
        <div>
          <OpenModalButton
            className="manage-review-button cursor"
            buttonText="Delete"
            modalComponent={<DeleteReview review={review} />}
          />
          <OpenModalButton
            className="manage-review-button cursor"
            buttonText="Update"
            modalComponent={<UpdateReview review={review} />}
          />
        </div>
      )}
    </div>
  );
}

export default ReviewTile;
