import React from 'react';

import AppContainer from './components/AppContainer.jsx';

import CategoriesContainer from './components/categories/CategoriesContainer.jsx';
import AddCategory from './components/categories/AddCategory.jsx';
import EditCategory from './components/categories/EditCategory.jsx';

import RubricsContainer from './components/rubrics/RubricsContainer.jsx';
import AddRubric from './components/rubrics/AddRubric.jsx';
import EditRubric from './components/rubrics/EditRubric.jsx';


import AuthorsContainer from './components/authors/AuthorsContainer.jsx';
import AddAuthor from './components/authors/AddAuthor.jsx';
import EditAuthor from './components/authors/EditAuthor.jsx';


import BooksContainer from './components/books/BooksContainer.jsx';
import AddBook from './components/books/AddBook.jsx';
import EditBook from './components/books/EditBook.jsx';
import BookReviews from './components/books/BookReviews.jsx';
import BookReasons from './components/books/BookReasons.jsx';

import CoverTypesContainer from './components/cover-types/CoverTypesContainer.jsx';
import EditCoverType from './components/cover-types/EditCoverType.jsx';
import AddCoverType from './components/cover-types/AddCoverType.jsx';

import FormatsContainer from './components/formats/FormatsContainer.jsx';
import EditFormat from './components/formats/EditFormat.jsx';
import AddFormat from './components/formats/AddFormat.jsx';

import ContactsContainer from './components/contacts/ContactsContainer.jsx';
import EditContact from './components/contacts/EditContact.jsx';

import Auth from './components/auth/Auth.jsx';
import Hello from './components/hello/Hello.jsx';

import {run, HashLocation, Route, Link } from 'react-router';

import Cookie from 'js-cookie'
import jq from 'jquery'

jq.ajaxPrefilter(function(options) {
    if (!options.beforeSend) {
        options.beforeSend = function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + Cookie.get('token'));
        }
    }
})

let routes = (
    <Route handler={AppContainer}>
        <Route name="auth" path="/" handler={Hello} />
        <Route name="hello" path="/auth" handler={Auth} />

        <Route name="categories" path="/categories" handler={CategoriesContainer} />
        <Route name="add-category" path="/add-category" handler={AddCategory} />
        <Route name="edit-category" path="/categories/:id" handler={EditCategory} />
        
        <Route name="rubrics" path="/rubrics" handler={RubricsContainer} />
        <Route name="add-rubric" path="/add-rubric" handler={AddRubric} />
        <Route name="edit-rubric" path="/rubrics/:id" handler={EditRubric} />

        <Route name="authors" path="/authors" handler={AuthorsContainer} />
        <Route name="add-author" path="/add-author" handler={AddAuthor} />
        <Route name="edit-author" path="/authors/:id" handler={EditAuthor} />
        
        <Route name="books" path="/books" handler={BooksContainer} />
        <Route name="add-book" path="/add-book" handler={AddBook} />
        <Route name="edit-book" path="/books/:id" handler={EditBook} />
        <Route name="edit-book-reviews" path="/books/:id/reviews" handler={BookReviews} />
        <Route name="edit-book-reasons" path="/books/:id/reasons" handler={BookReasons} />
        
        <Route name="cover-types" path="/cover-types" handler={CoverTypesContainer} />
        <Route name="edit-cover-type" path="/edit-cover-type/:id" handler={EditCoverType} />
        <Route name="add-cover-type" path="/add-cover-type" handler={AddCoverType} />

        <Route name="formats" path="/formats" handler={FormatsContainer} />
        <Route name="edit-format" path="/edit-format/:id" handler={EditFormat} />
        <Route name="add-format" path="/add-format" handler={AddFormat} />

        <Route name="contacts" path="/contacts" handler={ContactsContainer} />
        <Route name="edit-contact" path="/edit-contact/:id" handler={EditContact} />
    </Route>
)

run(routes, HashLocation, (Root) => {
    React.render(<Root/>, document.getElementById('main'));
});