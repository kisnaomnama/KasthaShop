import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// import { getCurrentUserProducts } from "../../store/spots";
import { deleteProductThunk } from "../../redux/product";

const DeleteProduct = ({ product }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    
    const yesButtonClicked = async () => {
        const response = await dispatch(deleteProductThunk(product.id));
        if (response.ok) {
            closeModal();
        }
    }
    
    const noButtonClicked = () => {
        closeModal();
    }
    
    return (<div className="delete-modal">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to remove this Product?</p>
        <button className="delete-button yes-delete cursor" onClick={yesButtonClicked}>Yes (Delete Product)</button>
        <button className="delete-button no-delete cursor" onClick={noButtonClicked}>No (Keep Product)</button>
    </div>)
}

export default DeleteProduct;
