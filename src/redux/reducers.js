const initialState = {
    isAuthenticated: !!localStorage.getItem('token'), // Check if token exists
  };
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_AUTH':
        return { ...state, isAuthenticated: action.payload };
      default:
        return state;
    }
  };
  