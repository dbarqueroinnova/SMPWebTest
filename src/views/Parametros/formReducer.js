import validationParametros from "./validation";

const formReducer = (state, action) => {
    switch (action.type) {
        case "HANDLE INPUT TEXT":
            const index = state.findIndex(item => item.nombre === action.field);
            state[index].valor = action.payload
            return [
                ...state
            ]
        case "TOGGLE":
            const indexSwitch = state.findIndex(item => item.nombre === action.field);
            state[indexSwitch].valor === 'True' ? state[indexSwitch].valor = 'False' : state[indexSwitch].valor = 'True'
            return [
                ...state
            ]
        case "HANDLE INPUT TEXT ERROR":
            return validationParametros({ errorState: state, field: action.field, payload: action.payload })
        default:
            return state
    }
}

export default formReducer