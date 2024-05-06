// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import { getAllReviewsOfUser } from "../../store/review";
// import ReviewTile from "../ReviewTile";
// import "./ManageReviews.css"

function ManageReviews() {
    // const dispatch = useDispatch();
    // const [isLoaded, setIsLoaded] = useState(false)
    // const reviews = useSelector(state => state.reviews.user);

    // useEffect(() => {
    //     dispatch(getAllReviewsOfUser()).then(() => setIsLoaded(true));
    // }, [dispatch])
    return (
        <div>
            
        </div>

        // <div className="manage-review-div">
        //     <h1>Manage Reviews</h1>
        //     {isLoaded && <div>
        //         {Object.values(reviews).sort((a, b) => b.id - a.id).map(review => {
        //             return (<ReviewTile key={review.id} review={review} formType="manageReview" />)
        //         })}
        //     </div>}

        // // </div>
    );
}

export default ManageReviews;
