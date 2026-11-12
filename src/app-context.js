// Context whitelist factory: only explicitly forwarded keys reach features.
export function createAppContext({ getState, dispatch }) {
  return Object.freeze({
    getState,
    dispatch
  });
}
