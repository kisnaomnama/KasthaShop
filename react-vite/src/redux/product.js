
//********************************** Actions  ******************************//

const LOAD_PRODUCTS = 'products/LOAD_PRODUCTS';
const CREATE_PRODUCT = 'products/CREATE_PRODUCT';
const LOAD_SINGLE_PRODUCT = 'products/LOAD_SINGLE_PRODUCT'
const EDIT_PRODUCT = 'products/EDIT_PRODUCT';
const DELETE_PRODUCT = 'products/DELETE_PRODUCT'
const USER_PRODUCTS = "spots/USER_PRODUCTS"

const UPDATE_PRODUCT_REVIEW = 'products/UPDATE_PRODUCT_REVIEW';
const DELETE_PRODUCT_REVIEW = 'products/DELETE_PRODUCT_REVIEW';


//********************************** POJO action creator **********************//

const loadProducts = products => ({
    type: LOAD_PRODUCTS,
    payload: products
});

const createProduct = product => ({
    type: CREATE_PRODUCT,
    payload: product
})

const loadProductByid = product => ({
    type: LOAD_SINGLE_PRODUCT,
    payload: product
})

const editProduct = (product) => ({
    type: EDIT_PRODUCT,
    payload: product
});

const deleteProduct = (productId) => ({
    type: DELETE_PRODUCT,
    payload: productId
});

const allProductsByUsers = (products) => {
    return {
        type: USER_PRODUCTS,
        payload: products
    }
}


const updateProductReview = (productId, review) => ({
    type: UPDATE_PRODUCT_REVIEW,
    productId,
    review
});


const deleteProductReview = (productId, reviewId) => ({
    type: DELETE_PRODUCT_REVIEW,
    productId,
    reviewId
});


//********************************** Thunk action creator ***********************//
export const loadProductsThunk = () => async (dispatch) => {
    const res = await fetch('/api/products/')
    if (res.ok) {
        const { Products } = await res.json()
        // console.log("23 ----🌟>", Products)
        dispatch(loadProducts(Products))
    }
};

export const createProductThunk = (product) => async (dispatch) => {
    // for (const [key, value] of product.entries()) {
    //     console.log("product====>", key, "= ", value);
    // }
    
    const res = await fetch("/api/products/", {
        method: "POST",
        body: product
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(createProduct(data));
        return data;
    }
    else {
        const errors = await res.json();
        return errors
    }
};

export const productFetchByIdThunk = (productId) => async (dispatch) => {

    const res = await fetch(`/api/products/${productId}`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadProductByid(data))
        return data
    }
}

export const editProductThunk = (product, productId) => async (dispatch) => {

    // for (const [key, value] of product.entries()) {
    //     console.log("product====>", key, "= ", value);
    // }
    // console.log('ProductId =======>', productId)

    const res = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        body: product,
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(editProduct(data));
        return data;
    }
    else {
        const errors = await res.json();
        return errors
    }
};

export const deleteProductThunk = (productId) => async (dispatch) => {
    // console.log("From thunk===>", productId)
    const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
    });
    if (res.ok) {
        dispatch(deleteProduct(productId));
        return productId;
    }
};


export const fetchAllProductCurrentUserThunk = () => async (dispatch) => {
    const res = await fetch('/api/productss/current');
    if (res.ok) {
        const data = await res.json();
        dispatch(allProductsByUsers(data));
    }
    return res;
}


export const createProductReviewThunk = (productId, review) => async dispatch => {

    const res = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        body: review
    });

    if (res.ok) {
        const data = await res.json();
        console.log("SUCCESS DATA>>>>>>>>", data)
        dispatch(updateProductReview(productId, data));
        return data;
    }
    else {
        const errors = await res.json();
        console.log("ERROR DATA>>>>>>>>", errors)
        return errors
    }

}

export const updateProductReviewThunk = (productId, reviewId, review, rating) => async dispatch => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        body: JSON.stringify({
            review,
            rating
        })
    });
    const data = await res.json();

    if (!res.ok) return { "errors": data };
    await dispatch(updateProductReview(productId, data));
    return data;
}

export const deleteProductReviewThunk = (productId, reviewId) => async dispatch => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    const data = await res.json();
    console.log(data)

    if (!res.ok) return { 'errors': data };
    await dispatch(deleteProductReview(productId, reviewId));
    return data;
}

const initialState = {};

function productReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_PRODUCTS: {
            const newProductState = {};
            // console.log("36 ----🌟>", action.payload); // Access payload instead of products
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

        case USER_PRODUCTS: {
            const userPostedProducts = { ...action.payload };
            const allProducts = Object.values(userPostedProducts);
            const userProductsObj = {};
            allProducts.forEach((product) => (userProductsObj[product.id] = product));
            return {
                ...state,
                allProducts: userProductsObj
            };
        }

        case UPDATE_PRODUCT_REVIEW: {
            const newState = { ...state };
            const reviews = newState.products[action.productId].reviews;
            for (let i = 0; i < reviews.length; i++) {
                const review = reviews[i];
                if (review.id === action.review.id) {
                    reviews.splice(i, 1);
                }
            }
            reviews.push(action.review);
            return newState;
        }

        case DELETE_PRODUCT_REVIEW: {
            const newState = { ...state };
            const reviews = newState.products[action.productId].reviews;
            newState.products[action.productId].reviews = reviews.filter(review => review.id !== action.reviewId);
            return newState;
        }

        default:
            return state;
    }
}

export default productReducer;
