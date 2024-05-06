import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteReview.css";
// import { deleteProductReviewThunk } from "../../redux/product";
import {deleteProductReviewThunk } from "../../redux/review"

const DeleteReview = ({ review }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const yesButtonClicked = async () => {
 
        const reviewId = review.id
        const productId = review.product_id

        console.log("Front END THIS IS REVIEW ID:+++>> ", typeof (productId), typeof (reviewId))
        console.log("THIS IS REVIEW ID:+++>> ",productId, "productId", reviewId)

        const response = await dispatch(deleteProductReviewThunk(productId, reviewId));
        if (response.errors) {           
           closeModal();
        }
        closeModal()
    }

    const noButtonClicked = () => {
        closeModal();
    }

    return (
        <div className="delete-modal">
            {/* {response.errors && <p className ="error-message">{response.errors}</p> } */}
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this Review?</p>
            <button className="btn yes-delete" onClick={yesButtonClicked}>Yes (Delete Review)</button>
            <button className="btn no-delete" onClick={noButtonClicked}>No (Keep Review)</button>
        </div>
    );
}

export default DeleteReview;
