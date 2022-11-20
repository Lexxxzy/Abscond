export const INITIAL_STATE = {
    visibleSignUp: true,
    visibleSignIn: false,
    visibleConfirmation: false,
    visibleEnteringCode: false
};

export const signReducer = (state,action) => {
    switch (action.type) {
        case "SIGN_IN":
            return {
                ...state,
                visibleSignUp: false,
                visibleSignIn: true,
            };
        case "CONFIRMATION":
            return {
                ...state,
                visibleSignUp: false,
                visibleConfirmation: true,
            };
        case "CODE_ENTERING":
            return {
                visibleSignUp: false,
                visibleSignIn: false,
                visibleConfirmation: false,
                visibleEnteringCode: true,
            };                    
        default: {
            return state;
        }
    };
}