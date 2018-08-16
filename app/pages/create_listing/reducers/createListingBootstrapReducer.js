import { BOOTSTRAP_CREATE_LISTING } from '../actions/actionTypes';

function getInitialState() {
  return {
    agentPreferences: [],
  };
}

export default function createListingBootstrapReducer(state = getInitialState(), action = {}) {
  switch (action.type) {
    case BOOTSTRAP_CREATE_LISTING: {
      const { agent_preferences: agentPreferences } = action.payload.bootstrapData;
      const mappedAgentPreferences = agentPreferences.map(preference => ({ value: preference[1], label: preference[0] }));

      return {
        ...state,
        agentPreferences: mappedAgentPreferences,
      };
    }
    default: {
      return state;
    }
  }
}
