export default (state, action) => {
    switch (action.type) {

        case 'GET_POSITIVE':
            return {
                ...state,
                loading: false,
                TotalCovid: action.payload,
            }
        case 'COVID':
            return {
                ...state,
                loading: false,
                Covid: action.payload,
            }
        case 'ERROR':
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}