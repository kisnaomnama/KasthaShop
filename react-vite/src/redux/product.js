
//********************************** Actions  ******************************//

const LOAD_PRODUCTS = 'products/LOAD_PRODUCTS';
const CREATE_PRODUCT = 'products/CREATE_PRODUCT';
const LOAD_SINGLE_PRODUCT = 'products/LOAD_SINGLE_PRODUCT'




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



//********************************** Thunk action creator ***********************//
export const loadProductsThunk = () => async (dispatch) => {
    const res = await fetch('/api/products')

    if (res.ok) {
        const { Products } = await res.json()
        // console.log("23 ----🌟>", Products)
        dispatch(loadProducts(Products))
    }
};


// export const createProductThunk = (product) => async (dispatch) => {
//     const res = await fetch('/api/products/new', {
//         method: 'POST',
//         body: product
//     });

//     if (res.ok) {
//         console.log("line 43----🌟>", product);

//         const newProduct = await res.json(); // Renamed the inner variable
//         dispatch(addProduct(newProduct));
//         return newProduct;
//     } else {
//         return "product thunk error";
//     }
// };

export const createProductThunk = (product) => async (dispatch) => {

    // for (const [key, value] of product.entries()) {
    //     console.log("product====>", key, "= ", value);
    // }

    const res = await fetch("/api/products/new", {
        method: "POST",
        body: product
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(createProduct(data));
        return data;
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


        default:
            return state;
    };
}


export default productReducer;
