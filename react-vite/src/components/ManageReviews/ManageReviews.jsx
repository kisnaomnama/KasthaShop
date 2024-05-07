import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllReviewsbyUserThunk } from "../../redux/review";
import {fetchAllReviewsThunk} from "../../redux/review";
import ReviewTile from "../ReviewTile";
import "./ManageReviews.css";

function ManageReviews() {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user.id);
    const [isLoaded, setIsLoaded] = useState(false);
    const reviews = useSelector(state => state.reviews);
    console.log("RESPONCE++++++++++", reviews)

    useEffect(() => {
        
        const  reviews=  dispatch(fetchAllReviewsThunk()).then(() => setIsLoaded(true));
         
        // dispatch(fetchAllReviewsbyUserThunk()).then(() => setIsLoaded(true));
    }, [dispatch, userId]); 

    return (
        <div>
         
            {/* {isLoaded ? (
                <div>
                    {reviews.map(review => (
                        <ReviewTile key={review.id} review={review} />
                    ))}
                </div>
            ) : (
                <div>Loading...</div>
            )} */}
        </div>
    );
}

export default ManageReviews;
