import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { fetchProducthByIdThunk } from "../../redux/product";
import { useDispatch, useSelector } from "react-redux";
import EditProductForm from "../ProductForm/EditProductForm";


const EditProduct= () => {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const product = useSelector(state => state.products[productId]);

    useEffect(()=>{
        dispatch(fetchProducthByIdThunk(productId)).then(()=>setIsLoaded(true))
    }, [dispatch, productId]);

    return (
        <div className="update-product-wrapper">
            {isLoaded && <EditProductForm product={product} formType="Update Product"/>}
        </div>
    )
}

export default EditProduct;
