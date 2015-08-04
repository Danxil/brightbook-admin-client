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

    

    START_LOAD_BOOKS: null,
    SUCCESS_LOAD_BOOKS: null,

    START_ADD_BOOK: null,
    SUCCESS_ADD_BOOK: null,

    START_EDIT_BOOK: null,
    SUCCESS_EDIT_BOOK: null,

    START_DELETE_BOOK: null,
    SUCCESS_DELETE_BOOK: null,
    
    
    
    START_LOAD_HEADER_COLORS: null,
    SUCCESS_LOAD_HEADER_COLORS: null,



    START_LOAD_BOOK_REVIEWS: null,
    SUCCESS_LOAD_BOOK_REVIEWS: null,

    START_ADD_BOOK_REVIEW: null,
    SUCCESS_ADD_BOOK_REVIEW: null,

    START_EDIT_BOOK_REVIEW: null,
    SUCCESS_EDIT_BOOK_REVIEW: null,

    START_DELETE_BOOK_REVIEW: null,
    SUCCESS_DELETE_BOOK_REVIEW: null,



    START_LOAD_BOOK_REASONS: null,
    SUCCESS_LOAD_BOOK_REASONS: null,

    START_ADD_BOOK_REASON: null,
    SUCCESS_ADD_BOOK_REASON: null,

    START_EDIT_BOOK_REASON: null,
    SUCCESS_EDIT_BOOK_REASON: null,

    START_DELETE_BOOK_REASON: null,
    SUCCESS_DELETE_BOOK_REASON: null,




    START_LOAD_COVER_TYPES: null,
    SUCCESS_LOAD_COVER_TYPES: null,

    START_ADD_COVER_TYPE: null,
    SUCCESS_ADD_COVER_TYPE: null,

    START_EDIT_COVER_TYPE: null,
    SUCCESS_EDIT_COVER_TYPE: null,

    START_DELETE_COVER_TYPE: null,
    SUCCESS_DELETE_COVER_TYPE: null,




    START_LOAD_RUBRICS: null,
    SUCCESS_LOAD_RUBRICS: null,

    START_ADD_RUBRIC: null,
    SUCCESS_ADD_RUBRIC: null,

    START_EDIT_RUBRIC: null,
    SUCCESS_EDIT_RUBRIC: null,

    START_DELETE_RUBRIC: null,
    SUCCESS_DELETE_RUBRIC: null,




    START_LOAD_AUTHORS: null,
    SUCCESS_LOAD_AUTHORS: null,

    START_ADD_AUTHOR: null,
    SUCCESS_ADD_AUTHOR: null,

    START_EDIT_AUTHOR: null,
    SUCCESS_EDIT_AUTHOR: null,

    START_DELETE_AUTHOR: null,
    SUCCESS_DELETE_AUTHOR: null, 
    
    
    
    
    
    START_LOAD_FORM_SIDE_SCHEMAS: null,
    SUCCESS_LOAD_FORM_SIDE_SCHEMAS: null,

    START_ADD_FORM_SIDE_SCHEMA: null,
    SUCCESS_ADD_FORM_SIDE_SCHEMA: null,

    START_EDIT_FORM_SIDE_SCHEMA: null,
    SUCCESS_EDIT_FORM_SIDE_SCHEMA: null,

    START_DELETE_FORM_SIDE_SCHEMA: null,
    SUCCESS_DELETE_FORM_SIDE_SCHEMA: null,
  }),

  ActionSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  ConfigSources: {
    SERVER_BASE_URL: 'http://localhost:3000',
    REST_BASE_URL: 'http://localhost:3000/api',
    DATE_FORMAT: 'YYYY-MM-DD',
    BOOK_REVIEWS_COUNT: 4,
    BOOK_REASONS_COUNT: 1,
  }
};
