
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IoStarOutline, IoStar } from "react-icons/io5";
import { createProductReviewThunk } from "../../redux/product";
import { useModal } from "../../context/Modal";
import NotificationModal from "../NotificationModal";
import './ReviewForm.css'

function ReviewForm({ product }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(null);
    const [starEffect, setStarEffect] = useState(null);
    const [error, setError] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const userId = useSelector((state) => state.session.user?.id);
    const productId = product.id;
    let newReview = null;

    useEffect(() => {
        const errObj = {}

        if (review.length < 10) {
            errObj.review = 'Please write at least 10 characters';
        }

        if (!rating || rating < 0) {
            errObj.rating = 'Please select a star rating';
        }

        setError(errObj);
    }, [review, rating, productId]);

    const reset = () => {
        setReview('');
        setRating(null);
        setError({});
    }

    const handlePopupClose = () => {
        setShowPopup(false);
    };

  
    const onSubmit = async (e) => {
        e.preventDefault();
      

        if (!userId) {
            setShowPopup(true);
        } else {
            const formData = new FormData();

            formData.append('review', review)
            formData.append('rating', rating)

            newReview = await dispatch(createProductReviewThunk(productId, formData));
            setShowPopup(true);
        }

        if (newReview && newReview.message) {
            // alert(newReview.message)
            setError(newReview);
            reset();
        } else {
            closeModal();
            reset();
        }
    }

    return (
        <div>
            {showPopup && (
                <NotificationModal
                    message={userId ? newReview.message && `${newReview.message}` : "Please log-in first!"}
                    onClose={handlePopupClose}
                />
            )}
            <form onSubmit={onSubmit} className="create-review-form">
                {error.newReview && <p className="error-message">{error.newReview}</p>}
                <h2>Leave Review</h2>
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
                    className="submit-review"
                    type="submit"
                >
                    Submit Review
                </button>
            </form>
        </div>
    )
}

export default ReviewForm;
