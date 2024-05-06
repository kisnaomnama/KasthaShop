//********************************** Actions  ******************************//

const LOAD_ALL_REVIEWS = 'reviews/LOAD_ALL_REVIEWS';
const LOAD_REVIEWS_BY_PRODUCT = 'reviews/LOAD_REVIEWS_BY_PRODUCT';
const LOAD_SINGLE_REVIEW = 'reviews/LOAD_SINGLE_REVIEW';
const CREATE_PRODUCT_REVIEW = 'products/CREATE_PRODUCT_REVIEW';
const UPDATE_PRODUCT_REVIEW = 'products/UPDATE_PRODUCT_REVIEW';
const DELETE_PRODUCT_REVIEW = 'products/DELETE_PRODUCT_REVIEW';
const USER_REVIEWS = 'reviews/USER_REVIEWS';

//********************************** POJO action creator **********************//

export const loadAllReviews = (reviews) => ({
    type: LOAD_ALL_REVIEWS,
    reviews
});

export const loadAllReviewsByProduct = (reviews) => ({
    type: LOAD_REVIEWS_BY_PRODUCT,
    reviews
});

export const loadSingleReview = (review) => ({
    type: LOAD_SINGLE_REVIEW,
    payload: review
});

export const createProductReview = (productId, review) => ({
    type: CREATE_PRODUCT_REVIEW,
    payload: { productId, review }
});

export const updateProductReview = (review) => ({
    type: UPDATE_PRODUCT_REVIEW,
    payload: review
});

export const deleteProductReview = (reviewId) => ({
    type: DELETE_PRODUCT_REVIEW,
    payload: reviewId
});

export const loadAllReviewsByUser = (reviews) => ({
    type: USER_REVIEWS,
    payload: reviews
});

//********************************** Thunk action creator ***********************//

export const fetchAllReviewsThunk = () => async (dispatch) => {
    const res = await fetch('api/reviews/reviews');
    if (!res.ok) {
        const errors = await res.json();
        return { "errors": errors };
    }
    const { reviews } = await res.json();
    dispatch(loadAllReviews(reviews));
    return reviews;
};

export const fetchSingleReviewByIdThunk = (reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`);
    const data = await res.json();
    console.log("RESPONSE >>> ", data);
    if (!res.ok) {
        return { "errors": data };
    }
    dispatch(loadSingleReview(data));
    return data;
};

export const fetchAllReviewsbyProductThunk = (productId) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}/reviews`);
    const data = await res.json();
    console.log("RESPONSE >>> ", data);
    if (!res.ok) {
        return { "errors": data };
    }
    dispatch(loadAllReviewsByProduct(data.reviews));
    return data;
};

export const createProductReviewThunk = (productId, review) => async dispatch => {
    const res = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        body: review
    });
    const data = await res.json();
    console.log("RESPONSE >>> ", data)
    if (!res.ok) return { "errors": data };
    dispatch(createProductReview(productId, data));
    return data;
}

export const updateProductReviewThunk = (review) => async dispatch => {
    const res = await fetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        body: review
    });
    const data = await res.json();
    console.log("RESPONSE >>> ", data)
    if (!res.ok) return { "errors": data };
    dispatch(updateProductReview(data));
    return data;
}

export const deleteProductReviewThunk = (reviewId) => async dispatch => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    const data = await res.json();
    console.log("RESPONSE >>> ", data)
    if (!res.ok) return { 'errors': data };
    dispatch(deleteProductReview(reviewId));
    return data;
}

export const fetchAllReviewsbyUserThunk = () => async (dispatch) => {
    const res = await fetch('api/reviews/currentt');
    if (!res.ok) {
        const errors = await res.json();
        return { "errors": errors };
    }
    const { reviews } = await res.json();
    dispatch(loadAllReviewsByUser(reviews));
    return reviews;
};

const initialState = {  
};

function reviewReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_ALL_REVIEWS:
        case LOAD_REVIEWS_BY_PRODUCT:
            return {
                ...state,
                reviews: action.reviews
            };
        case LOAD_SINGLE_REVIEW:
            return {
                ...state,
                reviews: state.reviews ? [...state.reviews, action.payload] : [action.payload]
            };
        case CREATE_PRODUCT_REVIEW:
            return {
                ...state,
                reviews: state.reviews ? [...state.reviews, action.payload] : [action.payload]
            };
        case UPDATE_PRODUCT_REVIEW:
            return {
                ...state,
                reviews: state.reviews ? state.reviews.map(review =>
                    review.id === action.payload.id ? action.payload : review
                ) : []
            };
        case DELETE_PRODUCT_REVIEW:
            return {
                ...state,
                reviews: state.reviews ? state.reviews.filter(review => review.id !== action.payload) : []
            };
        case USER_REVIEWS:
            return {
                ...state,
                reviews: action.payload
            };
        default:
            return state;
    }
}

export default reviewReducer;
