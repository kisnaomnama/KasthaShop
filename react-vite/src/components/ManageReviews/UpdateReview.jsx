import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./UpdateReview.css";
import NotificationModal from "../NotificationModal";
// import { updateProductReviewThunk } from "../../redux/product";
import { updateProductReviewThunk } from "../../redux/review";
import { IoStarOutline, IoStar } from "react-icons/io5";


const UpdateReview = ({ review }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [responceMessage, setResponceMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [reviewText, setReviewText] = useState(review.review);
    const [rating, setRating] = useState(review.rating);
    const [starEffect, setStarEffect] = useState(null);
    const [error, setError] = useState({});
    const reviewId = review.id
    const productId = review.product_id

    useEffect(() => {
        const errObj = {}

        if (reviewText.length < 10) {
            errObj.review = 'Please write at least 10 characters';
        }

        if (reviewText.length > 120) {
            errObj.review = 'Please write less than 120 characters';
        }

        if (!rating || rating < 0) {
            errObj.rating = 'Please select a star rating';
        }

        if (rating < 1 || rating > 5) {
            errObj.rating = 'Rating has to be between 1 to 5'
        }
        setError(errObj);
    }, [reviewText, rating, reviewId]);



    const reset = () => {
        setReviewText('');
        setRating(null);
        setError({});
    }

    const handlePopupClose = () => {
        reset()
        setShowPopup(false);
        closeModal();
    };


    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('review', reviewText)
        formData.append('rating', rating)

        const response = await dispatch(updateProductReviewThunk(reviewId, productId, formData));

        if (!response || response.errors) {
            const errMsg = response.errors.message
            setShowPopup(true);
            setResponceMessage(errMsg);
        } else {
            setShowPopup(true);
            setResponceMessage("Successfully Updated");
            reset();
            closeModal();
        }
        window.location.reload(); 
        closeModal()
    }

    return (
        <div className="update-review-modal">
            {showPopup && responceMessage && (
                <NotificationModal
                    message={responceMessage}
                    onClose={handlePopupClose}
                />
            )}
            <form onSubmit={onSubmit} className="update-review-form" >

                <h2>Update your review</h2>
                <textarea
                    type='text'
                    placeholder="Leave your review here..."
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)}
                />
                {error.reviewText && <p className="error-message">{error.reviewText}</p>}
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
