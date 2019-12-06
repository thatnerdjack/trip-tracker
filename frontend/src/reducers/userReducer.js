export default function reducer(state={
    user: {
        id: null,
        name: null,
        email: null
    }
}, action) {

    switch(action.type) {
        //different action types from actions
        case "SET_USER": {
            return {
                ...state,
                user: {
                    id: action.payload.id,
                    name: action.payload.name,
                    email: action.payload.email
                }
            }
        }
        case "LOGOUT": {
            const newState = state;
            newState.user.id = null;
            newState.user.name = null;
            newState.user.email = null;

            return newState;
        }
    }

    return state;
}