
//********************************** Actions  ******************************//

const LOAD_PRODUCTS = 'products/LOAD_PRODUCTS';
const CREATE_PRODUCT = 'products/CREATE_PRODUCT';
const LOAD_SINGLE_PRODUCT = 'products/LOAD_SINGLE_PRODUCT'
const EDIT_PRODUCT = 'products/EDIT_PRODUCT';
const DELETE_PRODUCT = 'products/DELETE_PRODUCT'
const USER_PRODUCTS = "spots/USER_PRODUCTS"


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
    const res = await fetch("/api/products", {
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

    for (const [key, value] of product.entries()) {
        console.log("product====>", key, "= ", value);
    }
    console.log('ProductId =======>', productId)

    const res = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        body: product,
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(editProduct(data));
        return data;
    }
};

export const deleteProductThunk = (productId) => async (dispatch) => {
    console.log("From thunk===>", productId)
    const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
    });
    if (res.ok) {
        dispatch(deleteProduct(productId));
        return productId;
    }
};


export const fetchAllProductCurrentUserThunk = () => async (dispatch) => {
    const response = await fetch('/api/productss/current');
    if (response.ok) {
        const data = await response.json();
        dispatch(allProductsByUsers(data));
    }
    return response;
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

        default:
            return state;
    }
}


export default productReducer;
