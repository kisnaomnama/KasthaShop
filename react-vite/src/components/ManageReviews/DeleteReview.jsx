import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import "./DeleteReview.css";
// import { deleteProductReviewThunk } from "../../redux/product";
import {deleteProductReviewThunk } from "../../redux/review"
import NotificationModal from "../NotificationModal";

const DeleteReview = ({ review }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [responceMessage, setResponceMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const handlePopupClose = () => {
        setShowPopup(false);
        closeModal();
    };

    const yesButtonClicked = async () => {
 
        const reviewId = review.id
        // const productId = review.product_id

        // console.log("Front END THIS IS REVIEW ID:+++>> ", typeof (productId), typeof (reviewId))
        // console.log("THIS IS REVIEW ID:+++>> ",productId, "productId", reviewId)
        setShowPopup(true);
        const response = await dispatch(deleteProductReviewThunk(reviewId));
        if (!response || response.errors) {
            const errMsg = response.errors.message
            setResponceMessage(errMsg);
        } else {       
            setResponceMessage("Successfully Deleted");
        }
        window.location.reload(); 
        closeModal()
    }

    const noButtonClicked = () => {
        closeModal();
    }

    return (
        <div className="delete-modal">
            {responceMessage && <p>{responceMessage}</p> }
            {showPopup && (
                <NotificationModal
                    message={responceMessage}
                    onClose={handlePopupClose}
                />
            )}
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this Review?</p>
            <button className="btn yes-delete" onClick={yesButtonClicked}>Yes (Delete Review)</button>
            <button className="btn no-delete" onClick={noButtonClicked}>No (Keep Review)</button>
        </div>
    );
}

export default DeleteReview;
