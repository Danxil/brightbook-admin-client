import keyMirror from 'react/lib/keyMirror';

export default {
  // event name triggered from store, listened to by views
  CHANGE_EVENT: 'change',

  // Each time you add an action, add it here... They should be past-tense
  ActionTypes: keyMirror({
    START_LOAD_CATEGORIES: null,
    SUCCESS_LOAD_CATEGORIES: null,
    START_ADD_CATEGORY: null,
    SUCCESS_ADD_CATEGORY: null,
    START_EDIT_CATEGORY: null,
    SUCCESS_EDIT_CATEGORY: null,
    START_DELETE_CATEGORY: null,
    SUCCESS_DELETE_CATEGORY: null,
    START_LOAD_HEADER_COLORS: null,
    SUCCESS_LOAD_HEADER_COLORS: null
  }),

  ActionSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  ConfigSources: {
    REST_BASE_URL: 'http://localhost:3000/v1'
  }
};
