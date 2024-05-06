import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductDetail.css"
import { useParams } from "react-router-dom"
import { fetchProducthByIdThunk } from "../../redux/product";
import { useModal } from "../../context/Modal";
import ReviewTile from "../ReviewTile";
import ReviewForm from "../ReviewForm/ReviewForm";
import { formatDate } from "../../../utils/dateConverter";
// import { calculateAverageReview } from "../../../utils/starRatings";

function ProductDetail() {
    const { productId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const parsedProductId = parseInt(productId);


    useEffect(() => {
        dispatch(fetchProducthByIdThunk(parsedProductId)).then(() => setIsLoaded(true));
    }, [dispatch, parsedProductId]);

    const product = useSelector(state => state.products[parsedProductId]);


    if (!product) {
        return <div className="product-loading">Product not found or still loading...</div>;
    }

    const { reviews } = product
    // const averageRating = calculateAverageReview(reviews)
    return (
        <div className="product-details">
            <div className="detail-body-div">
                <div className="left-div">
                    <div className="left-image-div">
                        <h2>{product.name}</h2>
                        <hr />
                        {product.product_image && <img src={product.product_image} alt={product.title} className="image-div" />}
                        <p id="product-discription">{product.description}</p>
                    </div>
                    <div className="left-body">

                        <div className="seller-info">
                            <p>Price: <span id="product-price"> $ {product.price}</span></p>
                            <p>Seller Name: {product.seller.first_name} {product.seller.last_name}</p>
                            <p>Posted At: {formatDate(product.created_at)}</p>
                        </div>

                    </div>
                </div>
                {
                    isLoaded &&
                    <div className='right-info-div'>
                        {product &&
                            <div className="review-form">
                                <ReviewForm product={product} />
                            </div>
                        }
                        <div className="review-div">
                            <h3 >Reviews</h3>
                            {reviews?.length > 0 ? (
                                reviews.map(review =>
                                    <ReviewTile key={review.id} review={review} />)
                            ) : (
                                <p>No Reviews Yet</p>
                            )}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default ProductDetail;
