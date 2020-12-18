const reducer = (state, action) => {
    switch (action.type) {
      case 'ChangeInput':
        return {
            ...state,
            [action.name]: action.value,
        };
      default:
        throw new Error();
    }
}

export default reducer;