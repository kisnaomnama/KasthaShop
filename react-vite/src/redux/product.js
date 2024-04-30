
//********************************** Actions  ******************************//

const LOAD_PRODUCTS = 'products/LOAD_PRODUCTS';



//********************************** POJO action creator **********************//

const loadProducts = products => ({
    type: LOAD_PRODUCTS,
    payload: products
});



//********************************** Thunk action creator ***********************//
export const loadProductsThunk = () => async (dispatch) => {
    const res = await fetch('/api/products')

    if (res.ok) {
        const { Products } = await res.json()
        // console.log("23 ----🌟>", Products)
        dispatch(loadProducts( Products ))
    }
};


const initialState = { };

function productReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_PRODUCTS:
            const newProductState = {};
            
            // console.log("36 ----🌟>", action.payload); // Access payload instead of products
            action.payload.forEach( product => {
                newProductState[product.id] = product;
            });
            return newProductState;

        default:
            return state;
    };
}


export default productReducer;
