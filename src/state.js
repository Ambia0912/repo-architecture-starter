export const screens = new Set(['dashboard']);

export function appReducer(state, action) {
  switch (action.type) {
    case 'NAVIGATE':
      if (screens.has(action.screen)) {
        return { ...state, currentScreen: action.screen };
      }
      return state;
    default:
      return state;
  }
}
