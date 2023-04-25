function validationParametros({ errorState, field, payload }) {
    let message = ''
    if (field === 'Puerto' && payload.length < 3) {
        message = 'Mínimo 3 caracteres'
    }

    if (field === 'TiempoExpiracionToken' && payload === "0") {
        message = 'Ingrese un número mayor a cero'
    }

    if (message === '') {
        return []
    }

    return {
        ...errorState,
        [field]: message
    }
}


export default validationParametros 