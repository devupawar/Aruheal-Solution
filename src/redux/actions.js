// actions.js
export const setAuth = (isLoggedIn) => ({
    type: 'SET_AUTH',
    payload: isLoggedIn,
  });
  
  // reducer.js
  const initialState = {
    isAuthenticated: !!localStorage.getItem('token'),
  };
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_AUTH':
        return { ...state, isAuthenticated: action.payload };
      default:
        return state;
    }
  };
  