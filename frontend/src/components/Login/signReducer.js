export const INITIAL_STATE = {
    visibleSignUp: true,
    visibleSignIn: false,
    visibleConfirmation: false,
    visibleEnteringCode: false
};

export const INITIAL_STATE_MANAGEMENT = {
    visibleSignUp: false,
    visibleSignIn: true,
    visibleConfirmation: false,
    visibleEnteringCode: false,
    visibleInfo: false
};

export const signReducer = (state,action) => {
    switch (action.type) {
        case "SIGN_UP":
        return {
            ...state,
            visibleSignUp: true,
            visibleSignIn: false,
        };
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
        case "INFO":
            return {
                visibleSignUp: false,
                visibleSignIn: false,
                visibleConfirmation: false,
                visibleEnteringCode: false,
                visibleInfo: true
            }                 
        default: {
            return state;
        }
    };
}