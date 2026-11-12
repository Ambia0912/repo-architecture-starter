export function createDashboardFeature(context) {
  return {
    render() {
      return 
        <div class="dashboard-root">
          <h1>Dashboard</h1>
          <p>Welcome to StarterTemplate</p>
          <button data-action="ping">Ping</button>
        </div>
      ;
    },
    handleAction(action, target) {
      if (action === 'ping') {
        alert('Pong!');
        return true;
      }
      return false;
    }
  };
}
