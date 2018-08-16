export default function getAgentPreferences(state) {
  if (state && state.createListingBootstrap) {
    return state.createListingBootstrap.agentPreferences || [];
  }

  return [];
}