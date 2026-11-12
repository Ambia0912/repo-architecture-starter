// Main entry point - strictly 5 responsibilities:
// 1. Startup & DOM roots
// 2. Auth lifecycle
// 3. Route table
// 4. Global listeners
// 5. Action dispatcher

import { createAppContext } from './app-context.js';
import { screens, appReducer } from './state.js';
import { createDashboardFeature } from './features/dashboard/dashboard-view.js';

const screen = document.getElementById('screen');
let state = { currentScreen: 'dashboard' };

const appContext = createAppContext({
  getState: () => state,
  dispatch: (action) => {
    state = appReducer(state, action);
    renderApp();
  }
});

const dashboardFeature = createDashboardFeature(appContext);

const actionOwners = [
  dashboardFeature
];

function renderApp() {
  if (screen) {
    screen.innerHTML = dashboardFeature.render();
  }
}

document.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action]');
  if (!target) return;
  const action = target.getAttribute('data-action');
  for (const owner of actionOwners) {
    if (owner.handleAction && owner.handleAction(action, target)) {
      break;
    }
  }
});

renderApp();
