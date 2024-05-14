
//********************************** Actions  ******************************//

const LOAD_PRODUCTS = 'products/LOAD_PRODUCTS';
const LOAD_SINGLE_PRODUCT = 'products/LOAD_SINGLE_PRODUCT'
const CREATE_PRODUCT = 'products/CREATE_PRODUCT';
const EDIT_PRODUCT = 'products/EDIT_PRODUCT';
const DELETE_PRODUCT = 'products/DELETE_PRODUCT'
const USER_PRODUCTS = "products/USER_PRODUCTS"

const LOAD_REVIEWS_BY_PRODUCT = 'reviews/LOAD_REVIEWS_BY_PRODUCT'
const LOAD_SINGLE_REVIEW = 'review/LOAD_SINGLE_REVIEW'

//********************************** POJO action creator **********************//

const loadProducts = (products) => ({
    type: LOAD_PRODUCTS,
    products
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


//********************************** Thunk action creator ***********************//
export const fetchAllProductsThunk = () => async (dispatch) => {
    const res = await fetch('/api/products/')

    const data = await res.json();
    console.log("RESPONCE >>> ", data)

    if (!res.ok) return { "errors": data };

    const { Products } = data
    // console.log("---NOW----", Products)
    await dispatch(loadProducts(Products))
    return Products;
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


const initialState = {

};

function productReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_PRODUCTS: {
            return {
                ...state,
                products: action.products,
            }
        }
        // const newProductState = {};
        // action.products.forEach(product => {
        //     newProductState[product.id] = product
        //     // { ...product, reviews: state[product.id] ? state[product.id].reviews : [] };
        // });
        // return newProductState;
    

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
