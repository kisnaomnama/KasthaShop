
//********************************** Actions  ******************************//

const LOAD_PRODUCTS = 'products/LOAD_PRODUCTS';
const LOAD_SINGLE_PRODUCT = 'products/LOAD_SINGLE_PRODUCT'
const CREATE_PRODUCT = 'products/CREATE_PRODUCT';
const EDIT_PRODUCT = 'products/EDIT_PRODUCT';
const DELETE_PRODUCT = 'products/DELETE_PRODUCT'
const USER_PRODUCTS = "products/USER_PRODUCTS"

const LOAD_REVIEWS_BY_PRODUCT = 'reviews/LOAD_REVIEWS_BY_PRODUCT'
const LOAD_SINGLE_REVIEW = 'review/OAD_SINGLE_REVIEW'
const CREATE_PRODUCT_REVIEW = 'product/CREATE_PRODUCT_REVIEW'
const UPDATE_PRODUCT_REVIEW = 'products/UPDATE_PRODUCT_REVIEW';
const DELETE_PRODUCT_REVIEW = 'products/DELETE_PRODUCT_REVIEW';
const USER_REVIEWS = "reviews/USER_REVIEWS"


//********************************** POJO action creator **********************//

const loadProducts = (products) => ({
    type: LOAD_PRODUCTS,
    payload: products
});

const createProduct = (product) => ({
    type: CREATE_PRODUCT,
    payload: product
});

const loadProductByid = (product) => ({
    type: LOAD_SINGLE_PRODUCT,
    payload: product
});

const editProduct = (product) => ({
    type: EDIT_PRODUCT,
    payload: product
});

const deleteProduct = (productId) => ({
    type: DELETE_PRODUCT,
    payload: productId
});

const loadAllProductsByUsers = (products) => ({
    type: USER_PRODUCTS,
    payload: products
});

const loadAllReviewsByProduct = (reviews) => ({
    type: LOAD_REVIEWS_BY_PRODUCT,
    payload: reviews
});

const loadSingleReview = (review) => ({
    type: LOAD_SINGLE_REVIEW,
    payload: review
});

const createProductReview = (productId, review) => ({
    type: CREATE_PRODUCT_REVIEW,
    payload: { productId, review }
});

const updateProductReview = (productId, review) => ({
    type: UPDATE_PRODUCT_REVIEW,
    payload: { productId, review }
});

const deleteProductReview = (productId, reviewId) => ({
    type: DELETE_PRODUCT_REVIEW,
    payload: { productId, reviewId }
});

const loadAllReviewsByUser = (reviews) => ({
    type: USER_REVIEWS,
    payload: reviews
});


//********************************** Thunk action creator ***********************//
export const loadProductsThunk = () => async (dispatch) => {
    const res = await fetch('/api/products/')

    const data = await res.json();
    console.log("RESPONCE >>> ", data)

    if (!res.ok) return { "errors": data };

    const { Products } = data
    await dispatch(loadProducts(Products))
    return data;
};

export const createProductThunk = (product) => async (dispatch) => {
    // for (const [key, value] of product.entries()) {
    //     console.log("product====>", key, "= ", value);
    // }
    const res = await fetch("/api/products/", {
        method: "POST",
        body: product
    });

    const data = await res.json();
    console.log("RESPONSE >>> ", data);

    if (!res.ok) return { "errors": data };
    
    await dispatch(createProduct(data));
    return data;
};

export const fetchProducthByIdThunk = (productId) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}`);

    const data = await res.json();
    console.log("RESPONSE >>> ", data);

    if (!res.ok) {
        return { "errors": data };
    }

    await dispatch(loadProductByid(data));
    return data;
};


export const editProductThunk = (product, productId) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        body: product,
    });

    const data = await res.json();
    console.log("RESPONSE >>> ", data);

    if (!res.ok) {
        return { "errors": data };
    }

    await dispatch(editProduct(data));
    return data;
};


export const deleteProductThunk = (productId) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
    });

    const data = await res.json();
    console.log("RESPONSE >>> ", data);

    if (!res.ok) {
        return { "errors": data };
    }

    await dispatch(deleteProduct(productId));
    return productId;
};

export const fetchSingleReviewByIdThunk = (reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`);

    const data = await res.json();
    console.log("RESPONSE >>> ", data);

    if (!res.ok) {
        return { "errors": data };
    }

    await dispatch(loadSingleReview(data));
    return data;
};


export const fetchAllReviewsbyProductThunk = (productId) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}/reviews`);

    const data = await res.json();
    console.log("RESPONSE >>> ", data);

    if (!res.ok) {
        return { "errors": data };
    }

    await dispatch(loadAllReviewsByProduct(data.reviews));
    return data;
};

export const fetchAllProductsCurrentUserThunk = () => async (dispatch) => {
    const res = await fetch('/api/products/currentt');

    if (!res.ok) {
        const errors = await res.json();
        return { "errors": errors };
    }

    const { products } = await res.json();
    await dispatch(loadAllProductsByUsers(products));
    return { "products": products };
};



export const createProductReviewThunk = (productId, review) => async dispatch => {
    const res = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        body: review
    });
    const data = await res.json();
    console.log("RESPONCE >>> ", data)

    if (!res.ok) return { "errors": data };
    await dispatch(createProductReview(productId, data));
    return data;
}


export const updateProductReviewThunk = (productId, reviewId, review) => async dispatch => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        body: review
    });

    const data = await res.json();
    console.log("RESPONCE >>> ", data)

    if (!res.ok) return { "errors": data };
    await dispatch(updateProductReview(productId, data));
    return data;
}

export const deleteProductReviewThunk = (productId, reviewId) => async dispatch => {

    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    const data = await res.json();
    console.log("RESPONCE >>> ", data)

    if (!res.ok) return { 'errors': data };
    await dispatch(deleteProductReview(productId, reviewId));
    return data;
}


export const fetchAllReviewsbyUserThunk = () => async (dispatch) => {
    const res = await fetch('api/reviews/currentt');

    if (!res.ok) {
        const errors = await res.json();
        return { "errors": errors };
    }

    const { reviews } = await res.json();
    await dispatch(loadAllReviewsByUser(reviews));
    return reviews;
};


const initialState = {};

function productReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_PRODUCTS: {
            const newProductState = {};
            action.payload.forEach(product => {
                newProductState[product.id] = product;
            });
            return newProductState;
        }

        case CREATE_PRODUCT: {
            const newProductState = { ...state };
            newProductState[action.payload.id] = action.payload
            return newProductState
        }

        case LOAD_SINGLE_PRODUCT: {
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        }
        case EDIT_PRODUCT: {
            return {
                ...state,
                [action.payload.id]: action.payload,
            };
        }

        case DELETE_PRODUCT: {
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
        }


        default:
            return state;
    }
}

export default productReducer;
