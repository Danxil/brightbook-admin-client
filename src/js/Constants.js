import keyMirror from 'react/lib/keyMirror';

export default {
  // event name triggered from store, listened to by views
  CHANGE_EVENT: 'change',

  // Each time you add an action, add it here... They should be past-tense
  ActionTypes: keyMirror({
    START_LOAD_CATEGORIES: null,
    SUCCESS_LOAD_CATEGORIES: null,
    ERROR_LOAD_CATEGORIES: null
  }),

  ActionSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  ConfigSources: {
    REST_BASE_URL: 'http://localhost:3000/v1'
  }
};
