const initialState = {
    keyword:" "
    }
    const recipeReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'SEARCH': {
    const newKey = action.payload;
    return {
    ...state,
   keyword: newKey,
    }
    }
    default:
    return state;
    }
    };
    export default recipeReducer;