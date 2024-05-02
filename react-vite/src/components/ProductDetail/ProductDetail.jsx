import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductDetail.css"
import { useParams } from "react-router-dom"
import { productFetchByIdThunk } from "../../redux/product";
import ReviewTile from "../ReviewTile";
// import { calculateAverageReview } from "../../../utils/starRatings";


function ProductDetail() {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const parsedProductId = parseInt(productId);

    useEffect(() => {
        dispatch(productFetchByIdThunk(parsedProductId));
    }, [dispatch, parsedProductId]);

    const product = useSelector(state => state.products[parsedProductId]);
    // for (let review of reviews) {
    //     console.log("Review:");
    //     console.log("Rating:", review.rating);
    //     console.log("Comment:", review.review);
    //     console.log("User:", review.customer.first_name); // Assuming there's a user property in each review object
    //     console.log("Date:", review.created_at); // Assuming there's a date property in each review object
    // }
    if (!product) {
        return <div className="product-loading">Product not found or still loading...</div>;
    }

    const { reviews } = product
    // const averageRating = calculateAverageReview(reviews)

    return (
        <div className="product-details">
            <h2>{product.name}</h2>
            <div className="detail-body-div">
                <div className="left-image-div">
                    {product.product_image && <img src={product.product_image} alt={product.title} />}
                </div>
                <div className='right-info-div'>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                    <hr />
                    <div className="Seller-Info">
                        <h3>Seller Info: </h3>

                        <p>Seller Name: {product.seller.first_name} {product.seller.last_name}</p>
                        <p>Posted At: {product.created_at}</p>
                        <hr />
                    </div>
                    <div className="review-div">
                        <h3>Reviews</h3>

                        {reviews?.map(review =>
                            <ReviewTile key={review.id} review={review} />)
                        }
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ProductDetail;
