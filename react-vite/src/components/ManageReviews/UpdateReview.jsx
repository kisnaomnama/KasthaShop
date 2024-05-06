import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./UpdateReview.css";
// import { updateProductReviewThunk } from "../../redux/product";
import { updateProductReviewThunk } from "../../redux/review";
import { IoStarOutline, IoStar } from "react-icons/io5";


const UpdateReview = ({ }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const [review, setReview] = useState('');
    const [rating, setRating] = useState(null);
    const [starEffect, setStarEffect] = useState(null);
    const [error, setError] = useState({});
    const reviewId = review.id
    const productId = review.product_id

    useEffect(() => {
        const errObj = {}

        if (review.length < 10) {
            errObj.review = 'Please write at least 10 characters';
        }

        if (!rating || rating < 0) {
            errObj.rating = 'Please select a star rating';
        }
        setError(errObj);
    }, [review, rating, reviewId]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('review', review)
        formData.append('rating', rating)

        const response = await dispatch(updateProductReviewThunk(review.id));
        if (response.errors) {
            closeModal();
        }
        closeModal()
    }


    return (
        <div className="update-review-modal">
            <form onSubmit={onSubmit} className="update-review-form" >
                {error.newReview && <p className="error-message">{error.newReview}</p>}
                <h2>Update your review</h2>
                <textarea
                    type='text'
                    placeholder="Leave your review here..."
                    value={review}
                    onChange={e => setReview(e.target.value)}
                />
                {error.review && <p className="error-message">{error.review}</p>}
                <div className="rating-rating">
                    Stars:
                    {[1, 2, 3, 4, 5].map((ratingEnter) => (
                        <span
                            key={`rating-rating-${ratingEnter}`}
                            className="star"
                            onClick={() => setRating(ratingEnter)}
                            onMouseEnter={() => setStarEffect(ratingEnter)}
                            onMouseLeave={() => setStarEffect(null)}>
                            {ratingEnter <= (starEffect || rating) ? <IoStar /> : <IoStarOutline />}
                        </span>
                    ))}
                </div>

                {error.rating && <p className="error-message">{error.rating}</p>}

                <button
                    disabled={Object.keys(error).length > 0}
                    className="btn update-review"
                    type="submit" >
                    Update Review
                </button>
            </form>
        </div>
    );
}

export default UpdateReview;
