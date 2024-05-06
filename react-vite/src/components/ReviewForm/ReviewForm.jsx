
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IoStarOutline, IoStar } from "react-icons/io5";
import { createProductReviewThunk } from "../../redux/review";
// import { updateProductReviewThunk } from "../../redux/review";
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
    const [responceMessage, setResponceMessage] = useState('');
    // const [formSubmit, setformSubmit] = useState(false);
    const userId = useSelector((state) => state.session.user?.id);
    const productId = product?.id;


    useEffect(() => {

        const errObj = {}

        if (review.length < 10) {
            errObj.review = 'Please write at least 10 characters';
        }

        if (review.length > 120) {
            errObj.review = 'Please write less than 120 characters';
        }

        if (!rating || rating < 0) {
            errObj.rating = 'Please select a star rating';
        }

        if (rating < 1 || rating > 5) {
            errObj.rating = 'Rating has to be between 1 to 5'
        }

        setError(errObj)

    }, [review, rating]);


    useEffect(() => {

    }, [showPopup])

    const reset = () => {
        setReview('');
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
        if (!userId) {
            return setShowPopup(true);
        } else {
            const formData = new FormData();
            formData.append('review', review)
            formData.append('rating', rating)
            const response = await dispatch(createProductReviewThunk(productId, formData));
            // console.log("#####", response)
            if (!response || response.errors) {
                const errMsg = response.errors.message
                setShowPopup(true);
                setResponceMessage(errMsg);
                reset()
            } else {
                setShowPopup(true);
                setResponceMessage("Successfully Created");
                reset();
                closeModal();
            }
            // setformSubmit(true);
        }
    }

    return (
        <div>
            {showPopup && !userId && (
                <NotificationModal
                    message={"Please log-in first!"}
                    onClose={handlePopupClose}
                />
            )}
            {showPopup && responceMessage && (
                <NotificationModal
                    message={responceMessage}
                    onClose={handlePopupClose}
                />
            )}
            <form onSubmit={onSubmit} className="create-review-form">
                <h2>Leave Review</h2>
                <textarea
                    type='text'
                    placeholder="Leave your review here..."
                    value={review}
                    onChange={e => setReview(e.target.value)}
                />
                <div className="error-div">
                {error.review && <p className="error-message">{error.review}</p>}

                </div>

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
                <div className="error-div">
                    {error.rating && <p className="error-message">{error.rating}</p>}
                </div>

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
