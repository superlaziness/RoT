const defaultState = {
  encoder: 1,
  text: "piska",
};

export default function testReducer(state = defaultState, action) {
  switch (action.type) {
    case 'increase':
      return { ...state, encoder: state.encoder + 1 };
    case 'decrease':
      return { ...state, encoder: state.encoder - 1 };
    case 'setValue':
      return { ...state, encoder: action.value };
    default:
      return state;
  }
}