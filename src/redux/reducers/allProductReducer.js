const allProductReducer = (state = null, action) => {
  switch (action.type) {
    case 'ADD_ALL_PRODUCTS':
      return action.payload;

    default:
      return state;
  }
};

export default allProductReducer;
