import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteReview.css";
import { deleteProductReviewThunk } from "../../redux/product";

const DeleteReview = ({ review }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const yesButtonClicked = async () => {
        // const response = await dispatch(deleteProductReviewThunk(review.id));
        // if (response.errors) {           
        //    closeModal();
        // }
        // closeModal()
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
